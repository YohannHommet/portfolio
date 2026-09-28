(function () {
  "use strict";

  const CONFIG = {
    mobileBreakpoint: 768,
    navbarScrollThreshold: 50,
    activeSectionOffset: 300,
    notificationTimeout: 5000,
    notificationAnimationFallbackTimeout: 500,
    themeAnnouncementTimeout: 3000,
    resizeDebounceWait: 200,
    selectors: {
      smoothScrollAnchors: 'a[href^="#"]',
      navbar: ".navbar",
      menuToggle: "#menu-toggle",
      navLinksContainer: "#nav-links",
      sections: "section, header",
      navLinks: ".nav-link",
      contactForm: "#contact-form",
      formSubmitButton: '#contact-form button[type="submit"]',
      firstFormInput: "#contact-form input, #contact-form textarea",
      themeToggle: "#theme-toggle",
      lightIcon: "#light-icon",
      darkIcon: "#dark-icon",
      body: "body",
      backToTop: "#back-to-top",
    },
    classes: {
      menuOpen: "menu-open",
      navLinksActive: "active",
      navbarScrolled: "scrolled",
      navLinkActive: "active",
      notificationBase: "notification",
      notificationHiding: "hiding",
      srOnly: "sr-only",
      iconVisible: "icon-visible",
      iconHidden: "icon-hidden",
    },
    attributes: {
      ariaExpanded: "aria-expanded",
      ariaCurrent: "aria-current",
      ariaLive: "aria-live",
      role: "role",
      tabindex: "tabindex",
      dataTheme: "data-theme",
    },
    localStorageKeys: {
      theme: "theme",
    },
    serviceWorkerPath: "/assets/js/service-worker.js",
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
    DOMElements.menuToggle = document.getElementById(
      CONFIG.selectors.menuToggle.substring(1),
    );
    DOMElements.navLinksContainer = document.querySelector(
      CONFIG.selectors.navLinksContainer,
    );
    DOMElements.contactForm = document.getElementById(
      CONFIG.selectors.contactForm.substring(1),
    );
    DOMElements.themeToggle = document.getElementById(
      CONFIG.selectors.themeToggle.substring(1),
    );
    DOMElements.lightIcon = document.getElementById(
      CONFIG.selectors.lightIcon.substring(1),
    );
    DOMElements.darkIcon = document.getElementById(
      CONFIG.selectors.darkIcon.substring(1),
    );
    DOMElements.body = document.body;
    DOMElements.backToTop = document.getElementById(
      CONFIG.selectors.backToTop.substring(1),
    );
  }

  // --- STATE VARIABLES ---
  let scrollRAFId = null;

  // --- SMOOTH SCROLL ---
  function initSmoothScroll() {
    document
      .querySelectorAll(CONFIG.selectors.smoothScrollAnchors)
      .forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          const targetId = this.getAttribute("href");
          if (!targetId || targetId === "#") return;

          e.preventDefault();

          if (
            window.innerWidth < CONFIG.mobileBreakpoint &&
            DOMElements.menuToggle &&
            DOMElements.navLinksContainer &&
            DOMElements.navLinksContainer.classList.contains(
              CONFIG.classes.navLinksActive,
            )
          ) {
            toggleMenu();
          }

          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
            targetElement.setAttribute(CONFIG.attributes.tabindex, "-1");
            targetElement.focus({ preventScroll: true });
            history.pushState(null, null, targetId);
          }
        });
      });
  }

  // --- MOBILE MENU ---
  function toggleMenu() {
    if (!DOMElements.menuToggle || !DOMElements.navLinksContainer) return;
    const isExpanded =
      DOMElements.menuToggle.getAttribute(CONFIG.attributes.ariaExpanded) ===
      "true";
    DOMElements.menuToggle.setAttribute(
      CONFIG.attributes.ariaExpanded,
      !isExpanded,
    );
    DOMElements.navLinksContainer.classList.toggle(
      CONFIG.classes.navLinksActive,
    );
    DOMElements.body.classList.toggle(CONFIG.classes.menuOpen);
  }

  function initMobileMenu() {
    if (DOMElements.menuToggle) {
      DOMElements.menuToggle.addEventListener("click", toggleMenu);
    }
  }

  // --- NAVBAR SCROLL EFFECTS & ACTIVE SECTION HIGHLIGHTING ---
  function initSectionObserver() {
    const sections = document.querySelectorAll(CONFIG.selectors.sections);
    const navLinks = document.querySelectorAll(CONFIG.selectors.navLinks);

    const options = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          navLinks.forEach((link) => {
            link.classList.remove(CONFIG.classes.navLinkActive);
            link.setAttribute(CONFIG.attributes.ariaCurrent, "false");

            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add(CONFIG.classes.navLinkActive);
              link.setAttribute(CONFIG.attributes.ariaCurrent, "page");
            }
          });
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));
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
        currentScroll > 400
          ? DOMElements.backToTop.classList.add("visible")
          : DOMElements.backToTop.classList.remove("visible");
      }
    });
  }

  function initScrollEffects() {
    initSectionObserver();
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // --- FLUID SCROLL REVEAL (GPU COMPOSITED) ---
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    if (!revealElements.length) return;

    const options = {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.05,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    }, options);

    revealElements.forEach((el) => observer.observe(el));
  }

  // --- SPOTLIGHT CURSOR GLOW ON CARDS ---
  function initSpotlightCards() {
    const cards = document.querySelectorAll(
      ".spotlight-card, .bento-card, .project-card, .experience-card",
    );
    if (!cards.length) return;

    cards.forEach((card) => {
      card.classList.add("spotlight-card");

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty("--mouseX", `${x}px`);
        card.style.setProperty("--mouseY", `${y}px`);
      });

      card.addEventListener("mouseleave", () => {
        card.style.setProperty("--mouseX", "50%");
        card.style.setProperty("--mouseY", "50%");
      });
    });
  }

  // --- CONTACT FORM ---
  async function handleContactFormSubmit(e) {
    e.preventDefault();
    if (!DOMElements.contactForm) return;

    const submitButton = DOMElements.contactForm.querySelector(
      CONFIG.selectors.formSubmitButton,
    );
    if (!submitButton) return;

    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = "Transmission en cours...";
    submitButton.disabled = true;

    try {
      const formData = new FormData(DOMElements.contactForm);
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (!response.ok) throw new Error("Form submission failed");

      DOMElements.contactForm.reset();
      showNotification(
        "Message transmis avec succès. Je vous répondrai dans les plus brefs délais.",
        "success",
      );
      const firstInput = DOMElements.contactForm.querySelector(
        CONFIG.selectors.firstFormInput,
      );
      if (firstInput) firstInput.focus();
    } catch (error) {
      console.error("Form submission error:", error);
      showNotification(
        "Une erreur est survenue lors de l'envoi. Veuillez me contacter par email direct.",
        "error",
      );
    } finally {
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  }

  function initContactForm() {
    if (DOMElements.contactForm) {
      DOMElements.contactForm.addEventListener(
        "submit",
        handleContactFormSubmit,
      );
    }
  }

  // --- NOTIFICATIONS ---
  function showNotification(message, type) {
    const notification = document.createElement("div");
    notification.classList.add(CONFIG.classes.notificationBase, type);
    notification.setAttribute(CONFIG.attributes.role, "alert");
    notification.setAttribute(CONFIG.attributes.ariaLive, "assertive");

    const messageText = document.createElement("span");
    messageText.textContent = message;
    notification.appendChild(messageText);
    DOMElements.body.appendChild(notification);

    let removed = false;
    const removeNotification = () => {
      if (removed) return;
      notification.remove();
      removed = true;
    };

    setTimeout(() => {
      notification.classList.add(CONFIG.classes.notificationHiding);
      setTimeout(
        removeNotification,
        CONFIG.notificationAnimationFallbackTimeout,
      );
    }, CONFIG.notificationTimeout);

    notification.addEventListener("animationend", removeNotification);
  }

  // --- THEME MANAGEMENT ---
  function updateThemeToggleIcon(theme) {
    if (
      !DOMElements.lightIcon ||
      !DOMElements.darkIcon ||
      !DOMElements.themeToggle
    )
      return;

    if (theme === "dark") {
      DOMElements.lightIcon.style.display = "block";
      DOMElements.darkIcon.style.display = "none";
    } else {
      DOMElements.lightIcon.style.display = "none";
      DOMElements.darkIcon.style.display = "block";
    }
    DOMElements.themeToggle.setAttribute(
      "aria-label",
      `Basculer vers le mode ${theme === "dark" ? "clair" : "sombre"}`,
    );
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute(CONFIG.attributes.dataTheme, theme);
    localStorage.setItem(CONFIG.localStorageKeys.theme, theme);
    updateThemeToggleIcon(theme);
  }

  function initThemeManagement() {
    if (!DOMElements.themeToggle) return;

    const savedTheme = localStorage.getItem(CONFIG.localStorageKeys.theme);
    const prefersDarkScheme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    let currentTheme = "dark"; // Default to dark for systems engineer aesthetic

    if (savedTheme) {
      currentTheme = savedTheme;
    } else if (prefersDarkScheme !== undefined) {
      currentTheme = prefersDarkScheme ? "dark" : "light";
    }

    applyTheme(currentTheme);

    DOMElements.themeToggle.addEventListener("click", () => {
      const currentDataTheme = document.documentElement.getAttribute(
        CONFIG.attributes.dataTheme,
      );
      const newTheme = currentDataTheme === "dark" ? "light" : "dark";

      if (document.startViewTransition) {
        document.startViewTransition(() => {
          applyTheme(newTheme);
        });
      } else {
        applyTheme(newTheme);
      }
    });
  }

  // --- SERVICE WORKER REGISTRATION ---
  function initServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register(CONFIG.serviceWorkerPath)
          .catch((err) =>
            console.debug("ServiceWorker registration optional", err),
          );
      });
    }
  }

  // --- SYSTEM WORKBENCH TABS & INTERACTION ---
  let resizeTopologyCanvas = null;

  function initSystemWorkbench() {
    const workbench = document.querySelector(".system-workbench");
    if (!workbench) return;

    const tabs = workbench.querySelectorAll(".workbench-tab");
    const panels = workbench.querySelectorAll(".workbench-panel");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetId = tab.getAttribute("aria-controls");

        tabs.forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        panels.forEach((p) => p.classList.remove("active"));

        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add("active");
          if (
            targetId === "panel-topology" &&
            typeof resizeTopologyCanvas === "function"
          ) {
            setTimeout(resizeTopologyCanvas, 50);
          }
        }
      });
    });
  }

  // --- ARCHITECTURE TOPOLOGY CANVAS (DUAL-TONE AMBER & SAGE MINT) ---
  function initTopologyCanvas() {
    const canvas = document.getElementById("neural-expressive-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width, height, dpr;
    let animationFrameId = null;

    const mouse = { x: null, y: null, active: false };

    let colors = {
      accent: "#fbbf24",
      secondary: "#2dd4bf",
      text: "#f1f5f9",
      border: "rgba(255,255,255,0.08)",
    };

    function updateColors() {
      const style = getComputedStyle(document.documentElement);
      colors.accent =
        style.getPropertyValue("--accent-color").trim() || "#fbbf24";
      colors.secondary =
        style.getPropertyValue("--accent-secondary").trim() || "#2dd4bf";
      colors.text = style.getPropertyValue("--text-color").trim() || "#f1f5f9";
      colors.border =
        style.getPropertyValue("--border-color").trim() ||
        "rgba(255,255,255,0.08)";
    }

    // Balanced dual-tone nodes: Amber for engines/storage, Sage Mint for networking/telemetry
    const nodes = [
      {
        label: "Go Ingest",
        anchorX: 0,
        anchorY: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 10,
        angle: 0,
        speed: 0.008,
        driftRadius: 2.5,
        colorKey: "accent",
        pulseScale: 1.0,
      },
      {
        label: "RingBuffer",
        anchorX: 0,
        anchorY: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 12,
        angle: Math.PI / 4,
        speed: -0.007,
        driftRadius: 2,
        colorKey: "secondary",
        pulseScale: 1.0,
      },
      {
        label: "Disk WAL",
        anchorX: 0,
        anchorY: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 11,
        angle: Math.PI / 2,
        speed: 0.005,
        driftRadius: 2.5,
        colorKey: "accent",
        pulseScale: 1.0,
      },
      {
        label: "OTel Hub",
        anchorX: 0,
        anchorY: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 10,
        angle: Math.PI,
        speed: -0.006,
        driftRadius: 2,
        colorKey: "secondary",
        pulseScale: 1.0,
      },
      {
        label: "QUIC Peer",
        anchorX: 0,
        anchorY: 0,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 10,
        angle: Math.PI * 1.5,
        speed: 0.005,
        driftRadius: 2.5,
        colorKey: "secondary",
        pulseScale: 1.0,
      },
    ];

    const connections = [
      { from: 0, to: 1 },
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 3, to: 4 },
    ];

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = window.devicePixelRatio || 1;
      width = rect.width || 320;
      height = rect.height || 220;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      if (nodes.length >= 5) {
        nodes[0].anchorX = width * 0.16;
        nodes[0].anchorY = height * 0.5;

        nodes[1].anchorX = width * 0.42;
        nodes[1].anchorY = height * 0.32;

        nodes[2].anchorX = width * 0.42;
        nodes[2].anchorY = height * 0.72;

        nodes[3].anchorX = width * 0.72;
        nodes[3].anchorY = height * 0.32;

        nodes[4].anchorX = width * 0.85;
        nodes[4].anchorY = height * 0.72;

        nodes.forEach((node) => {
          if (node.x === 0 && node.y === 0) {
            node.x = node.anchorX;
            node.y = node.anchorY;
          }
        });
      }
    }

    resizeTopologyCanvas = resize;
    updateColors();
    resize();

    window.addEventListener("resize", debounce(resize, 150));

    const themeObserver = new MutationObserver(() => {
      updateColors();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Mouse hover interaction
    canvas.parentElement.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });

    canvas.parentElement.addEventListener("mouseleave", () => {
      mouse.active = false;
      mouse.x = null;
      mouse.y = null;
    });

    canvas.parentElement.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      nodes.forEach((node) => {
        const dist = Math.hypot(clickX - node.x, clickY - node.y);
        if (dist < node.radius + 15) {
          node.pulseScale = 2.4;
        }
      });
    });

    // Packets traveling along connections with dual colors
    const packets = [];
    connections.forEach((conn) => {
      packets.push({
        fromIndex: conn.from,
        toIndex: conn.to,
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.005,
        colorKey: nodes[conn.to].colorKey,
      });
      packets.push({
        fromIndex: conn.to,
        toIndex: conn.from,
        progress: Math.random(),
        speed: 0.004 + Math.random() * 0.004,
        colorKey: nodes[conn.from].colorKey,
      });
    });

    function parseToRgba(colorStr, alpha) {
      colorStr = (colorStr || "").trim();
      if (colorStr.startsWith("rgb")) {
        const matches = colorStr.match(/\d+(\.\d+)?/g);
        if (matches && matches.length >= 3) {
          return `rgba(${matches[0]}, ${matches[1]}, ${matches[2]}, ${alpha})`;
        }
      }
      let hex = colorStr.replace("#", "");
      if (hex.length === 3) {
        const r = parseInt(hex.charAt(0) + hex.charAt(0), 16);
        const g = parseInt(hex.charAt(1) + hex.charAt(1), 16);
        const b = parseInt(hex.charAt(2) + hex.charAt(2), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      } else if (hex.length === 6) {
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
      }
      return `rgba(251, 191, 36, ${alpha})`;
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Update nodes
      nodes.forEach((node) => {
        const driftX = Math.cos(node.angle) * node.driftRadius;
        const driftY = Math.sin(node.angle * 1.3) * node.driftRadius;
        const targetX = node.anchorX + driftX;
        const targetY = node.anchorY + driftY;

        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 80) {
            const force = ((80 - dist) / 80) * 0.25;
            node.vx += (dx / dist) * force;
            node.vy += (dy / dist) * force;
          }
        }

        const spring = 0.06;
        node.vx += (targetX - node.x) * spring;
        node.vy += (targetY - node.y) * spring;
        node.vx *= 0.84;
        node.vy *= 0.84;

        node.x += node.vx;
        node.y += node.vy;
        node.angle += 0.015;
      });

      // Draw connections with linear gradient between node colors
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];

        const grad = ctx.createLinearGradient(
          fromNode.x,
          fromNode.y,
          toNode.x,
          toNode.y,
        );
        const fromColor = colors[fromNode.colorKey];
        const toColor = colors[toNode.colorKey];

        let opacity = 0.25;
        if (mouse.active) {
          const distToLine = Math.hypot(
            mouse.x - (fromNode.x + toNode.x) / 2,
            mouse.y - (fromNode.y + toNode.y) / 2,
          );
          if (distToLine < 50) opacity = 0.6;
        }

        grad.addColorStop(0, parseToRgba(fromColor, opacity));
        grad.addColorStop(1, parseToRgba(toColor, opacity));

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.3;
        ctx.stroke();
      });

      // Draw packets
      packets.forEach((packet) => {
        const from = nodes[packet.fromIndex];
        const to = nodes[packet.toIndex];

        const x = from.x + (to.x - from.x) * packet.progress;
        const y = from.y + (to.y - from.y) * packet.progress;

        const pColor = colors[packet.colorKey];

        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pColor;
        ctx.shadowColor = pColor;
        ctx.shadowBlur = 6;
        ctx.fill();

        packet.progress += packet.speed;
        if (packet.progress >= 1) {
          packet.progress = 0;
          packet.speed = 0.004 + Math.random() * 0.005;
        }
      });

      ctx.shadowBlur = 0;

      // Draw nodes
      nodes.forEach((node) => {
        const nodeColor = colors[node.colorKey];

        if (node.pulseScale > 1.0) {
          ctx.beginPath();
          ctx.arc(
            node.x,
            node.y,
            node.radius * node.pulseScale,
            0,
            Math.PI * 2,
          );
          ctx.strokeStyle = parseToRgba(nodeColor, (node.pulseScale - 1) / 1.5);
          ctx.lineWidth = 1.5;
          ctx.stroke();
          node.pulseScale -= 0.05;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = parseToRgba(nodeColor, 0.18);
        ctx.strokeStyle = nodeColor;
        ctx.lineWidth = 1.6;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = colors.text;
        ctx.font = '600 9px "Fira Code", monospace';
        ctx.textAlign = "center";
        const labelY =
          node.anchorY > height * 0.5
            ? node.y + node.radius + 12
            : node.y - node.radius - 6;
        ctx.fillText(node.label, node.x, labelY);
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);
  }

  // --- FOOTER YEAR ---
  function initFooterYear() {
    const yearEl = document.getElementById("current-year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // --- INITIALIZATION ---
  document.addEventListener("DOMContentLoaded", () => {
    cacheDOMElements();
    initSmoothScroll();
    initMobileMenu();
    initScrollEffects();
    initScrollReveal();
    initSpotlightCards();
    initContactForm();
    initThemeManagement();
    initSystemWorkbench();
    initTopologyCanvas();
    initServiceWorker();
    initFooterYear();
  });
})();
