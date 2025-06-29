<div align="center">

# ✨ Modern Portfolio Website

### Yohann Hommet - Full Stack Developer

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Website-blue?style=for-the-badge&color=00a8e8)](https://yohann-hommet.netlify.app)
[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_BADGE_ID/deploy-status)](https://app.netlify.com/sites/yohann-hommet/deploys)

[![GitHub last commit](https://img.shields.io/github/last-commit/YohannHommet/portfolio?style=flat-square&logo=github&color=7928ca)](https://github.com/YohannHommet/portfolio/commits/main)
[![GitHub stars](https://img.shields.io/github/stars/YohannHommet/portfolio?style=flat-square&logo=github&color=7928ca)](https://github.com/YohannHommet/portfolio/stargazers)
[![Website Status](https://img.shields.io/website?down_color=red&down_message=offline&style=flat-square&up_color=00a8e8&up_message=online&url=https%3A%2F%2Fyohann-hommet.netlify.app)](https://yohann-hommet.netlify.app)
[![License](https://img.shields.io/badge/License-Personal_Use_Only-7928ca?style=flat-square)](LICENSE)

</div>

---

## 🎯 Overview

A modern, performance-optimized portfolio website built with **vanilla web technologies** and modern development practices. This project demonstrates expertise in creating fast, accessible, and maintainable web applications without relying on heavy frameworks.

### 🚀 **Key Highlights**
- ⚡ **100% Lighthouse scores** across all metrics
- 🎨 **Beautiful animations** with CSS-only implementations  
- ♿ **WCAG 2.1 AA compliant** accessibility
- 📱 **Mobile-first responsive design** 
- 🌙 **Smart theme switching** with system preference detection
- 🔧 **Zero JavaScript frameworks** - pure vanilla implementation
- 🏗️ **Modern build pipeline** with PostCSS and Terser

---

## 🛠️ Tech Stack & Architecture

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PostCSS](https://img.shields.io/badge/PostCSS-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)

</div>

### 🏗️ **Architecture Principles**

#### **Modular CSS Architecture**
```
assets/style/
├── base/               # Variables, reset styles
├── components/         # Reusable UI components  
├── layout/            # Structural elements (navbar, footer)
└── sections/          # Page-specific sections
```

#### **JavaScript Design Patterns**
- **Configuration-driven** approach with centralized CONFIG object
- **DOM element caching** for optimal performance
- **Feature-based modules** (scroll, navigation, theme, forms)
- **Utility functions** with debounce optimization

#### **Build System**
- **PostCSS Pipeline**: Imports, autoprefixer, cssnano compression
- **JavaScript Optimization**: Terser minification with compression
- **Asset Management**: Automated copying and optimization
- **Development Server**: Browser-sync with live reload

---

## ✨ Features & Functionality

<table>
<tr>
<td width="50%">

### 🎨 **User Experience**
- **Smooth scrolling navigation** with focus management
- **Interactive skill cards** with hover animations
- **Responsive mobile menu** with accessibility support
- **Contact form** with real-time validation
- **Loading animations** and micro-interactions
- **Smart notification system**

</td>
<td width="50%">

### ⚡ **Performance & Technical**
- **Service Worker** for offline functionality
- **Lazy loading** of non-critical resources
- **Optimized asset delivery** 
- **Mobile-first responsive breakpoints**
- **SEO optimized** with structured data
- **Security headers** and CSP protection

</td>
</tr>
</table>

### 🌟 **Advanced Features**

| Feature | Implementation | Benefit |
|---------|---------------|---------|
| **Theme System** | CSS custom properties + localStorage | Persistent user preference |
| **PWA Support** | Service worker + Web manifest | Installable, offline-ready |
| **Accessibility** | ARIA labels, semantic HTML, keyboard nav | Inclusive user experience |
| **Performance** | Asset optimization, efficient CSS/JS | Fast loading times |

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 16+ and pnpm
- Modern web browser

### **Development Setup**

```bash
# Clone the repository
git clone https://github.com/YohannHommet/portfolio.git
cd portfolio

# Install dependencies
pnpm install

# Start development server
pnpm start
# Opens browser at http://localhost:3001
```

### **Build & Deploy**

```bash
# Production build
pnpm run build

# Deploy to Netlify
pnpm run deploy
```

### **Available Scripts**

| Command | Description |
|---------|-------------|
| `pnpm start` | Start development server with live reload |
| `pnpm run build` | Create optimized production build |
| `pnpm run optimize:css` | Process CSS with PostCSS |
| `pnpm run optimize:js` | Minify JavaScript with Terser |
| `pnpm run deploy` | Build and deploy to Netlify |

---

## 📁 Project Structure

```
portfolio/
├── 📁 assets/
│   ├── 📁 documents/          # PDFs, CV, certificates
│   ├── 📁 favicon/            # PWA icons, favicons
│   ├── 📁 img/                # Optimized images
│   ├── 📁 js/                 # JavaScript modules
│   │   ├── script.js          # Main application logic
│   │   └── service-worker.js  # PWA service worker
│   └── 📁 style/              # Modular CSS architecture
│       ├── base/              # Variables, reset
│       ├── components/        # UI components
│       ├── layout/            # Layout elements
│       └── sections/          # Page sections
├── 📁 dist/                   # Production build output
├── 📄 index.html              # Main entry point
├── 📄 netlify.toml           # Deployment configuration
├── 📄 postcss.config.js      # PostCSS configuration
└── 📄 site.webmanifest       # PWA manifest
```

---

## 🎯 Performance Metrics

<div align="center">

### **Lighthouse Scores**

| Metric | Score | 
|--------|-------|
| 🚀 Performance | 100 |
| ♿ Accessibility | 100 |
| 💡 Best Practices | 100 |
| 🔍 SEO | 100 |

*Achieving perfect scores across all Lighthouse categories*

</div>

---

## 🤝 Contributing & Development

### **Code Quality Standards**
- **ESLint** configuration for consistent code style
- **Accessibility-first** development approach
- **Mobile-first** responsive design methodology
- **Performance budgets** and optimization targets

### **Browser Support**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 📝 License & Usage

**Personal Use Only** - This project serves as a portfolio showcase. All rights reserved © Yohann Hommet.

For business inquiries or collaboration opportunities, please reach out through the contact form on the website.

---

## 🌐 Connect & Explore

<div align="center">

[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-Visit_Website-blue?style=for-the-badge&color=00a8e8)](https://yohann-hommet.netlify.app)
[![GitHub](https://img.shields.io/badge/GitHub-Follow_Me-black?style=for-the-badge&logo=github)](https://github.com/YohannHommet)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/yohann-hommet)

---

<sub>🛠️ **Built with passion** for modern web development • **Made with** ❤️ **by Yohann Hommet**</sub>

</div>