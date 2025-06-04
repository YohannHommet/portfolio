# Portfolio Website - Technical Architecture Documentation

## 🎯 Project Overview

This documentation provides a comprehensive analysis of Yohann Hommet's personal portfolio website - a sophisticated static site that demonstrates modern web development best practices using vanilla technologies enhanced with contemporary tooling and optimization strategies.

### Project Goals
- **Performance First**: Sub-second load times with optimal Core Web Vitals
- **Accessibility Driven**: WCAG 2.1 AA compliance with semantic HTML and ARIA
- **SEO Optimized**: Comprehensive meta tags, structured data, and social sharing
- **Progressive Enhancement**: PWA capabilities with offline support
- **Security Focused**: Content Security Policy and security headers
- **Developer Experience**: Modern build pipeline with live reloading and optimization

---

## 🏗️ System Architecture Overview

```mermaid
graph TB
    subgraph "Frontend Layer"
        HTML[HTML5 Semantic Structure]
        CSS[CSS3 with Custom Properties]
        JS[Vanilla JavaScript ES6+]
    end
    
    subgraph "Build Pipeline"
        PostCSS[PostCSS Processing]
        Terser[JavaScript Minification]
        CopyFiles[Static Asset Management]
    end
    
    subgraph "Development Tools"
        BrowserSync[Browser-sync Dev Server]
        PNPM[Package Management]
        FileWatch[File Watching & Auto-reload]
    end
    
    subgraph "Deployment & Hosting"
        Netlify[Netlify Edge CDN]
        SecurityHeaders[Security Headers]
        CacheStrategy[Intelligent Caching]
    end
    
    subgraph "PWA Features"
        ServiceWorker[Service Worker]
        WebManifest[Web App Manifest]
        OfflineSupport[Offline Capability]
    end
    
    subgraph "Performance Optimization"
        LazyLoading[Image Lazy Loading]
        AssetPreloading[Critical Resource Preloading]
        Compression[Gzip/Brotli Compression]
        ImageOptimization[WebP Image Format]
    end
    
    HTML --> PostCSS
    CSS --> PostCSS
    JS --> Terser
    PostCSS --> Netlify
    Terser --> Netlify
    CopyFiles --> Netlify
    
    BrowserSync --> HTML
    BrowserSync --> CSS
    BrowserSync --> JS
    
    Netlify --> ServiceWorker
    Netlify --> WebManifest
    ServiceWorker --> OfflineSupport
    
    Netlify --> SecurityHeaders
    Netlify --> CacheStrategy
    Netlify --> Compression
```

---

## 📁 Project Structure Analysis

```mermaid
graph TD
    Root[Portfolio Project Root]
    
    Root --> Assets[assets/]
    Root --> Config[Configuration Files]
    Root --> Pages[HTML Pages]
    Root --> Deploy[Deployment Files]
    
    Assets --> Documents[documents/ - PDF Resume]
    Assets --> Favicon[favicon/ - PWA Icons]
    Assets --> Images[img/ - Project Screenshots]
    Assets --> Scripts[js/ - JavaScript Modules]
    Assets --> Styles[style/ - CSS Architecture]
    Assets --> SVG[svg/ - Vector Graphics]
    
    Styles --> Base[base/ - Variables & Reset]
    Styles --> Components[components/ - UI Components]
    Styles --> Layout[layout/ - Structural Styles]
    Styles --> Sections[sections/ - Page-specific Styles]
    
    Scripts --> MainScript[script.js - Core Functionality]
    Scripts --> ServiceWorkerScript[service-worker.js - PWA Logic]
    
    Config --> PackageJSON[package.json - Dependencies]
    Config --> PostCSSConfig[postcss.config.js - Build Setup]
    Config --> NetlifyConfig[netlify.toml - Deployment Config]
    
    Pages --> IndexHTML[index.html - Main Page]
    Pages --> OfflineHTML[offline.html - PWA Fallback]
    
    Deploy --> WebManifest[site.webmanifest - PWA Manifest]
    Deploy --> Robots[robots.txt - SEO Crawling]
    Deploy --> Sitemap[sitemap.xml - Search Engine Map]
    
    Base --> Variables[_variables.css - Design Tokens]
    Base --> Reset[_reset.css - Normalize Styles]
    
    Components --> Buttons[_buttons.css - Button Variants]
    Components --> Cards[_cards.css - Card Components]
    Components --> Social[_social.css - Social Icons]
    Components --> Notifications[_notifications.css - Toast Messages]
    Components --> Animations[_animation.css - Motion Design]
    Components --> Accessibility[_accessibility.css - A11y Utilities]
    Components --> Utilities[_utilities.css - Helper Classes]
    
    Layout --> Navbar[_navbar.css - Navigation]
    Layout --> Footer[_footer.css - Site Footer]
    
    Sections --> Hero[_hero.css - Landing Section]
    Sections --> About[_about.css - Skills & Bio]
    Sections --> Projects[_projects.css - Portfolio Grid]
    Sections --> Contact[_contact.css - Contact Form]
```

