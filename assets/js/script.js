// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Fermer le menu mobile si ouvert
        if (window.innerWidth < 768 && menuToggle && navLinks.classList.contains('active')) {
            toggleMenu();
        }
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Mettre le focus sur l'élément cible pour l'accessibilité
            targetElement.setAttribute('tabindex', '-1');
            targetElement.focus({ preventScroll: true });
            
            // Mettre à jour l'URL sans recharger la page
            history.pushState(null, null, targetId);
        }
    });
});

// Enhanced Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

// Menu mobile toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

function toggleMenu() {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('active');
    
    // Empêcher le défilement du body quand le menu est ouvert
    document.body.classList.toggle('menu-open');
}

// Function to update active section in navbar
function updateActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 300)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        link.setAttribute('aria-current', 'false');

        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
}

// Handle scroll events
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    currentScroll > 50 
      ? navbar.classList.add('scrolled') 
      : navbar.classList.remove('scrolled');
    
    updateActiveSection();
    lastScroll = currentScroll;
});

updateActiveSection();

// Gestion du formulaire de contact
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = form.querySelector('button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Envoi en cours...';
        submitButton.disabled = true;
        
        try {
            // Simulation de l'envoi du formulaire (à remplacer par votre logique d'envoi réelle)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            showNotification('Merci pour votre message ! Je vous répondrai bientôt.', 'success');
            
            // Focus sur le premier champ pour l'accessibilité
            form.querySelector('input').focus();
        } catch (error) {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            showNotification('Une erreur est survenue. Veuillez réessayer.', 'error');
        }
    });
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    const messageText = document.createElement('span');
    messageText.textContent = message;
    
    notification.appendChild(messageText);
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('hiding');
        notification.addEventListener('animationend', () => {
            notification.remove();
        });
    }, 5000);
}

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/assets/js/service-worker.js')
            .then(() => console.log('ServiceWorker registration successful'))
            .catch(err => console.log('ServiceWorker registration failed: ', err));
    });
}

// Gestionnaire de thème
const themeToggle = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light';

// Appliquer le thème sauvegardé
document.documentElement.setAttribute('data-theme', savedTheme);
updateToggleIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateToggleIcon(newTheme);
  
  // Annoncer le changement de thème pour les lecteurs d'écran
  announceThemeChange(newTheme);
});

function updateToggleIcon(theme) {
  const lightIcon = document.getElementById('light-icon');
  const darkIcon = document.getElementById('dark-icon');
  
  if (theme === 'dark') {
    lightIcon.style.display = 'block';
    darkIcon.style.display = 'none';
  } else {
    lightIcon.style.display = 'none';
    darkIcon.style.display = 'block';
  }
  themeToggle.setAttribute('aria-label', `Basculer vers le mode ${theme === 'dark' ? 'clair' : 'sombre'}`);
}

function announceThemeChange(theme) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.classList.add('sr-only');
  announcement.textContent = `Thème changé en mode ${theme === 'dark' ? 'sombre' : 'clair'}`;
  document.body.appendChild(announcement);
  
  // Supprimer l'annonce après qu'elle ait été lue
  setTimeout(() => {
    announcement.remove();
  }, 3000);
}

// Détection du thème système
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

if (prefersDarkScheme.matches && !localStorage.getItem('theme')) {
  document.documentElement.setAttribute('data-theme', 'dark');
  updateToggleIcon('dark');
}

// Écouter les changements de préférence de thème du système
prefersDarkScheme.addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    updateToggleIcon(newTheme);
  }
});

// Configuration de base pour les animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  rootMargin: '-50px 0px -100px 0px',
  threshold: 0.15
});

// Initialisation correcte des animations
document.querySelectorAll('.animate-on-scroll').forEach(element => {
  element.classList.add('reveal');
  observer.observe(element);
});

function debounce(func, wait = 10) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Effet de parallaxe optimisé
const parallaxElements = document.querySelectorAll('.parallax');
if (parallaxElements.length > 0) {
  window.addEventListener('scroll', debounce(() => {
    const scrolled = window.pageYOffset;
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.speed) || 0.3;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }));
}