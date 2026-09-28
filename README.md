# Yohann Hommet — Portfolio

Personal portfolio website for Yohann Hommet, Full Stack Developer. Built using semantic HTML, modular CSS, vanilla JavaScript, and progressive web app (PWA) capabilities.

**Live site:** [yohann-hommet.netlify.app](https://yohann-hommet.netlify.app)

---

## Overview

A lightweight, framework-free personal site designed for high performance, accessibility, and straightforward maintenance. The project uses vanilla web technologies paired with a minimal build toolchain (PostCSS and Terser) to optimize production assets without framework runtime overhead.

### Highlights

- **Framework-free**: Native HTML5, modern vanilla JavaScript (ES2022), and modular CSS.
- **Theme support**: Dark and light modes with automatic system preference detection (`prefers-color-scheme`) and persistent manual toggle.
- **PWA & offline support**: Service worker caching and offline fallback page (`offline.html`).
- **Modular styling**: CSS structured by concern (base, layout, components, sections) processed via PostCSS.
- **Security & caching**: Netlify configuration with strict Content Security Policy (CSP), security headers, and asset cache rules.

---

## Tech Stack

- **Core**: HTML5, CSS3, Vanilla JavaScript
- **CSS Tooling**: PostCSS, `postcss-import`, Autoprefixer, cssnano
- **JS Tooling**: Terser
- **Local Server**: BrowserSync
- **Package Manager**: pnpm
- **Hosting & CI/CD**: Netlify, GitHub Actions

---

## Project Structure

```text
portfolio/
├── assets/
│   ├── documents/          # Resume and downloadable files
│   ├── favicon/            # App icons and favicons
│   ├── img/                # Visual assets and project screenshots
│   ├── js/
│   │   ├── script.js       # Main application logic
│   │   └── service-worker.js # Cache management & offline support
│   ├── style/
│   │   ├── base/           # CSS reset, variables, typography
│   │   ├── components/     # Cards, buttons, form controls
│   │   ├── layout/         # Navigation, header, footer
│   │   ├── sections/       # Hero, projects, skills, contact
│   │   └── styles.css      # PostCSS entry stylesheet
│   └── svg/                # Vector icons and graphics
├── dist/                   # Production build output
├── .github/workflows/      # CI/CD and linting pipelines
├── index.html              # Main website page
├── offline.html            # Offline fallback page
├── netlify.toml            # Netlify build, headers, and redirect rules
├── package.json            # Scripts and devDependencies
├── postcss.config.mjs      # PostCSS configuration
└── site.webmanifest        # Web application manifest
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm (`npm install -g pnpm` or via Corepack)

### Installation

```bash
git clone https://github.com/YohannHommet/portfolio.git
cd portfolio
pnpm install
```

### Development

Start the local development server with live reload:

```bash
pnpm start
```

BrowserSync will serve the root directory and automatically reload on HTML, CSS, JS, and JSON changes (default URL: `http://localhost:3000` or `http://localhost:3001`).

### Production Build

Generate the optimized production bundle in `dist/`:

```bash
pnpm run build
```

This task runs:

1. Cleans existing `dist/` directory.
2. Copies static root files (`index.html`, `offline.html`, manifest, robots, sitemap) and assets (`img/`, `favicon/`).
3. Compiles and minifies CSS using PostCSS and cssnano.
4. Minifies and mangles JavaScript files using Terser.
5. Copies downloadable assets from `assets/documents/`.

---

## Available Scripts

| Command                 | Description                                                          |
| ----------------------- | -------------------------------------------------------------------- |
| `pnpm start`            | Launches BrowserSync development server with file watching           |
| `pnpm run build`        | Builds complete optimized distribution into `dist/`                  |
| `pnpm run optimize:css` | Compiles `assets/style/styles.css` to `dist/assets/style/styles.css` |
| `pnpm run optimize:js`  | Minifies `script.js` and `service-worker.js` with Terser             |
| `pnpm run deploy`       | Runs production build and deploys to Netlify CLI                     |

---

## Deployment

The project is hosted on Netlify. Production deployments run through automated Netlify Git integration or can be triggered manually via:

```bash
pnpm run deploy
```

HTTP response headers, CSP directives, and cache durations for static assets are managed in `netlify.toml`.

---

## License

Copyright © Yohann Hommet. Personal use only.