---

## ⚙️ Build Process Workflow

```mermaid
flowchart TD
    Start([Development Start]) --> Install[pnpm install]
    Install --> DevServer[npm start<br/>Browser-sync Server]
    
    DevServer --> FileWatch{File Changes Detected}
    FileWatch -->|HTML/CSS/JS Change| Reload[Auto-reload Browser]
    FileWatch -->|No Changes| Wait[Wait for Changes]
    Reload --> Wait
    Wait --> FileWatch
    
    DevServer --> BuildTrigger{Ready for Production?}
    BuildTrigger -->|Yes| BuildStart[npm run build]
    BuildTrigger -->|No| Wait
    
    BuildStart --> CleanDist[rm -rf dist/]
    CleanDist --> CopyStatic[Copy Static Files<br/>HTML, Images, Favicons]
    CopyStatic --> OptimizeCSS[PostCSS Processing<br/>Import → Autoprefix → Minify]
    OptimizeCSS --> OptimizeJS[Terser Compression<br/>Minify & Mangle]
    OptimizeJS --> CopyDocs[Copy Documents<br/>PDF Resume]
    CopyDocs --> BuildComplete[Build Complete - dist/]
    
    BuildComplete --> Deploy{Deploy to Netlify?}
    Deploy -->|Yes| NetlifyDeploy[npm run deploy<br/>Netlify CLI Upload]
    Deploy -->|No| LocalBuild[Local Build Ready]
    
    NetlifyDeploy --> CDN[Netlify Edge CDN]
    CDN --> SecurityHeaders[Apply Security Headers]
    SecurityHeaders --> CacheHeaders[Set Cache Control]
    CacheHeaders --> LiveSite[Live Website]
    
    LocalBuild --> TestLocal[Local Testing]
    TestLocal --> BuildTrigger
```

---

## 🎨 CSS Architecture Pattern

```mermaid
graph LR
    MainCSS[styles.css<br/>Entry Point]
    
    MainCSS --> BaseLayer[Base Layer]
    MainCSS --> ComponentLayer[Component Layer]
    MainCSS --> LayoutLayer[Layout Layer]
    MainCSS --> SectionLayer[Section Layer]
    
    BaseLayer --> Variables[_variables.css<br/>Design Tokens<br/>Theme Variables]
    BaseLayer --> Reset[_reset.css<br/>CSS Normalize<br/>Base Styles]
    
    ComponentLayer --> Buttons[_buttons.css<br/>Button Variants<br/>Interactive States]
    ComponentLayer --> Cards[_cards.css<br/>Project Cards<br/>Skill Cards]
    ComponentLayer --> Social[_social.css<br/>Social Icons<br/>Hover Effects]
    ComponentLayer --> Notifications[_notifications.css<br/>Toast Messages<br/>Success/Error States]
    ComponentLayer --> Animations[_animation.css<br/>Scroll Animations<br/>Transitions]
    ComponentLayer --> A11y[_accessibility.css<br/>Screen Reader<br/>Focus States]
    ComponentLayer --> Utils[_utilities.css<br/>Helper Classes<br/>Spacing/Typography]
    
    LayoutLayer --> Navbar[_navbar.css<br/>Navigation<br/>Mobile Menu]
    LayoutLayer --> Footer[_footer.css<br/>Site Footer<br/>Links]
    
    SectionLayer --> Hero[_hero.css<br/>Landing Section<br/>CTA Buttons]
    SectionLayer --> About[_about.css<br/>Skills Grid<br/>Biography]
    SectionLayer --> Projects[_projects.css<br/>Portfolio Grid<br/>Project Cards]
    SectionLayer --> Contact[_contact.css<br/>Contact Form<br/>Validation Styles]
    
    Variables --> ThemeLight[Light Theme<br/>CSS Custom Properties]
    Variables --> ThemeDark[Dark Theme<br/>data-theme="dark"]
```

