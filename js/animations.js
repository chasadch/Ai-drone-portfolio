// Enhanced animations for the drone portfolio website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initScrollAnimations();
    }
    
    // Enhanced loader animation
    enhanceLoaderAnimation();
    
    // Parallax effects
    initParallaxEffects();
    
    // Text animations
    initTextAnimations();
});

// Enhanced loader animation
function enhanceLoaderAnimation() {
    const loader = document.querySelector('.loader-container');
    const loaderDrone = document.querySelector('.drone-loader');
    const loadingText = document.querySelector('.loading-text');
    const loadingBar = document.querySelector('.loading-bar');
    
    if (!loader) return;
    
    // Create particle effects in the loader
    createLoaderParticles();
    
    // Animate the loading bar more dynamically
    let width = 0;
    const interval = setInterval(() => {
        width += Math.floor(Math.random() * 10) + 1;
        if (width > 100) width = 100;
        
        // Dynamic text updates
        if (width < 30) {
            loadingText.textContent = "INITIALIZING DRONE SYSTEMS";
        } else if (width < 60) {
            loadingText.textContent = "CALIBRATING SENSORS";
        } else if (width < 90) {
            loadingText.textContent = "PREPARING FLIGHT CONTROLS";
        } else {
            loadingText.textContent = "READY FOR TAKEOFF";
        }
        
        loadingBar.style.width = width + '%';
        
        // Dynamic drone animation based on progress
        const progress = width / 100;
        loaderDrone.style.transform = `translateY(${Math.sin(progress * Math.PI) * -20}px)`;
        
        if (width === 100) {
            clearInterval(interval);
            
            // Enhance exit animation
            gsap.to(loader, {
                opacity: 0,
                duration: 0.8,
                delay: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    loader.style.display = 'none';
                    // Start page animations after loader is complete
                    animateHeroSection();
                }
            });
        }
    }, 120);
}

// Create particles in the loader
function createLoaderParticles() {
    const loader = document.querySelector('.loader-container');
    if (!loader) return;
    
    // Add particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'loader-particles';
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.overflow = 'hidden';
    particleContainer.style.zIndex = '0';
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'loader-particle';
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = 'rgba(0, 229, 255, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        // Set random animation properties
        const duration = Math.random() * 4 + 2;
        const delay = Math.random() * 2;
        
        gsap.to(particle, {
            y: Math.random() * 200 - 100,
            x: Math.random() * 200 - 100,
            opacity: 0,
            duration: duration,
            delay: delay,
            repeat: -1,
            ease: "power1.inOut"
        });
        
        particleContainer.appendChild(particle);
    }
    
    loader.insertBefore(particleContainer, loader.firstChild);
}

// Animate hero section elements
function animateHeroSection() {
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = document.querySelector('.hero-content h1');
    const heroParagraph = document.querySelector('.hero-content p');
    const heroButtons = document.querySelector('.hero-buttons');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!heroContent) return;
    
    // Create a timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Add animations to the timeline
    tl.from(heroContent, { 
        opacity: 0, 
        y: 50, 
        duration: 1.2
    })
    .from(heroTitle, { 
        opacity: 0, 
        y: 50, 
        duration: 0.8 
    }, "-=0.8")
    .from(heroParagraph, { 
        opacity: 0, 
        y: 30, 
        duration: 0.8 
    }, "-=0.5")
    .from(heroButtons, { 
        opacity: 0, 
        y: 30, 
        duration: 0.8 
    }, "-=0.5")
    .from(scrollIndicator, { 
        opacity: 0, 
        y: 20, 
        duration: 0.8 
    }, "-=0.3");
}

// Initialize scroll-triggered animations
function initScrollAnimations() {
    // Animate section headers on scroll
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            scrollTrigger: {
                trigger: header,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Animate service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 60%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Animate portfolio items
    gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            y: 30,
            scale: 0.9,
            duration: 0.7,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                end: "top 60%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Animate drone specs selectors
    gsap.utils.toArray('.drone-select-item').forEach((item, i) => {
        gsap.from(item, {
            opacity: 0,
            x: -30,
            duration: 0.6,
            delay: i * 0.15,
            scrollTrigger: {
                trigger: '.drone-selector',
                start: "top 80%",
                end: "top 60%",
                toggleActions: "play none none none"
            }
        });
    });
    
    // Animate the 3D drone view
    gsap.from('.drone-3d-view', {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        scrollTrigger: {
            trigger: '.drone-3d-view',
            start: "top 80%",
            end: "top 50%",
            toggleActions: "play none none none"
        }
    });
    
    // Animate testimonial section
    gsap.from('.testimonial-slide.active', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.testimonials-section',
            start: "top 70%",
            end: "top 40%",
            toggleActions: "play none none none"
        }
    });
    
    // Animate contact form elements
    gsap.from('.contact-info', {
        opacity: 0,
        x: -30,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.contact-container',
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none none"
        }
    });
    
    gsap.from('.contact-form', {
        opacity: 0,
        x: 30,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.contact-container',
            start: "top 80%",
            end: "top 60%",
            toggleActions: "play none none none"
        }
    });
}

// Initialize parallax effects
function initParallaxEffects() {
    // Parallax effect for the hero section
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            gsap.to('.hero-overlay', {
                backgroundPosition: `${x * 10}% ${y * 10}%`,
                duration: 1,
                ease: "power1.out"
            });
        });
    }
    
    // Subtle parallax effect for other sections
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Parallax for portfolio section
        const portfolioSection = document.querySelector('.portfolio-section');
        if (portfolioSection) {
            const portfolioOffset = portfolioSection.offsetTop;
            const portfolioHeight = portfolioSection.offsetHeight;
            
            if (scrollY > portfolioOffset - window.innerHeight && scrollY < portfolioOffset + portfolioHeight) {
                const parallaxValue = (scrollY - (portfolioOffset - window.innerHeight)) * 0.1;
                
                gsap.to('.portfolio-section::before', {
                    y: -parallaxValue,
                    duration: 0.5,
                    ease: "none"
                });
                
                gsap.to('.portfolio-section::after', {
                    y: parallaxValue,
                    duration: 0.5,
                    ease: "none"
                });
            }
        }
    });
}

// Text animations for specific elements
function initTextAnimations() {
    // Text reveal animation for the hero heading
    const heroHeading = document.querySelector('.glitch-text');
    
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.innerHTML = '';
        
        // Create wrapper for the text
        const wrapper = document.createElement('span');
        wrapper.className = 'text-wrapper';
        
        // Create letters
        for (let i = 0; i < text.length; i++) {
            const letter = document.createElement('span');
            letter.className = 'letter';
            letter.textContent = text[i];
            letter.style.display = 'inline-block';
            letter.style.opacity = '0';
            letter.style.transform = 'translateY(20px)';
            letter.style.transition = 'all 0.3s ease';
            
            wrapper.appendChild(letter);
        }
        
        heroHeading.appendChild(wrapper);
        
        // Animate letters after a short delay
        setTimeout(() => {
            const letters = document.querySelectorAll('.letter');
            
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.opacity = '1';
                    letter.style.transform = 'translateY(0)';
                }, index * 30);
            });
        }, 500);
    }
}
