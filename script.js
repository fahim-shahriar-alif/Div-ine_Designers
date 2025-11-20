document.addEventListener('DOMContentLoaded', function() {
    
    document.body.classList.add('dark-theme');
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
        themeIcon.textContent = '☀️';
    }
    
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

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-out');
        observer.observe(section);
    });

    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') return;
            
            const avatar = this.querySelector('.member-avatar img');
            const nameLink = this.querySelector('h3 a');
            const name = nameLink.textContent.trim();
            const profileUrl = nameLink.getAttribute('href');
            const id = this.querySelector('.role').textContent;
            const description = this.querySelector('.description').innerHTML;
            
            showMemberModal(avatar ? avatar.src : null, name, id, description, profileUrl);
        });
    });

    function showMemberModal(avatarSrc, name, id, description, profileUrl) {
        const existingModal = document.querySelector('.member-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'member-modal';
        modal.innerHTML = `
            <div class="member-modal-content">
                <button class="member-modal-close">&times;</button>
                <div class="member-modal-avatar">
                    ${avatarSrc ? `<img src="${avatarSrc}" alt="${name}">` : `<div style="background: linear-gradient(135deg, #3b82f6, #60a5fa); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; font-weight: bold;">${name.split(' ').map(n => n[0]).join('')}</div>`}
                </div>
                <h2 class="member-modal-name">${name}</h2>
                <p class="member-modal-id">${id}</p>
                <p class="member-modal-description">${description}</p>
                <a href="${profileUrl}" target="_blank" rel="noopener noreferrer" class="member-modal-link">
                    View Profile →
                </a>
            </div>
        `;

        document.body.appendChild(modal);

        setTimeout(() => {
            modal.classList.add('active');
        }, 10);

        const closeBtn = modal.querySelector('.member-modal-close');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });

        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
                document.removeEventListener('keydown', escHandler);
            }
        });
    }

    const slogan = document.querySelector('.slogan');
    const slogans = [
        '"Innovation Through Collaboration"',
        '"See Further. Build Smarter."'
    ];
    let currentSloganIndex = 0;
    
    slogan.textContent = slogans[0];
    slogan.style.opacity = '1';
    
    function toggleSlogan() {
        slogan.style.transition = 'opacity 0.8s ease';
        slogan.style.opacity = '0';
        
        setTimeout(() => {
            currentSloganIndex = (currentSloganIndex + 1) % slogans.length;
            slogan.textContent = slogans[currentSloganIndex];
            slogan.style.opacity = '1';
        }, 800);
    }
    
    setInterval(toggleSlogan, 4000);

    const projectContent = document.querySelector('.project-content');
    if (projectContent) {
        projectContent.style.cursor = 'pointer';
        
        projectContent.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    }

    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
    });

    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
            this.style.animation = 'spin 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    }

    createParticles();

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const icon = this.querySelector('.theme-icon');
            icon.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        });
    }

    memberCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a')) {
                createRipple(e, this);
            }
        });
    });

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();

    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

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

function updateScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }
}

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
