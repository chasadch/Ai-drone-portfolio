// Enhanced Animation Scripts for Drone Portfolio Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initLoader();
    initNavbar();
    initScrollAnimations();
    initPortfolioFilters();
    initDroneSelector();
    initParallaxEffects();
});

// Page Loader Animation
function initLoader() {
    const loader = document.querySelector('.loader-container');
    const progressBar = document.querySelector('.loader-progress-bar');
    const progressText = document.querySelector('.loader-progress-text');
    
    if (!loader) return;
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 5) + 1;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${progress}%`;
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                    animateHeroElements();
                }, 500);
            }, 500);
        }
    }, 100);
}

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (!navbar) return;
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn && navbarLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navbarLinks.classList.toggle('active');
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navbarLinks.classList.remove('active');
            }
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Adjust for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === current) {
                link.classList.add('active');
            }
        });
    });
}

// Hero Section Animations
function animateHeroElements() {
    const heroTitle = document.querySelector('.hero-title-line');
    const heroAccent = document.querySelector('.hero-title-accent');
    const heroDescription = document.querySelector('.hero-description');
    const heroCta = document.querySelector('.hero-cta');
    const heroStats = document.querySelector('.hero-stats');
    const heroDrone = document.querySelector('.hero-drone-showcase');
    
    if (!heroTitle) return;
    
    // Create a staggered animation sequence
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
        
        setTimeout(() => {
            if (heroAccent) {
                heroAccent.style.opacity = '1';
                heroAccent.style.transform = 'translateY(0)';
            }
            
            setTimeout(() => {
                if (heroDescription) {
                    heroDescription.style.opacity = '1';
                    heroDescription.style.transform = 'translateY(0)';
                }
                
                setTimeout(() => {
                    if (heroCta) {
                        heroCta.style.opacity = '1';
                        heroCta.style.transform = 'translateY(0)';
                    }
                    
                    setTimeout(() => {
                        if (heroStats) {
                            heroStats.style.opacity = '1';
                            heroStats.style.transform = 'translateY(0)';
                        }
                        
                        setTimeout(() => {
                            if (heroDrone) {
                                heroDrone.style.opacity = '1';
                                heroDrone.style.transform = 'translateX(0)';
                            }
                        }, 200);
                    }, 200);
                }, 200);
            }, 200);
        }, 200);
    }, 300);
}

// Scroll Animations
function initScrollAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .drone-select-item, .tech-feature, .video-item, .testimonial-card');
    
    if (animatedElements.length === 0) return;
    
    // Add initial styles
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    }
    
    // Animate elements when they enter the viewport
    function animateOnScroll() {
        animatedElements.forEach(el => {
            if (isInViewport(el)) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Run on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('resize', animateOnScroll);
    animateOnScroll(); // Run once on load
}

// Portfolio Filters
function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (filterBtns.length === 0 || portfolioItems.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Drone Selector
function initDroneSelector() {
    const droneSelectItems = document.querySelectorAll('.drone-select-item');
    const droneSpecsTabs = document.querySelectorAll('.drone-specs-tab');
    
    if (droneSelectItems.length === 0) return;
    
    droneSelectItems.forEach(item => {
        item.addEventListener('click', () => {
            // Update active drone
            droneSelectItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            const droneId = item.getAttribute('data-drone');
            
            // Update specs tab
            if (droneSpecsTabs.length > 0) {
                droneSpecsTabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.id === `${droneId}-specs`) {
                        tab.classList.add('active');
                    }
                });
            }
            
            // Get the drone video/model element
            const droneView = document.getElementById('drone-3d-view');
            if (droneView) {
                // Add subtle animation to transition
                droneView.style.opacity = '0';
                setTimeout(() => {
                    droneView.style.opacity = '1';
                }, 300);
            }
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.tech-highlight-section, .hero-background');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const scrollPosition = window.pageYOffset;
            const elOffset = el.offsetTop;
            const distance = scrollPosition - elOffset;
            const parallaxValue = distance * 0.4;
            
            if (scrollPosition > elOffset - window.innerHeight && scrollPosition < elOffset + el.offsetHeight) {
                el.style.backgroundPosition = `center ${parallaxValue}px`;
            }
        });
    });
    
    // Mouse movement parallax for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const heroContent = document.querySelector('.hero-content');
            const heroDrone = document.querySelector('.hero-drone-showcase');
            
            if (heroContent && heroDrone) {
                const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
                const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
                
                heroContent.style.transform = `translate(${moveX * -1}px, ${moveY * -1}px)`;
                heroDrone.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    }
}

// Add smooth hover effects for buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .nav-cta-btn').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.background = `radial-gradient(circle at ${x}px ${y}px, var(--primary-color) 0%, var(--secondary-color) 100%)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.background = '';
    });
});

// Initialize any custom video players
document.querySelectorAll('.portfolio-video, .drone-showcase-video').forEach(video => {
    // Add custom play/pause functionality
    video.addEventListener('click', function() {
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
    });
    
    // Add loading indicator
    video.addEventListener('waiting', function() {
        this.parentElement.classList.add('loading');
    });
    
    video.addEventListener('playing', function() {
        this.parentElement.classList.remove('loading');
    });
});
