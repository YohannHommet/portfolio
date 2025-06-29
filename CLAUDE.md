# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern personal portfolio website built with vanilla HTML, CSS, and JavaScript. It's a static site optimized for performance, accessibility, and SEO, deployed on Netlify with PWA capabilities.

## Development Commands

### Local Development
```bash
pnpm start                    # Start development server with browser-sync
```

### Build Process
```bash
pnpm run build               # Full production build
pnpm run optimize:css        # Optimize CSS with PostCSS
pnpm run optimize:js         # Minify JavaScript with Terser
pnpm run copy:static         # Copy static assets to dist/
pnpm run copy:documents      # Copy PDF documents to dist/
```

### Deployment
```bash
pnpm run deploy              # Build and deploy to Netlify
```

## Architecture & Structure

### CSS Architecture
The project uses a modular CSS architecture with PostCSS processing:

- **Base**: Variables (`_variables.css`) and reset styles (`_reset.css`)
- **Components**: Reusable UI components (buttons, cards, social, notifications, animations, accessibility, utilities)
- **Layout**: Structural elements (navbar, footer)
- **Sections**: Page-specific sections (hero, about, projects, contact)

All CSS is imported through `assets/style/styles.css` using PostCSS imports and processed with autoprefixer and cssnano for optimization.

### JavaScript Architecture
The main script (`assets/js/script.js`) follows a modular pattern with:

- **Configuration object** (`CONFIG`) containing all selectors, classes, and settings
- **DOM element caching** for performance
- **Feature modules**: Smooth scroll, mobile menu, navbar effects, active section highlighting, contact form, notifications, theme management, service worker
- **Utility functions** like debounce for performance optimization

Key features:
- Theme switching (light/dark mode with localStorage persistence)
- Responsive mobile navigation
- Smooth scrolling with focus management
- Active section highlighting during scroll
- Contact form handling with notifications
- PWA service worker registration

### Build System
- **PostCSS**: CSS processing with imports, autoprefixer, and cssnano minification
- **Terser**: JavaScript minification and compression
- **Copyfiles**: Asset copying to dist/ directory
- **Browser-sync**: Development server with live reload

### Deployment & Performance
- **Netlify deployment** with optimized caching headers
- **Security headers**: CSP, XSS protection, frame options
- **PWA features**: Service worker, web manifest, offline support
- **Performance optimizations**: Asset minification, lazy loading, efficient CSS/JS

## Important Files

- `index.html`: Main entry point with semantic HTML structure
- `assets/js/script.js`: Core application logic and interactions
- `assets/style/styles.css`: CSS entry point with modular imports
- `postcss.config.js`: PostCSS configuration for CSS processing
- `netlify.toml`: Deployment configuration with security headers
- `site.webmanifest`: PWA manifest file
- `assets/js/service-worker.js`: PWA service worker for offline functionality

## Development Notes

- The site is built with accessibility-first principles (WCAG 2.1 AA compliant)
- All JavaScript is vanilla ES6+ with no external dependencies
- CSS uses modern features with PostCSS fallbacks
- The contact form currently simulates submission (replace with actual endpoint if needed)
- Theme preference is detected from system settings and stored in localStorage
- All assets are optimized for production builds