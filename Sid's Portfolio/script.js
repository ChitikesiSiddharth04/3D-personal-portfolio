// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
let vantaEffect = null;

// Initialize Vanta.js effect with responsive settings
function initVanta() {
    if (vantaEffect) vantaEffect.destroy();
    
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    vantaEffect = VANTA.NET({
        el: "#vanta-background",
        mouseControls: !isMobile,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: isMobile ? 0.8 : 1.00,
        scaleMobile: 0.8,
        color: 0x9f7aea,
        backgroundColor: document.body.classList.contains('light-theme') ? 0xffffff : 0x000000,
        maxDistance: isMobile ? 15.00 : 20.00,
        spacing: isMobile ? 10.00 : 15.00,
        points: isMobile ? 15.00 : 25.00,
        showLines: true,
        lineWidth: isMobile ? 1.50 : 2.00,
        speed: isMobile ? 1.50 : 2.50,
        size: isMobile ? 1.00 : 1.50,
        showPoints: true,
        pointSize: isMobile ? 1.50 : 2.00,
        pointColor: 0x9f7aea,
        lineColor: 0x9f7aea,
        alpha: isMobile ? 0.6 : 0.8,
        beta: 0.5,
        gamma: 0.5
    });
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initVanta();
    }, 250);
});

// Initialize the effect
window.addEventListener('load', () => {
    initVanta();
});

// Add mouse movement effect
document.addEventListener('mousemove', (e) => {
    if (vantaEffect) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        vantaEffect.setMouse(x, y);
    }
});

// Theme toggle functionality
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
    initVanta(); // Reinitialize Vanta effect with new background color
});

// Side Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');

menuToggle.addEventListener('click', () => {
    sideMenu.classList.toggle('open');
    menuToggle.classList.toggle('open');
});

// Close side menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !sideMenu.contains(e.target)) {
        sideMenu.classList.remove('open');
        menuToggle.classList.remove('open');
    }
});

// Close side menu when a link is clicked (if any)
sideMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        sideMenu.classList.remove('open');
        menuToggle.classList.remove('open');
    });
});

// Add touch feedback for mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.project-card, .education-item, .skill-item, .experience-item').forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', () => {
            element.style.transform = 'scale(1)';
        });
    });
}

// Optimize scroll performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            // Update any scroll-based animations here
        }, 100);
    }
}, { passive: true });

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close side menu after clicking a link
            sideMenu.classList.remove('open');
            menuToggle.classList.remove('open');
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe all animated elements
const animatedElements = document.querySelectorAll(
    '.project-card, .education-item, .skill-item, .timeline-card, .footer-section'
);
animatedElements.forEach(element => {
    observer.observe(element);
});

// Initialize skill progress bars
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = `scaleX(${entry.target.parentElement.dataset.progress || 1})`;
        }
    });
}, observerOptions);

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Add hover effects for all interactive elements
const interactiveElements = document.querySelectorAll(
    '.project-tech span, .education-tags span, .volunteering-tags span, .education-details span'
);

interactiveElements.forEach(element => {
    element.addEventListener('mouseover', () => {
        element.style.transform = 'translateY(-2px)';
    });
    element.addEventListener('mouseout', () => {
        element.style.transform = 'translateY(0)';
    });
});

// Add hover effect for buttons
const buttons = document.querySelectorAll('button, .download-resume, .get-in-touch');
buttons.forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;
        
        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        e.target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1000);
    });
});

// Show/Hide floating home button and back to top button
const floatingHome = document.querySelector('.floating-home');
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if(floatingHome) floatingHome.classList.add('visible');
        if(backToTopButton) backToTopButton.classList.add('visible');
    } else {
        if(floatingHome) floatingHome.classList.remove('visible');
        if(backToTopButton) backToTopButton.classList.remove('visible');
    }
});

// Smooth scroll for floating home button
if (floatingHome) {
    floatingHome.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add animation for education items
const educationItems = document.querySelectorAll('.education-item');
educationItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Add animation for skill items
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.05}s`;
});

// Add hover effect for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add hover effect for education items
const educationCards = document.querySelectorAll('.education-item');
educationCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Contact Modal
const modal = document.getElementById('contactModal');
const openModalBtn = document.getElementById('getInTouchBtn');
const closeModalBtn = document.getElementById('closeModal');

if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('show');
    });
}

if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });
}

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.classList.remove('show');
    }
});

// Handle form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // This is a demo form. In a real application, you'd send the data to a server.
        alert('Thank you for your message! This is a demo form.');
        modal.classList.remove('show');
        this.reset();
    });
}

// Back to Top Button
// const backToTopButton = document.getElementById('backToTop'); // Already defined

// Scroll to top when button is clicked
if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
