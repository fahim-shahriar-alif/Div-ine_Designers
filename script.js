// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-out');
        observer.observe(section);
    });

    // Member card hover effect with tilt
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Dynamic typing effect for slogan
    const slogan = document.querySelector('.slogan');
    const sloganText = slogan.textContent;
    slogan.textContent = '';
    slogan.style.opacity = '1';
    
    let i = 0;
    function typeWriter() {
        if (i < sloganText.length) {
            slogan.textContent += sloganText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);

    // Counter animation for stats
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }

    // Project section click to expand details
    const projectContent = document.querySelector('.project-content');
    if (projectContent) {
        projectContent.style.cursor = 'pointer';
        
        projectContent.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    }

    // Add floating animation to feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
    });

    // Interactive logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            this.style.animation = 'spin 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    }

    // Add particle effect on header
    createParticles();

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('.theme-icon');
            icon.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        });
    }

    // Member card click effect
    memberCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                createRipple(e, this);
            }
        });
    });

    // Add scroll progress indicator
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    // Sticky header with scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Create ripple effect
function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Create floating particles
function createParticles() {
    const header = document.querySelector('header');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        header.appendChild(particle);
    }
}

// Update scroll progress
function updateScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }
}

// Add smooth reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.fade-out');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('fade-in');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
