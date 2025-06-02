/**
 * Auto-scroll functionality for drone portfolio website
 * Provides smooth, slow scrolling with user interaction controls
 */
document.addEventListener('DOMContentLoaded', function() {
    // Configuration
    const scrollSpeed = 1; // Pixels per frame (lower = slower)
    const scrollInterval = 20; // Time between scroll steps in ms
    
    let isScrolling = true;
    let scrollIntervalId = null;
    let lastScrollPosition = 0;
    let pauseTimeout = null;
    
    // Elements that will pause scrolling when hovered
    const interactiveElements = [
        '.chatbot-container',
        '.chatbot-toggle',
        'a',
        'button',
        'input',
        '.portfolio-video',
        '.tech-card',
        '.feature-card',
        '.team-hex',
        '.about-feature'
    ];
    
    // Start auto-scrolling
    function startAutoScroll() {
        if (scrollIntervalId) return;
        
        scrollIntervalId = setInterval(() => {
            if (isScrolling) {
                window.scrollBy(0, scrollSpeed);
                
                // If we've reached the bottom or user has scrolled manually, pause
                if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
                    pauseScrolling();
                    
                    // After reaching the bottom, wait 5 seconds and scroll back to top
                    setTimeout(() => {
                        smoothScrollToTop();
                    }, 5000);
                }
                
                // Detect manual scroll
                if (Math.abs(window.scrollY - lastScrollPosition) > 15 && window.scrollY > lastScrollPosition) {
                    pauseScrolling();
                }
                
                lastScrollPosition = window.scrollY;
            }
        }, scrollInterval);
    }
    
    // Pause scrolling
    function pauseScrolling() {
        isScrolling = false;
        
        // Clear any existing pause timeout
        if (pauseTimeout) {
            clearTimeout(pauseTimeout);
        }
        
        // Resume after 8 seconds of inactivity
        pauseTimeout = setTimeout(() => {
            isScrolling = true;
        }, 8000);
    }
    
    // Stop auto-scrolling
    function stopAutoScroll() {
        if (scrollIntervalId) {
            clearInterval(scrollIntervalId);
            scrollIntervalId = null;
        }
    }
    
    // Smooth scroll to top
    function smoothScrollToTop() {
        isScrolling = false;
        
        const scrollToTop = () => {
            const position = window.scrollY;
            if (position > 0) {
                window.scrollTo(0, position - Math.max(position / 20, 10));
                requestAnimationFrame(scrollToTop);
            } else {
                isScrolling = true;
            }
        };
        
        requestAnimationFrame(scrollToTop);
    }
    
    // Add event listeners for user interactions
    function setupEventListeners() {
        // Mouse wheel or touchpad scroll
        window.addEventListener('wheel', () => {
            pauseScrolling();
        }, { passive: true });
        
        // Touch events for mobile
        window.addEventListener('touchstart', () => {
            pauseScrolling();
        }, { passive: true });
        
        // Regular scrolling
        window.addEventListener('scroll', () => {
            if (Math.abs(window.scrollY - lastScrollPosition) > 20) {
                pauseScrolling();
            }
        }, { passive: true });
        
        // Pause on keyboard interaction
        window.addEventListener('keydown', () => {
            pauseScrolling();
        });
        
        // Pause when hovering over interactive elements
        interactiveElements.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    pauseScrolling();
                });
            });
        });
        
        // Add a visible control button to toggle auto-scrolling
        const controlButton = document.createElement('div');
        controlButton.className = 'auto-scroll-control';
        controlButton.innerHTML = '<i class="fas fa-pause"></i>';
        controlButton.title = 'Pause/Resume auto-scrolling';
        document.body.appendChild(controlButton);
        
        controlButton.addEventListener('click', () => {
            isScrolling = !isScrolling;
            controlButton.innerHTML = isScrolling 
                ? '<i class="fas fa-pause"></i>' 
                : '<i class="fas fa-play"></i>';
                
            if (isScrolling && !scrollIntervalId) {
                startAutoScroll();
            }
        });
    }
    
    // Initialize after a short delay to allow page to load fully
    setTimeout(() => {
        setupEventListeners();
        startAutoScroll();
    }, 2000);
});
