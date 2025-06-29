# Astro Migration Plan: YohannHommet/portfolio

This document outlines the step-by-step plan to migrate the portfolio from its original vanilla HTML/CSS/JS architecture to a modern, component-based Astro project.

**Branch**: All work will be done on the `feat/astro-migration` branch.
**Epic Tracker**: [#2: [EPIC] Astro Migration](https://github.com/YohannHommet/portfolio/issues/2)

---

## Phase 1: Setup & Foundations

**Goal**: Establish the Astro project foundation and integrate the existing styling architecture.

- [ ] **Task 1: Branch & Initialize Astro**
    - **Description**: Create the migration branch and initialize a new Astro project within the current repository structure. This involves merging the new `package.json` with the existing one and installing all dependencies.
    - **GitHub Issue**: [#3: [MIG-1] Setup: Branch & Initialize Astro](https://github.com/YohannHommet/portfolio/issues/3)

- [ ] **Task 2: Configure Astro & Styling**
    - **Description**: Configure Astro to correctly process the existing PostCSS setup. This involves installing the `@astrojs/postcss` integration and moving the styles into the new `src/` directory.
    - **GitHub Issue**: [#4: [MIG-2] Setup: Configure Astro & Styling](https://github.com/YohannHommet/portfolio/issues/4)

---

## Phase 2: Building the Structure

**Goal**: Reconstruct the site's visual structure using Astro's component-based architecture.

- [ ] **Task 3: Create the Main Layout Component**
    - **Description**: Convert the main shell of `index.html` (including `<head>`, navigation, and footer) into a reusable `Layout.astro` component. This will serve as the template for all pages.
    - **GitHub Issue**: [#5: [MIG-3] Structure: Create the Main Layout](https://github.com/YohannHommet/portfolio/issues/5)

- [ ] **Task 4: Convert HTML Sections to Astro Components**
    - **Description**: Isolate each major `<section>` (Hero, About, Projects, Contact) from the original `index.html` into its own `.astro` component inside `src/components/sections/`.
    - **GitHub Issue**: [#6: [MIG-4] Structure: Convert HTML Sections to Astro Components](https://github.com/YohannHommet/portfolio/issues/6)

- [ ] **Task 5: Reconstruct the Home Page**
    - **Description**: Assemble the new layout and section components in `src/pages/index.astro` to create a visually identical replica of the original home page.
    - **GitHub Issue**: [#7: [MIG-5] Structure: Reconstruct the Home Page](https://github.com/YohannHommet/portfolio/issues/7)

---

## Phase 3: Functionality & Content Migration

**Goal**: Port all interactivity and transform hardcoded content into a dynamic, maintainable format.

- [ ] **Task 6: Migrate JavaScript for Interactivity**
    - **Description**: Move the client-side JavaScript from `assets/js/script.js` into the appropriate components using Astro's `<script>` tags, ensuring all interactive features (theme toggle, mobile menu, form validation) are restored.
    - **GitHub Issue**: [#8: [MIG-6] Functionality: Migrate JavaScript for Interactivity](https://github.com/YohannHommet/portfolio/issues/8)

- [ ] **Task 7: Migrate Projects to a Content Collection**
    - **Description**: Move the hardcoded project data into type-safe Markdown files using Astro's Content Collections. The `Projects.astro` component will be updated to fetch and render this data dynamically.
    - **GitHub Issue**: [#9: [MIG-7] Functionality: Migrate Projects to a Content Collection](https://github.com/YohannHommet/portfolio/issues/9)

---

## Phase 4: Finalization & Deployment

**Goal**: Configure the project for production, ensure all features like PWA and SEO are working, and clean up legacy files.

- [ ] **Task 8: Re-implement PWA & SEO**
    - **Description**: Move all static assets (`site.webmanifest`, `robots.txt`, etc.) to the `public/` folder and ensure the service worker and sitemap are correctly configured for the new Astro build.
    - **GitHub Issue**: [#10: [MIG-8] Finalization: Re-implement PWA & SEO](https://github.com/YohannHommet/portfolio/issues/10)

- [ ] **Task 9: Configure Netlify Deployment**
    - **Description**: Update `netlify.toml` and configure the Astro Netlify adapter to ensure the project builds and deploys correctly from the new source.
    - **GitHub Issue**: [#11: [MIG-9] Finalization: Configure Netlify Deployment](https://github.com/YohannHommet/portfolio/issues/11)

- [ ] **Task 10: Cleanup Legacy Files**
    - **Description**: Remove all files and configurations from the old build system, including the root `index.html`, the `assets/` directory, and old scripts from `package.json`.
    - **GitHub Issue**: [#12: [MIG-10] Finalization: Cleanup Legacy Files](https://github.com/YohannHommet/portfolio/issues/12) 