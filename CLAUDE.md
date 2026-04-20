# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio website for Yohann Hommet (Full Stack Developer). Built with **vanilla HTML5, CSS3, and ES6+ JavaScript** — zero framework dependencies. Deployed on Netlify with PWA capabilities, targeting perfect Lighthouse scores.

**Live site**: https://yohannhommet.netlify.app (canonical URL)
**Language**: French (`lang="fr"` on `<html>`)

---

## Development Commands

```bash
pnpm start                    # Dev server with browser-sync + live reload
pnpm run build               # Full production build → dist/
pnpm run optimize:css        # PostCSS: import → autoprefixer → cssnano
pnpm run optimize:js         # Terser minification + compression
pnpm run copy:static         # Copy HTML, manifests, robots, sitemap, images, favicons
pnpm run copy:documents      # Copy CV PDF to dist/
pnpm run deploy              # Build then deploy to Netlify
```

**Build output**: `dist/` directory (gitignored). Always run `pnpm run build` before deploying or testing production behavior.

---

## Repository Structure

```
portfolio/
├── index.html                  # Main entry point (single-page)
├── offline.html                # PWA offline fallback page
├── site.webmanifest            # PWA manifest (name, icons, display, theme)
├── netlify.toml                # Deployment config + security/cache headers
├── postcss.config.js           # CSS pipeline: postcss-import → autoprefixer → cssnano
├── package.json                # Scripts and devDependencies (pnpm)
├── .htmlhintrc                 # HTML linting rules
├── .htmlvalidaterc.json        # HTML validation (WCAG H37/H67/H71, BEM class naming)
├── .stylelintrc.json           # CSS linting (2-space indent, no !important, etc.)
├── MIGRATION.md                # Migration history notes
├── GITHUB_ACTIONS_SETUP.md     # CI/CD setup guide
├── assets/
│   ├── js/
│   │   ├── script.js           # Core application logic (IIFE, CONFIG-driven)
│   │   └── service-worker.js   # PWA offline caching strategy
│   ├── style/
│   │   ├── styles.css          # CSS entry point — imports all partials
│   │   ├── base/
│   │   │   ├── _variables.css  # CSS custom properties (light/dark themes)
│   │   │   └── _reset.css      # Universal reset + font stack + smooth scroll
│   │   ├── components/
│   │   │   ├── _buttons.css
│   │   │   ├── _cards.css
│   │   │   ├── _social.css
│   │   │   ├── _notifications.css
│   │   │   ├── _animation.css  # Keyframe animations + transition utilities
│   │   │   ├── _accessibility.css  # sr-only, focus states
│   │   │   └── _utilities.css
│   │   ├── layout/
│   │   │   ├── _navbar.css
│   │   │   └── _footer.css
│   │   └── sections/
│   │       ├── _hero.css
│   │       ├── _about.css
│   │       ├── _experience.css
│   │       └── _projects.css
│   │       └── _contact.css
│   ├── img/
│   │   ├── cvyber-snake.png    # Cyber Snake project screenshot
│   │   └── meow-development.png # Meow Development project screenshot
│   ├── favicon/                # All favicon variants + OG image
│   ├── svg/
│   │   ├── sun.svg             # Light theme icon
│   │   └── moon.svg            # Dark theme icon
│   └── documents/
│       └── cv_yohann_hommet.pdf
└── .github/
    └── workflows/
        ├── ci.yml              # Lint, build, security, accessibility, Lighthouse
        ├── deploy.yml          # Netlify deployment pipeline
        └── maintenance.yml     # Scheduled maintenance tasks
```

---

## CSS Architecture

### Naming Conventions
- **BEM methodology** enforced by `.htmlvalidaterc.json`: `block__element--modifier` (kebab-case)
- IDs: kebab-case only
- No `!important` (stylelint enforced)
- 2-space indentation, double quotes, lowercase hex colors (short format)

### Theme System
Theming is done via CSS custom properties with `[data-theme="dark"]` attribute on `<html>`:

**Light mode (default)**:
```css
--background-color: #ffffff
--text-color: #1a1a1a
--primary-color: #00a8e8
--accent-color: #00a8e8
--accent-color-secondary: #7928ca
--card-background: rgba(255, 255, 255, 0.8)
```

**Dark mode** (`[data-theme="dark"]`):
```css
--background-color: #0a0a0a
--text-color: rgba(255, 255, 255, 0.95)
--card-background: rgba(0, 0, 0, 0.3)
```

Always use CSS variables from `_variables.css` — never hardcode colors.

### Adding New Styles
1. Determine if it's a component, layout element, or section
2. Create or edit the appropriate partial file (`_*.css`)
3. The partial is already imported via `styles.css` (uses `@import` with postcss-import)
4. Do **not** add `<style>` tags to `index.html`

---

## JavaScript Architecture

### Structure
`script.js` uses a single IIFE wrapping all code, initialized on `DOMContentLoaded`.

**Central CONFIG object** at the top of `script.js` — all magic values go here:
```javascript
CONFIG = {
  mobileBreakpoint: 768,
  navbarScrollThreshold: 50,
  activeSectionOffset: 300,
  notificationTimeout: 5000,
  themeAnnouncementTimeout: 3000,
  resizeDebounceWait: 200,
  selectors: { /* all querySelector strings */ },
  classes: { /* all CSS class names */ },
  attributes: { /* ARIA & data attributes */ },
  localStorageKeys: { theme: 'theme' },
  serviceWorkerPath: '/assets/js/service-worker.js'
}
```

