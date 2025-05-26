// Cache versioning
const CACHE_VERSION = '1.0.1'; // Incremented version due to changes
const CACHE_NAMES = {
    static: `static-cache-${CACHE_VERSION}`,
    dynamic: `dynamic-cache-${CACHE_VERSION}`,
    images: `images-cache-${CACHE_VERSION}`
};

// Assets to pre-cache
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/offline.html',
    '/assets/style/styles.css',
    '/assets/js/script.js',
    '/assets/favicon/favicon.ico',
    '/site.webmanifest',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap' // Added Google Fonts CSS
];

// Cache size limits
const CACHE_SIZE_LIMIT = 50; // Maximum number of items in dynamic/image cache

// Helper function to limit cache size
async function trimCache(cacheName, maxItems) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length > maxItems) {
        await cache.delete(keys[0]);
        // Potentially loop to delete multiple if many items were added at once
        // For simplicity, this deletes one. Recursive call removed to prevent potential deep stacks.
        if (keys.length -1 > maxItems) { 
            console.log(`ServiceWorker: Trimming cache ${cacheName} further.`);
            // Consider a loop or a more robust trimming strategy if large bulk additions are common
        }
    }
}

// Installation - Cache critical assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAMES.static)
            .then(cache => {
                console.log('ServiceWorker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => self.skipWaiting())
            .catch(error => {
                console.error('ServiceWorker: Failed to cache static assets during install:', error);
            })
    );
});

// Activation - Clean up old caches and enable navigation preload
self.addEventListener('activate', event => {
    const currentCaches = Object.values(CACHE_NAMES);
    event.waitUntil(
        Promise.all([
            (async () => { // Enable navigation preload
                if (self.registration.navigationPreload) {
                    try {
                        await self.registration.navigationPreload.enable();
                        console.log('ServiceWorker: Navigation Preload enabled.');
                    } catch (error) {
                        console.error('ServiceWorker: Failed to enable navigation preload.', error);
                    }
                } else {
                    console.log('ServiceWorker: Navigation Preload not supported.');
                }
            })(),
            caches.keys().then(cacheNames => { // Existing cache cleanup
                return Promise.all(
                    cacheNames
                        .filter(cacheName => !currentCaches.includes(cacheName))
                        .map(cacheName => {
                            console.log(`ServiceWorker: Deleting old cache: ${cacheName}`);
                            return caches.delete(cacheName);
                        })
                );
            })
        ]).then(() => self.clients.claim())
          .catch(error => {
              console.error('ServiceWorker: Activation phase failed:', error);
          })
    );
});

// Fetch - Enhanced caching strategy
self.addEventListener('fetch', event => {
    // Skip non-GET requests or requests for browser extensions
    if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://')) {
        return;
    }

    const url = new URL(event.request.url);

    // Handle HTML navigation requests (Network first with navigation preload, fallback to cache)
    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const preloadResponse = await event.preloadResponse;
                if (preloadResponse) {
                    console.log('ServiceWorker: Using preload response for:', event.request.url);
                    // It's important to cache the preloaded response as well
                    const cache = await caches.open(CACHE_NAMES.static);
                    cache.put(event.request, preloadResponse.clone()); 
                    return preloadResponse;
                }

                const networkResponse = await fetch(event.request);
                // Cache the network response for future offline use
                const cache = await caches.open(CACHE_NAMES.static);
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
            } catch (error) {
                console.log('ServiceWorker: Network request for HTML failed, trying cache for:', event.request.url, error);
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) {
                    return cachedResponse;
                }
                // Fallback to offline page if specific HTML not cached
                const offlinePage = await caches.match('/offline.html');
                return offlinePage;
            }
        })());
    } 
    // Images - Cache first, network fallback, then cache
    else if (event.request.destination === 'image' || url.pathname.match(/\.(jpe?g|png|gif|svg|webp)$/i)) {
        event.respondWith((async () => {
            const cachedResponse = await caches.match(event.request);
            if (cachedResponse) {
                return cachedResponse;
            }
            try {
                const networkResponse = await fetch(event.request);
                const cache = await caches.open(CACHE_NAMES.images);
                cache.put(event.request, networkResponse.clone());
                await trimCache(CACHE_NAMES.images, CACHE_SIZE_LIMIT);
                return networkResponse;
            } catch (error) {
                console.error('ServiceWorker: Failed to fetch image from network:', event.request.url, error);
                // Optionally return a placeholder image if available
                // const placeholder = await caches.match('/assets/img/placeholder.png');
                // return placeholder;
                // If no placeholder, the browser will show its default broken image icon
                return new Response('', { status: 404, statusText: 'Not Found' }); // Or let it fail naturally
            }
        })());
    } 
    // Other assets (CSS, JS, Fonts from CDNs etc.) - Stale-while-revalidate
    else if (['style', 'script', 'font'].includes(event.request.destination) || url.origin === 'https://fonts.gstatic.com') {
        event.respondWith((async () => {
            const cachedResponse = await caches.match(event.request);
            const fetchPromise = fetch(event.request)
                .then(async networkResponse => {
                    const cache = await caches.open(CACHE_NAMES.dynamic);
                    await cache.put(event.request, networkResponse.clone());
                    await trimCache(CACHE_NAMES.dynamic, CACHE_SIZE_LIMIT);
                    return networkResponse;
                })
                .catch(error => {
                    console.error('ServiceWorker: Failed to fetch dynamic asset from network:', event.request.url, error);
                    // If cachedResponse is not available and network fails, this error will propagate
                    // to the browser, which will handle it for this sub-resource.
                    // Returning null or undefined here if cachedResponse is also null would cause an error.
                    // If cachedResponse exists, it's served. If not, and this fails, the browser handles it.
                    return new Response('', { status: 404, statusText: 'Not Found' }); // Or rethrow if no cached version
                });
            return cachedResponse || fetchPromise;
        })());
    }
    // For any other requests, try to serve from cache, then network (generic fallback)
    // This might be too broad or unnecessary if the above cover all expected assets.
    // else {
    //     event.respondWith(
    //         caches.match(event.request).then(response => {
    //             return response || fetch(event.request).catch(() => caches.match('/offline.html'));
    //         })
    //     );
    // }
});

// Handle service worker updates
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') { // Check type for robustness
        console.log('ServiceWorker: Received SKIP_WAITING message. Activating new SW.');
        self.skipWaiting();
    }
});