---

## 🔄 User Interaction Flow

```mermaid
flowchart TD
    UserVisit[User Visits Site] --> LoadCheck{Service Worker<br/>Cache Check}
    LoadCheck -->|Cache Hit| ServeCache[Serve from Cache<br/>Instant Load]
    LoadCheck -->|Cache Miss| FetchNetwork[Fetch from Network<br/>Cache Response]
    
    ServeCache --> PageLoad[Page Loaded]
    FetchNetwork --> PageLoad
    
    PageLoad --> InitJS[Initialize JavaScript<br/>Event Listeners]
    InitJS --> ThemeCheck{User Theme<br/>Preference}
    
    ThemeCheck -->|Stored Preference| ApplyTheme[Apply Saved Theme]
    ThemeCheck -->|No Preference| SystemTheme[Use System Theme]
    
    ApplyTheme --> InteractiveReady[Site Interactive]
    SystemTheme --> InteractiveReady
    
    InteractiveReady --> UserActions{User Actions}
    
    UserActions -->|Navigation Click| SmoothScroll[Smooth Scroll<br/>Update Active State]
    UserActions -->|Theme Toggle| ToggleTheme[Switch Theme<br/>Store Preference<br/>Announce Change]
    UserActions -->|Mobile Menu| ToggleMenu[Toggle Mobile Menu<br/>ARIA Updates]
    UserActions -->|Contact Form| FormValidation[Validate Form<br/>Submit Handler]
    UserActions -->|Scroll| ScrollEffects[Update Navbar<br/>Highlight Section]
    
    SmoothScroll --> UpdateURL[Update Browser URL<br/>History Push State]
    ToggleTheme --> UpdateDOM[Update DOM<br/>CSS Variables]
    ToggleMenu --> UpdateARIA[Update ARIA States<br/>Focus Management]
    FormValidation --> ShowNotification[Show Success/Error<br/>Toast Message]
    ScrollEffects --> AnimateElements[Trigger Animations<br/>Intersection Observer]
    
    UpdateURL --> UserActions
    UpdateDOM --> UserActions
    UpdateARIA --> UserActions
    ShowNotification --> UserActions
    AnimateElements --> UserActions
    
    UserActions -->|Page Unload| Cleanup[Event Cleanup<br/>Memory Management]
```

---

## 🚀 Feature Implementation Matrix

```mermaid
mindmap
  root)Portfolio Features(
    )Performance(
      Lazy Loading
      Image Optimization
      Resource Preloading
      Service Worker Caching
      Gzip Compression
      Critical CSS Inline
    )Accessibility(
      Semantic HTML
      ARIA Labels
      Keyboard Navigation
      Focus Management
      Screen Reader Support
      Color Contrast
    )SEO Optimization(
      Meta Tags
      Open Graph
      Twitter Cards
      Structured Data
      Sitemap XML
      Robots.txt
    )Progressive Web App(
      Web App Manifest
      Service Worker
      Offline Support
      App Install Prompt
      Background Sync
      Push Notifications
    )User Experience(
      Smooth Scrolling
      Theme Switching
      Mobile Responsive
      Touch Gestures
      Loading States
      Error Handling
    )Development(
      Hot Reloading
      CSS Processing
      JS Minification
      File Watching
      Build Optimization
      Deployment Pipeline
```

---

## 🛠️ Technology Stack Deep Dive

### Frontend Technologies

| Technology | Purpose | Implementation Details |
|------------|---------|----------------------|
| **HTML5** | Structure & Semantics | Semantic elements, ARIA labels, microdata |
| **CSS3** | Styling & Layout | Custom properties, Grid, Flexbox, animations |
| **JavaScript ES6+** | Interactivity | Modules, async/await, intersection observer |
| **Web APIs** | Modern Capabilities | Service Worker, Web App Manifest, localStorage |

### Build & Development Tools

