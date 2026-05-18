(function() {
    'use strict';

    const CONFIG = {
        mobileBreakpoint: 768,
        navbarScrollThreshold: 50,
        activeSectionOffset: 300,
        notificationTimeout: 5000,
        notificationAnimationFallbackTimeout: 500, // Animation fallback duration
        themeAnnouncementTimeout: 3000,
        resizeDebounceWait: 200,
        selectors: {
            smoothScrollAnchors: 'a[href^="#"]',
            navbar: '.navbar',
            menuToggle: '#menu-toggle',
            navLinksContainer: '.nav-links',
            sections: 'section',
            navLinks: 'nav a',
            contactForm: '#contact-form',
            formSubmitButton: '#contact-form button[type="submit"]',
            firstFormInput: '#contact-form input, #contact-form textarea',
            themeToggle: '#theme-toggle',
            lightIcon: '#light-icon',
            darkIcon: '#dark-icon',
            body: 'body',
            backToTop: '#back-to-top'
        },
        classes: {
            menuOpen: 'menu-open',
            navLinksActive: 'active',
            navbarScrolled: 'scrolled',
            navLinkActive: 'active',
            notificationBase: 'notification',
            notificationHiding: 'hiding',
            srOnly: 'sr-only',
            iconVisible: 'icon-visible',
            iconHidden: 'icon-hidden'
        },
        attributes: {
            ariaExpanded: 'aria-expanded',
            ariaCurrent: 'aria-current',
            ariaLive: 'aria-live',
            role: 'role',
            tabindex: 'tabindex',
            dataTheme: 'data-theme'
        },
        localStorageKeys: {
            theme: 'theme'
        },
        serviceWorkerPath: '/assets/js/service-worker.js'
    };

    // --- UTILITY FUNCTIONS ---
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // --- DOM ELEMENTS CACHE ---
    const DOMElements = {};

    function cacheDOMElements() {
        DOMElements.navbar = document.querySelector(CONFIG.selectors.navbar);
        DOMElements.menuToggle = document.getElementById(CONFIG.selectors.menuToggle.substring(1));
        DOMElements.navLinksContainer = document.querySelector(CONFIG.selectors.navLinksContainer);
        DOMElements.contactForm = document.getElementById(CONFIG.selectors.contactForm.substring(1));
        DOMElements.themeToggle = document.getElementById(CONFIG.selectors.themeToggle.substring(1));
        DOMElements.lightIcon = document.getElementById(CONFIG.selectors.lightIcon.substring(1));
        DOMElements.darkIcon = document.getElementById(CONFIG.selectors.darkIcon.substring(1));
        DOMElements.body = document.body;
        DOMElements.backToTop = document.getElementById(CONFIG.selectors.backToTop.substring(1));
        // Sections and nav links are queried dynamically or when needed due to their multiple instances
    }

    // --- STATE VARIABLES ---
    let scrollRAFId = null;

    // --- SMOOTH SCROLL ---
    function initSmoothScroll() {
        document.querySelectorAll(CONFIG.selectors.smoothScrollAnchors).forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();

                if (window.innerWidth < CONFIG.mobileBreakpoint && DOMElements.menuToggle && DOMElements.navLinksContainer && DOMElements.navLinksContainer.classList.contains(CONFIG.classes.navLinksActive)) {
                    toggleMenu();
                }

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    targetElement.setAttribute(CONFIG.attributes.tabindex, '-1');
                    targetElement.focus({ preventScroll: true });
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    // --- MOBILE MENU ---
    function toggleMenu() {
        if (!DOMElements.menuToggle || !DOMElements.navLinksContainer) return;
        const isExpanded = DOMElements.menuToggle.getAttribute(CONFIG.attributes.ariaExpanded) === 'true';
        DOMElements.menuToggle.setAttribute(CONFIG.attributes.ariaExpanded, !isExpanded);
        DOMElements.navLinksContainer.classList.toggle(CONFIG.classes.navLinksActive);
        DOMElements.body.classList.toggle(CONFIG.classes.menuOpen);
    }

    function initMobileMenu() {
        if (DOMElements.menuToggle) {
            DOMElements.menuToggle.addEventListener('click', toggleMenu);
        }
    }

    // --- NAVBAR SCROLL EFFECTS & ACTIVE SECTION HIGHLIGHTING ---
    function initSectionObserver() {
        const sections = document.querySelectorAll(CONFIG.selectors.sections);
        const navLinks = document.querySelectorAll(CONFIG.selectors.navLinks);

        const options = {
            root: null,
            rootMargin: '-30% 0px -60% 0px', // Trigger when section is in the middle of viewport
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove(CONFIG.classes.navLinkActive);
                        link.setAttribute(CONFIG.attributes.ariaCurrent, 'false');
                        
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add(CONFIG.classes.navLinkActive);
                            link.setAttribute(CONFIG.attributes.ariaCurrent, 'page');
                        }
                    });
                }
            });
        }, options);

        sections.forEach(section => observer.observe(section));
    }

    function handleScroll() {
        if (scrollRAFId) {
            window.cancelAnimationFrame(scrollRAFId);
        }
        scrollRAFId = window.requestAnimationFrame(() => {
            const currentScroll = window.scrollY;
            if (DOMElements.navbar) {
                currentScroll > CONFIG.navbarScrollThreshold
                    ? DOMElements.navbar.classList.add(CONFIG.classes.navbarScrolled)
                    : DOMElements.navbar.classList.remove(CONFIG.classes.navbarScrolled);
            }
            
            if (DOMElements.backToTop) {
                currentScroll > 500 
                    ? DOMElements.backToTop.classList.add('visible') 
                    : DOMElements.backToTop.classList.remove('visible');
            }
        });
    }

    function initScrollEffects() {
        initSectionObserver();
        window.addEventListener('scroll', handleScroll);
        // Initial call for navbar state
        handleScroll();
    }

    // --- SCROLL ANIMATIONS ---
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-aos]');

        if (!animatedElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '-100px' });

        animatedElements.forEach(el => observer.observe(el));
    }

    // --- CONTACT FORM ---
    async function handleContactFormSubmit(e) {
        e.preventDefault();
        if (!DOMElements.contactForm) return;

        const submitButton = DOMElements.contactForm.querySelector(CONFIG.selectors.formSubmitButton);
        if (!submitButton) return;

        const originalText = submitButton.textContent;
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;

        try {
            const formData = new FormData(DOMElements.contactForm);
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            });

            if (!response.ok) throw new Error('Form submission failed');

            DOMElements.contactForm.reset();
            showNotification('Merci pour votre message ! Je vous répondrai bientôt.', 'success');
            const firstInput = DOMElements.contactForm.querySelector(CONFIG.selectors.firstFormInput);
            if (firstInput) firstInput.focus();

        } catch (error) {
            console.error('Form submission error:', error);
            showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }

    function initContactForm() {
        if (DOMElements.contactForm) {
            DOMElements.contactForm.addEventListener('submit', handleContactFormSubmit);
        }
    }

    // --- NOTIFICATIONS ---
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.classList.add(CONFIG.classes.notificationBase, type);
        notification.setAttribute(CONFIG.attributes.role, 'alert');
        notification.setAttribute(CONFIG.attributes.ariaLive, 'assertive');

        const messageText = document.createElement('span');
        messageText.textContent = message;
        notification.appendChild(messageText);
        DOMElements.body.appendChild(notification);

        let removed = false;
        const removeNotification = () => {
            if (removed) return;
            notification.remove();
            removed = true;
        };

        // Start hiding animation
        setTimeout(() => {
            notification.classList.add(CONFIG.classes.notificationHiding);
            // Fallback removal in case animationend doesn't fire
            setTimeout(removeNotification, CONFIG.notificationAnimationFallbackTimeout);
        }, CONFIG.notificationTimeout);

        notification.addEventListener('animationend', removeNotification);
    }

    // --- THEME MANAGEMENT ---
    function updateThemeToggleIcon(theme) {
        if (!DOMElements.lightIcon || !DOMElements.darkIcon || !DOMElements.themeToggle) return;

        if (theme === 'dark') {
            DOMElements.lightIcon.classList.remove(CONFIG.classes.iconHidden);
            DOMElements.lightIcon.classList.add(CONFIG.classes.iconVisible);
            DOMElements.darkIcon.classList.remove(CONFIG.classes.iconVisible);
            DOMElements.darkIcon.classList.add(CONFIG.classes.iconHidden);
        } else {
            DOMElements.lightIcon.classList.remove(CONFIG.classes.iconVisible);
            DOMElements.lightIcon.classList.add(CONFIG.classes.iconHidden);
            DOMElements.darkIcon.classList.remove(CONFIG.classes.iconHidden);
            DOMElements.darkIcon.classList.add(CONFIG.classes.iconVisible);
        }
        DOMElements.themeToggle.setAttribute('aria-label', `Basculer vers le mode ${theme === 'dark' ? 'clair' : 'sombre'}`);
    }

    function announceThemeChange(theme) {
        const announcement = document.createElement('div');
        announcement.setAttribute(CONFIG.attributes.ariaLive, 'polite');
        announcement.classList.add(CONFIG.classes.srOnly);
        announcement.textContent = `Thème changé en mode ${theme === 'dark' ? 'sombre' : 'clair'}`;
        DOMElements.body.appendChild(announcement);

        setTimeout(() => {
            announcement.remove();
        }, CONFIG.themeAnnouncementTimeout);
    }

    function initThemeManagement() {
        if (!DOMElements.themeToggle) return;

        const savedTheme = localStorage.getItem(CONFIG.localStorageKeys.theme);
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        let currentTheme = 'light'; // Default theme

        if (savedTheme) {
            currentTheme = savedTheme;
        } else if (prefersDarkScheme) {
            currentTheme = 'dark';
        }

        document.documentElement.setAttribute(CONFIG.attributes.dataTheme, currentTheme);
        updateThemeToggleIcon(currentTheme);

        DOMElements.themeToggle.addEventListener('click', () => {
            const currentDataTheme = document.documentElement.getAttribute(CONFIG.attributes.dataTheme);
            const newTheme = currentDataTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute(CONFIG.attributes.dataTheme, newTheme);
            localStorage.setItem(CONFIG.localStorageKeys.theme, newTheme);
            updateThemeToggleIcon(newTheme);
            announceThemeChange(newTheme);
        });
    }

    // --- SERVICE WORKER REGISTRATION ---
    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register(CONFIG.serviceWorkerPath)
                    .then(() => console.log('ServiceWorker: Registration successful'))
                    .catch(err => console.error('ServiceWorker: Registration failed: ', err));
            });
        }
    }

    // --- FOOTER YEAR ---
    function initFooterYear() {
        const yearEl = document.getElementById('current-year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }

    // --- INITIALIZATION ---
    document.addEventListener('DOMContentLoaded', () => {
        cacheDOMElements();
        initSmoothScroll();
        initMobileMenu();
        initScrollEffects();
        initScrollAnimations();
        initContactForm();
        initThemeManagement();
        initServiceWorker();
        initFooterYear();
    });

})();