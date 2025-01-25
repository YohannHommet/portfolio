// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

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

        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
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

const form = document.getElementById('contact-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitButton = form.querySelector('button');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    form.reset();
    
    submitButton.textContent = originalText;
    submitButton.disabled = false;
    showNotification('Thank you for your message! I will get back to you soon.', 'success');
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    
    const icon = document.createElement('i');
    icon.classList.add('fas', type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle');
    
    const messageText = document.createElement('span');
    messageText.textContent = message;
    
    notification.appendChild(icon);
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
});

function updateToggleIcon(theme) {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  themeToggle.setAttribute('aria-label', `${theme === 'dark' ? 'Light' : 'Dark'} mode`);
}

// Détection du thème système
if (window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('theme')) {
  document.documentElement.setAttribute('data-theme', 'dark');
  updateToggleIcon('dark');
}

// Configuration de base
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

// Initialisation correcte
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

window.addEventListener('scroll', debounce(() => {
  const scrolled = window.pageYOffset;
  document.querySelectorAll('.parallax').forEach(element => {
    const speed = parseFloat(element.dataset.speed) || 0.3;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
}));