```mermaid
graph TD
    subgraph "Package Management"
        PNPM[PNPM Fast Package Manager]
    end
    
    subgraph "CSS Processing"
        PostCSS[PostCSS Processor]
        PostCSS --> Import[postcss-import<br/>File Imports]
        PostCSS --> Autoprefixer[autoprefixer<br/>Vendor Prefixes]
        PostCSS --> CSSNano[cssnano<br/>Minification]
    end
    
    subgraph "JavaScript Processing"
        Terser[Terser Minifier]
        Terser --> Compress[Code Compression]
        Terser --> Mangle[Variable Mangling]
    end
    
    subgraph "Development Server"
        BrowserSync[Browser-sync]
        BrowserSync --> LiveReload[Live Reloading]
        BrowserSync --> FileWatch[File Watching]
        BrowserSync --> DevServer[Development Server]
    end
    
    subgraph "File Management"
        CopyFiles[copyfiles Utility]
        CopyFiles --> StaticAssets[Static Asset Copying]
        CopyFiles --> DirectoryStructure[Directory Structure]
    end
    
    PNPM --> PostCSS
    PNPM --> Terser
    PNPM --> BrowserSync
    PNPM --> CopyFiles
```

---

## 🔒 Security Implementation

```mermaid
graph TB
    subgraph "Content Security Policy"
        CSP[Strict CSP Headers]
        CSP --> DefaultSrc[default-src 'self']
        CSP --> ScriptSrc[script-src CDN Whitelist]
        CSP --> StyleSrc[style-src Fonts & CDN]
        CSP --> ImgSrc[img-src Data URLs & HTTPS]
        CSP --> FrameSrc[frame-src 'none']
    end
    
    subgraph "Security Headers"
        XContentType[X-Content-Type-Options: nosniff]
        XFrameOptions[X-Frame-Options: DENY]
        XSSProtection[X-XSS-Protection: 1; mode=block]
        ReferrerPolicy[Referrer-Policy: strict-origin-when-cross-origin]
        PermissionsPolicy[Permissions-Policy: Restrictive]
    end
    
    subgraph "HTTPS Enforcement"
        UpgradeInsecure[upgrade-insecure-requests]
        HSTS[HTTP Strict Transport Security]
        SecureCookies[Secure Cookie Attributes]
    end
    
    subgraph "Input Validation"
        FormValidation[Client-side Validation]
        SanitizeInputs[Input Sanitization]
        CSRF[CSRF Protection via Netlify]
    end
    
    CSP --> SecurityHeaders
    SecurityHeaders --> HTTPS
    HTTPS --> InputValidation
```

---

## 📊 Performance Optimization Strategy

```mermaid
flowchart LR
    subgraph "Loading Performance"
        CriticalCSS[Critical CSS Inline]
        ResourceHints[Resource Hints<br/>Preload/Preconnect]
        LazyImages[Image Lazy Loading]
        AsyncScripts[Async Script Loading]
    end
    
    subgraph "Runtime Performance"
        ServiceWorker[Service Worker Caching]
        MemoryManagement[Memory Management<br/>Event Cleanup]
        RequestAnimationFrame[RAF for Smooth Animations]
        Debouncing[Event Debouncing]
    end
    
    subgraph "Network Optimization"
        CDN[Netlify Edge CDN]
        Compression[Gzip/Brotli Compression]
        CacheHeaders[Intelligent Cache Headers]
        HTTP2[HTTP/2 Push]
    end
    
    subgraph "Asset Optimization"
        ImageOptimization[WebP Images]
        CSSMinification[CSS Minification]
        JSMinification[JavaScript Minification]
        FontOptimization[Font Display Swap]
    end
    
    CriticalCSS --> ServiceWorker
    ResourceHints --> CDN
    LazyImages --> Compression
    AsyncScripts --> CacheHeaders
    
    ServiceWorker --> ImageOptimization
    MemoryManagement --> CSSMinification
    RequestAnimationFrame --> JSMinification
    Debouncing --> FontOptimization
```

---

## 🚀 Deployment Pipeline