**Never hardcode** selectors, class names, or timing values outside CONFIG.

### Feature Modules (in script.js)
| Module | Purpose |
|--------|---------|
| Smooth scroll | Click navigation, focus management, history API |
| Mobile menu | Toggle with `aria-expanded` state |
| Navbar effects | Appearance change after 50px scroll |
| Active section | Highlights nav links based on scroll (300px offset) |
| Scroll animations | Viewport-based animation triggers (`data-aos`) |
| Contact form | Async submission, loading states, notifications |
| Notifications | Toast alerts with auto-removal |
| Theme management | OS preference detection, localStorage, screen reader announcements |
| Service worker | PWA registration |

### Adding New JavaScript Features
1. Add any new configuration to the `CONFIG` object
2. Implement as a self-contained function module
3. Call the init function inside the `DOMContentLoaded` handler
4. Cache DOM elements at the top with other cached selectors

---

## HTML Conventions

- Semantic HTML5 elements throughout (`<header>`, `<nav>`, `<section>`, `<footer>`, etc.)
- All sections have unique kebab-case IDs matching navigation anchors
- Images **must** have meaningful `alt` attributes (htmlhint enforced)
- Use `aria-expanded`, `aria-label`, `aria-live` for interactive elements
- No inline styles — use CSS classes only
- JSON-LD structured data block in `<head>` for Person schema

### Page Sections (in order)
1. `<nav class="navbar">` — Logo, nav links, theme toggle
2. `<header class="hero">` — Name, tagline, CTA buttons, social links
3. `<section id="about">` — Skills grid (8 technology cards)
4. `<section id="experience">` — Timeline with 4 professional entries
5. `<section id="projects">` — 2 featured project cards with overlays
6. `<section id="contact">` — Netlify form (name, email, message)
7. `<footer>` — Logo, dynamic copyright year

---

## Service Worker & PWA

`service-worker.js` uses **three separate caches** with different strategies:

| Cache | Strategy | Contents |
|-------|----------|----------|
| `static-cache-1.0.1` | Pre-cached on install | HTML, CSS, JS, favicon, manifest |
| `dynamic-cache-1.0.1` | Stale-while-revalidate | CSS/JS/fonts (CDN + local) |
| `images-cache-1.0.1` | Cache-first + network fallback | All images |

**When updating cached assets**: increment the version numbers in all three cache names. Old caches are deleted on `activate`.

HTML navigation requests use **network-first with navigation preload** — falls back to cached version, then `/offline.html`.

---

## CI/CD Pipeline

### GitHub Actions Workflows

**`ci.yml`** (runs on PR/push):
1. Code quality: HTML lint (`htmlhint`), CSS lint (`stylelint`), JS lint (`eslint` if configured)
2. Build & test: `pnpm run build`, verify `dist/` outputs, check file sizes
3. Security & performance: npm audit, Lighthouse CI, HTML validation (`html-validate`)
4. Accessibility: Pa11y at multiple viewport sizes (375px, 768px, 1440px)
5. Static analysis: Semantic HTML structure, responsive elements, security checks

**`deploy.yml`** (runs on push to main):
- Skip with `[skip deploy]` in commit message
- Builds, deploys to Netlify, then runs post-deploy Lighthouse + header verification

### Netlify Configuration (`netlify.toml`)

**Security headers** (all routes):
- CSP: restricts script/style/image sources
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`: disables camera, geolocation, etc.

**Cache strategy**:
- HTML files: `max-age=0, must-revalidate`
- Service worker: `max-age=0, must-revalidate`
- CSS/JS/static assets/favicons: `max-age=80000, immutable`

Do not change these cache policies without understanding the PWA update flow.

---

## Key Conventions for AI Assistants

### Do
- Use existing CSS variables for all colors and spacing
- Follow BEM naming for new HTML/CSS
- Add new JS config values to `CONFIG` object
- Keep all JS inside the IIFE
- Test with `pnpm run build` to verify the PostCSS pipeline
- Check accessibility: alt texts, ARIA labels, focus states, keyboard nav
- Use semantic HTML elements

### Don't
- Add `<style>` or `<script>` inline to HTML (except existing JSON-LD block)
- Hardcode colors, timing values, or selectors outside CONFIG/CSS variables
- Use `!important` in CSS
- Add npm dependencies to `dependencies` (all are `devDependencies` — this is a static site)
- Modify `dist/` directly (it's a build output)
- Change Netlify security headers or cache policies without explicit instruction
- Use `var` or `function` declarations — ES6+ only (`const`, `let`, arrow functions, etc.)

### Content Notes
- Portfolio content is in **French** — keep any user-facing text in French
- The contact form uses Netlify Forms (attribute `data-netlify="true"`) — no backend needed
- CV PDF is at `assets/documents/cv_yohann_hommet.pdf`
- Project images: Meow Development (`meow-development.png`), Cyber Snake (`cvyber-snake.png`)

### Performance Targets
- Lighthouse scores: 100 Performance, 100 Accessibility, 100 Best Practices, 100 SEO
- Do not add render-blocking resources
- New images should be appropriately sized and use `loading="lazy"` unless above the fold
- Google Fonts are preloaded with `rel="preload"` + `font-display=swap`
