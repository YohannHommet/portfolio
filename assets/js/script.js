// JavaScript for interactive features can be added here

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
        const sectionHeight = section.clientHeight;
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
    
    // Add/remove scrolled class for style changes
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active section
    updateActiveSection();
    
    lastScroll = currentScroll;
});

// Update active section on page load
updateActiveSection();

// Form submission
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
            .then(() => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}