```mermaid
sequenceDiagram
    participant Dev as Developer
    participant Local as Local Environment
    participant Build as Build Process
    participant Netlify as Netlify Platform
    participant CDN as Global CDN
    participant User as End User
    
    Dev->>Local: npm start (Development)
    Local->>Dev: Browser-sync Live Reload
    
    Note over Dev,Local: Development Loop
    
    Dev->>Build: npm run build
    Build->>Build: Clean dist/ directory
    Build->>Build: Copy static files
    Build->>Build: Process CSS (PostCSS)
    Build->>Build: Minify JavaScript (Terser)
    Build->>Build: Copy documents
    Build->>Local: Generate dist/ folder
    
    Dev->>Netlify: npm run deploy
    Netlify->>Netlify: Upload build artifacts
    Netlify->>Netlify: Apply security headers
    Netlify->>Netlify: Configure cache headers
    Netlify->>CDN: Deploy to edge locations
    
    User->>CDN: Request website
    CDN->>User: Serve cached content
    
    Note over CDN,User: Sub-100ms response time
```

---

## 📱 Progressive Web App Implementation

```mermaid
graph TD
    subgraph "PWA Core Features"
        WebManifest[Web App Manifest]
        ServiceWorker[Service Worker]
        OfflineFirst[Offline-First Strategy]
    end
    
    subgraph "Manifest Configuration"
        AppName[App Name & Short Name]
        Icons[Maskable Icons 192x192, 512x512]
        Display[Standalone Display Mode]
        ThemeColor[Theme Color Matching]
        StartURL[Start URL Configuration]
    end
    
    subgraph "Service Worker Strategy"
        CacheFirst[Cache First for Assets]
        NetworkFirst[Network First for HTML]
        StaleWhileRevalidate[Stale While Revalidate for CSS/JS]
        OfflineFallback[Offline Fallback Page]
    end
    
    subgraph "Installation & Engagement"
        InstallPrompt[Install Banner]
        HomeScreenIcon[Home Screen Icon]
        SplashScreen[Splash Screen]
        FullscreenMode[Fullscreen Mode]
    end
    
    WebManifest --> AppName
    WebManifest --> Icons
    WebManifest --> Display
    WebManifest --> ThemeColor
    
    ServiceWorker --> CacheFirst
    ServiceWorker --> NetworkFirst
    ServiceWorker --> StaleWhileRevalidate
    ServiceWorker --> OfflineFallback
    
    OfflineFirst --> InstallPrompt
    OfflineFirst --> HomeScreenIcon
    OfflineFirst --> SplashScreen
    OfflineFirst --> FullscreenMode
```

---

## 🧪 Development Workflow

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
npm start

# Build for production
npm run build

# Deploy to Netlify
npm run deploy
```

### Development Scripts Analysis

| Script | Purpose | Tools Used |
|--------|---------|------------|
| `start` | Development server with live reload | Browser-sync |
| `build` | Complete production build pipeline | Multiple tools |
| `optimize:css` | CSS processing and minification | PostCSS, CSSNano |
| `optimize:js` | JavaScript minification | Terser |
| `copy:documents` | Static document copying | copyfiles |
| `copy:static` | Static asset management | copyfiles |
| `deploy` | Build and deploy to Netlify | Netlify CLI |

### File Watching Strategy

```mermaid
graph LR
    FileWatcher[Browser-sync File Watcher]
    
    FileWatcher --> HTML[*.html Changes]
    FileWatcher --> CSS[*.css Changes]
    FileWatcher --> JS[*.js Changes]
    FileWatcher --> JSON[*.json Changes]
    
    HTML --> Reload[Browser Reload]
    CSS --> Inject[CSS Hot Injection]
    JS --> Reload
    JSON --> Reload
    
    Reload --> DevServer[Development Server]
    Inject --> DevServer
```

---

## 📈 Performance Metrics & Monitoring

### Core Web Vitals Targets

| Metric | Target | Implementation |
|--------|---------|----------------|
| **LCP** | < 2.5s | Image optimization, critical resource preloading |
| **FID** | < 100ms | Minimal JavaScript, event delegation |
| **CLS** | < 0.1 | Reserved space for images, stable layouts |
| **TTFB** | < 600ms | CDN delivery, service worker caching |

### Monitoring Strategy

```mermaid
graph TD
    subgraph "Performance Monitoring"
        Lighthouse[Lighthouse CI]
        WebVitals[Core Web Vitals]
        RUM[Real User Monitoring]
    end
    
    subgraph "Metrics Collection"
        LoadTime[Page Load Time]
        ResourceTime[Resource Load Time]
        InteractionTime[Interaction Response Time]
        ErrorTracking[JavaScript Error Tracking]
    end
    
    subgraph "Optimization Actions"
        AssetOptimization[Asset Size Reduction]
        CacheStrategy[Cache Strategy Adjustment]
        CodeSplitting[Code Splitting Implementation]
        CDNOptimization[CDN Configuration]
    end
    
    Lighthouse --> LoadTime
    WebVitals --> ResourceTime
    RUM --> InteractionTime
    
    LoadTime --> AssetOptimization
    ResourceTime --> CacheStrategy
    InteractionTime --> CodeSplitting
    ErrorTracking --> CDNOptimization
