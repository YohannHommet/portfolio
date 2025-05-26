# Yohann Hommet - Personal Portfolio

## Technical Documentation

## Table of Contents
- [Project Overview](#project-overview)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [Technical Features](#technical-features)
- [Build Process](#build-process)
- [Deployment](#deployment)
- [Browser Support](#browser-support)
- [Performance](#performance)
- [Development](#development)
- [Future Improvements](#future-improvements)

## Project Overview

A modern, performant, and accessible personal portfolio website showcasing Yohann Hommet's full-stack development skills. Built with vanilla HTML, CSS, and JavaScript, the site follows best practices for performance, accessibility, and progressive enhancement.

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        YOHANN HOMMET PORTFOLIO                      │
├─────────────────────────────────────────────────────────────────────┤
│  ┌───────────────┐     ┌─────────────────┐     ┌────────────────┐   │
│  │    Static     │     │    Build &      │     │   Deployment   │   │
│  │   Site Core   │────▶│   Optimization  │───▶│                │   │
│  └───────────────┘     └─────────────────┘     └────────────────┘   │
│          │                     │                        │           │
│  ┌───────┴───────┐   ┌─────────┴─────────┐     ┌────────┴───────┐   │
│  │     HTML      │   │        CSS        │     │                │   │
│  │  (index.html) │   │  (PostCSS + CSS   │     │   Netlify CDN  │   │
│  └───────────────┘   │   Modules)        │     │                │   │
│           │          └─────────┬─────────┘     └────────────────┘   │
│  ┌───────┴───────┐             │                        ▲           │
│  │  JavaScript   │   ┌─────────┴─────────┐              │           │
│  │  (script.js,  │   │    JavaScript     │              │           │
│  │service-worker.js) │    (Terser)       │              │           │
│  └───────┬───────┘   └─────────┬─────────┘              │           │
│          │                     │                        │           │
│  ┌───────┴───────┐   ┌─────────┴─────────┐     ┌────────┴───────┐   │
│  │   Assets      │   │   Optimization    │     │   PWA Features │   │
│  │ (images, pdf) │   │  (Minification,   │     │  (Offline,     │   │
│  └───────────────┘   │   Compression)    │     │   Caching)     │   │
│                      └───────────────────┘     └────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## File Structure

```
portfolio/
├── assets/
│   ├── documents/           # PDFs and downloadable content
│   ├── favicon/             # Favicon and PWA assets
│   ├── img/                 # Image assets
│   ├── js/
│   │   ├── script.js        # Main application logic
│   │   └── service-worker.js # PWA service worker
│   └── style/               # CSS architecture
│       ├── base/            # Variables, resets, typography
│       ├── components/      # Reusable UI components
│       ├── layout/          # Layout-specific styles
│       └── sections/        # Page section styles
├── index.html               # Main HTML entry point
└── offline.html             # Offline fallback page
```

## Technical Features

### 1. Progressive Web App (PWA)
- **Service Worker**: Implements robust caching strategies
- **Offline Support**: Fallback page and asset caching
- **Installable**: Web App Manifest for home screen installation
- **Versioning**: Cache versioning for seamless updates

### 2. Performance Optimizations
- **Critical CSS**: Inlined in the `<head>`
- **Lazy Loading**: Images and non-critical resources
- **Font Loading**: Preloaded with fallback
- **Build Process**: Minification and optimization of assets
- **Asset Preloading**: Critical resources preloaded for faster rendering

### 3. Accessibility (a11y)
- **Semantic HTML5**: Proper use of landmarks and ARIA
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG 2.1 AA compliant
- **Screen Reader**: Optimized for assistive technologies
- **Focus Management**: Proper focus handling for interactive elements

### 4. Service Worker Strategy
- **Pre-caching**: Core assets during install
- **Runtime Caching**: Dynamic content with network-first strategy
- **Image Caching**: Cache-first with network fallback
- **Versioning**: Cache busting with version strings
- **Cache Management**: Automatic cache trimming and cleanup

## Build Process

### Development
```bash
# Start development server with live reload
pnpm start
```

### Production Build
```bash
# Create production build
pnpm run build
```

### Build Pipeline
1. Clean `dist` directory
2. Process and optimize CSS with PostCSS
3. Minify JavaScript with Terser
4. Copy and optimize static assets
5. Generate production-ready build in `dist/`

### Dependencies
- **PostCSS**: CSS processing
- **Autoprefixer**: Vendor prefixing
- **CSSNano**: CSS minification
- **Terser**: JavaScript minification
- **BrowserSync**: Development server

## Deployment

### Hosting
- **Provider**: Netlify CDN
- **Domain**: yohann-hommet.netlify.app
- **HTTPS**: Enabled by default
- **Custom Domain**: Supported

### CI/CD
- Automatic deployments on push to `main` branch
- Preview deployments for pull requests
- Environment variables management

## Browser Support
- Modern evergreen browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers
- Responsive design for all device sizes
- Mobile-first approach

## Performance

### Lighthouse Scores
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Core Web Vitals
- **Largest Contentful Paint (LCP)**: < 1.5s
- **First Input Delay (FID)**: < 50ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Time to Interactive (TTI)**: < 2s

### Bundle Sizes
- **CSS**: ~15KB (gzipped)
- **JavaScript**: ~8KB (gzipped)
- **Images**: Optimized and responsive

## Development

### Getting Started
1. Clone the repository
2. Install dependencies: `pnpm install`
3. Start development server: `pnpm start`
4. Open `http://localhost:3000` in your browser

### Scripts
```json
{
  "start": "Start development server with live reload",
  "build": "Create production build",
  "optimize:css": "Process and minify CSS",
  "optimize:js": "Minify JavaScript",
  "deploy": "Build and deploy to Netlify"
}
```

### Code Style
- **CSS**: BEM methodology
- **JavaScript**: ES6+ with modern features
- **Formatting**: Prettier (not enforced)
- **Linting**: Basic ESLint rules

## Future Improvements

### High Priority
1. **Image Optimization**: Implement responsive images with srcset
2. **Content Security Policy**: Add for enhanced security
3. **Analytics**: Add privacy-focused analytics

### Medium Priority
4. **Performance Monitoring**: Real user monitoring
5. **Internationalization**: Multi-language support
6. **Dark Mode**: System preference detection

### Low Priority
7. **Animations**: Subtle micro-interactions
8. **Blog Section**: Technical writing showcase
9. **Project Showcase**: Interactive demos

## License
Personal Use Only - All rights reserved © Yohann Hommet

## Contact
For any questions or inquiries, please contact Yohann Hommet directly.
