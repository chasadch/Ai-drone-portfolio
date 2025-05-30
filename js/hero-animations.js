/**
 * Advanced Hero Section Animations
 * For AI Autonomous Drone Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle system
    initializeParticles();
    
    // Create floating tech elements
    animateFloatingElements();
    
    // Add interactive hover effects
    addInteractiveEffects();
    
    // Add scroll animations
    initScrollAnimations();
});

/**
 * Create dynamic particle system in hero section
 */
function initializeParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    heroSection.appendChild(particleContainer);
    
    // Create particles
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particleContainer.appendChild(particle);
    }
}

/**
 * Add physics-based floating animations to tech elements
 */
function animateFloatingElements() {
    const techElements = document.querySelectorAll('.tech-element');
    if (!techElements.length) return;
    
    techElements.forEach(element => {
        // Random movement patterns
        const speedX = Math.random() * 10 + 5;
        const speedY = Math.random() * 10 + 5;
        const rotationSpeed = Math.random() * 5 - 2.5;
        
        // Set unique animation parameters for each element
        element.style.setProperty('--float-x', `${speedX}s`);
        element.style.setProperty('--float-y', `${speedY}s`);
        element.style.setProperty('--rotation', `${rotationSpeed}deg`);
        
        // Add subtle pulse effect
        element.style.animation = `
            floatX var(--float-x) infinite ease-in-out alternate,
            floatY var(--float-y) infinite ease-in-out alternate-reverse,
            pulse ${Math.random() * 2 + 2}s infinite ease-in-out alternate
        `;
    });
    
    // Create holographic effect for drone silhouette
    const droneSilhouette = document.querySelector('.drone-silhouette');
    if (droneSilhouette) {
        // Add glowing effects that change over time
        setInterval(() => {
            const hueRotate = Math.random() * 30 - 15;
            droneSilhouette.style.filter = `
                drop-shadow(0 0 5px rgba(0, 229, 255, 0.7))
                drop-shadow(0 0 10px rgba(0, 229, 255, 0.5))
                hue-rotate(${hueRotate}deg)
            `;
        }, 2000);
    }
}

/**
 * Add interactive hover effects to elements
 */
function addInteractiveEffects() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.primary-button, .secondary-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseover', () => {
            // Create glow effect
            button.style.transition = 'all 0.3s ease';
            button.style.transform = 'translateY(-3px)';
            button.style.boxShadow = button.classList.contains('primary-button') 
                ? '0 10px 25px rgba(0, 229, 255, 0.7)' 
                : '0 10px 25px rgba(255, 255, 255, 0.15)';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '';
        });
    });
    
    // Make metrics interactive
    const metrics = document.querySelectorAll('.metric');
    
    metrics.forEach(metric => {
        metric.addEventListener('mouseover', () => {
            metric.style.transform = 'scale(1.05)';
            metric.style.transition = 'all 0.3s ease';
            
            const value = metric.querySelector('.metric-value');
            if (value) {
                value.style.textShadow = '0 0 15px rgba(0, 229, 255, 0.9)';
            }
        });
        
        metric.addEventListener('mouseout', () => {
            metric.style.transform = 'scale(1)';
            
            const value = metric.querySelector('.metric-value');
            if (value) {
                value.style.textShadow = '';
            }
        });
    });
}

/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
    // Animate elements when they come into view
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            // Create parallax effect
            const heroHeight = heroSection.offsetHeight;
            const scrollRatio = scrollPosition / heroHeight;
            
            // Move elements at different speeds
            const titleMain = document.querySelector('.hero-title-main');
            const titleHighlight = document.querySelector('.hero-title-highlight');
            
            if (titleMain && titleHighlight) {
                titleMain.style.transform = `translateY(${scrollRatio * 50}px)`;
                titleHighlight.style.transform = `translateY(${scrollRatio * 70}px)`;
            }
            
            // Fade out elements as user scrolls
            const heroContent = document.querySelector('.hero-content-container');
            if (heroContent && scrollRatio <= 1) {
                heroContent.style.opacity = 1 - scrollRatio;
            }
        }
    });
    
    // Show scroll indicator only when at top
    window.addEventListener('scroll', () => {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }
    });
}

// Add dynamic target points in the scanner animation
function createTargetPoints() {
    const scanArea = document.querySelector('.scan-target-points');
    if (!scanArea) return;
    
    // Create multiple target points
    for (let i = 0; i < 5; i++) {
        const target = document.createElement('div');
        target.className = 'target-point';
        
        // Random positioning
        target.style.top = `${Math.random() * 80 + 10}%`;
        target.style.left = `${Math.random() * 80 + 10}%`;
        target.style.animationDelay = `${Math.random() * 5}s`;
        
        scanArea.appendChild(target);
    }
}

// Initialize target points
document.addEventListener('DOMContentLoaded', createTargetPoints);