```

---

## 🔧 Maintenance & Updates

### Update Strategy

```mermaid
flowchart TD
    Schedule[Regular Maintenance Schedule]
    
    Schedule --> Dependencies[Update Dependencies]
    Schedule --> Security[Security Patches]
    Schedule --> Performance[Performance Audits]
    Schedule --> Content[Content Updates]
    
    Dependencies --> PackageAudit[npm audit / pnpm audit]
    Dependencies --> VersionCheck[Check for Breaking Changes]
    Dependencies --> TestUpdate[Test Updated Dependencies]
    
    Security --> HeadersReview[Review Security Headers]
    Security --> VulnerabilityScans[Vulnerability Scanning]
    Security --> CSPUpdates[Update CSP Policies]
    
    Performance --> LighthouseAudit[Lighthouse Performance Audit]
    Performance --> BundleAnalysis[Bundle Size Analysis]
    Performance --> ImageOptimization[Image Optimization Review]
    
    Content --> ProjectUpdates[Update Portfolio Projects]
    Content --> SkillsRefresh[Refresh Skills Section]
    Content --> CVUpdate[Update Resume/CV]
    
    TestUpdate --> Deploy[Deploy Updates]
    CSPUpdates --> Deploy
    ImageOptimization --> Deploy
    CVUpdate --> Deploy
```

---

## 🎯 Best Practices Demonstrated

### 1. **Performance Excellence**
- **Critical Resource Prioritization**: Preloading fonts and critical CSS
- **Efficient Caching Strategy**: Service worker with cache-first approach
- **Image Optimization**: WebP format with lazy loading
- **Bundle Optimization**: Tree shaking and minification

### 2. **Accessibility Leadership**
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **ARIA Implementation**: Labels, states, and live regions
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Descriptive alt text and announcements

### 3. **Security Hardening**
- **Content Security Policy**: Strict CSP preventing XSS attacks
- **Security Headers**: Comprehensive HTTP security headers
- **Input Validation**: Client-side form validation and sanitization
- **HTTPS Enforcement**: Secure communication protocols

### 4. **SEO Optimization**
- **Meta Tag Strategy**: Complete Open Graph and Twitter Card implementation
- **Structured Data**: Schema.org markup for better search understanding
- **Technical SEO**: Sitemap, robots.txt, and canonical URLs
- **Core Web Vitals**: Optimized for Google's ranking factors

---

## 🏆 Architecture Achievements

This portfolio demonstrates several sophisticated architectural decisions:

1. **Vanilla Technology Mastery**: Proving that modern web applications don't always require frameworks
2. **Build Pipeline Sophistication**: Enterprise-level build process for a static site
3. **Progressive Enhancement**: Graceful degradation with progressive feature enhancement
4. **Performance-First Design**: Every decision optimized for speed and user experience
5. **Accessibility-Driven Development**: Universal design principles throughout
6. **Security-Conscious Implementation**: Production-ready security measures
7. **Maintainable Architecture**: Organized code structure for long-term maintenance

---

## 📚 Conclusion

This portfolio website exemplifies how vanilla web technologies, when architected thoughtfully with modern tooling and best practices, can create sophisticated, performant, and maintainable web applications. The project serves as a blueprint for modern static site development, demonstrating that simplicity and sophistication are not mutually exclusive.

The combination of semantic HTML, systematically organized CSS, and purposeful JavaScript, enhanced by a robust build pipeline and deployment strategy, creates a website that excels in performance, accessibility, security, and user experience while remaining maintainable and scalable.

---

*This documentation serves as both technical reference and demonstration of modern web development practices. The architecture decisions made in this project can be applied to larger-scale applications and serve as a foundation for team development standards.*