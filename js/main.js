// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page loader
    initPageLoader();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Initialize card tilt effect
    initTiltEffect();
    
    // Initialize testimonial slider
    initTestimonialSlider();
    
    // Initialize portfolio filter
    initPortfolioFilter();
    
    // Initialize drone fleet selector
    initDroneSelector();
    
    // Initialize contact form
    initContactForm();
});

// Page Loader
function initPageLoader() {
    const loader = document.querySelector('.loader-container');
    
    // Simply hide the loader after assets are loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Animate elements after page load
                    animateElementsOnLoad();
                }, 500);
            }
        }, 1000); // Wait a second after load to ensure everything is ready
    });
    
    // Fallback in case window load event doesn't fire
    setTimeout(() => {
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
                animateElementsOnLoad();
            }, 500);
        }
    }, 5000); // 5 second fallback
}

// Animate elements after page load
function animateElementsOnLoad() {
    // Animate hero section elements
    const heroContent = document.querySelector('.hero-content');
    const heroElements = heroContent.querySelectorAll('h1, p, .hero-buttons');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 300 + (index * 200));
    });
}

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    
    // Add scrolled class to navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Create close button if it doesn't exist
        if (navLinks.classList.contains('active') && !document.querySelector('.close-menu')) {
            const closeBtn = document.createElement('div');
            closeBtn.classList.add('close-menu');
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            
            closeBtn.addEventListener('click', () => {
                navLinks.classList.remove('active');
                closeBtn.remove();
            });
            
            navLinks.appendChild(closeBtn);
        }
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Smooth scroll for navigation links
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const closeBtn = document.querySelector('.close-menu');
                if (closeBtn) closeBtn.remove();
            }
        });
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.display = 'block';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add hover effect for links and buttons
        const interactiveElements = document.querySelectorAll('a, button, .service-card, .portfolio-item, .drone-select-item');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = 'var(--primary-color)';
                cursor.style.backgroundColor = 'rgba(0, 168, 255, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'var(--primary-color)';
                cursor.style.backgroundColor = 'transparent';
            });
        });
        
        // Hide cursor when leaving the window
        document.addEventListener('mouseout', () => {
            cursor.style.display = 'none';
        });
        
        document.addEventListener('mouseover', () => {
            cursor.style.display = 'block';
        });
    }
}

// Card Tilt Effect
function initTiltEffect() {
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentSlide = 0;
    
    // Set initial state
    updateSlider();
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        updateSlider();
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        updateSlider();
    });
    
    // Dots navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Auto slide (optional)
    let slideInterval = setInterval(() => {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        updateSlider();
    }, 5000);
    
    // Pause auto slide on hover
    const sliderContainer = document.querySelector('.testimonials-slider');
    
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            updateSlider();
        }, 5000);
    });
    
    // Update slider state
    function updateSlider() {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(btn => btn.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                // Hide all items first
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.style.display = 'block';
                        
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
}

// Drone Fleet Selector
function initDroneSelector() {
    const droneSelectors = document.querySelectorAll('.drone-select-item');
    const droneSpecsTabs = document.querySelectorAll('.drone-specs-tab');
    
    droneSelectors.forEach(selector => {
        selector.addEventListener('click', () => {
            // Update active selector
            droneSelectors.forEach(item => item.classList.remove('active'));
            selector.classList.add('active');
            
            const droneId = selector.getAttribute('data-drone');
            const targetTab = document.getElementById(droneId + '-specs');
            
            if (targetTab) {
                // Hide all tabs
                droneSpecsTabs.forEach(tab => tab.classList.remove('active'));
                
                // Show target tab
                targetTab.classList.add('active');
                
                // Update 3D model (this will be handled by the drone-model.js file)
                if (window.updateDroneModel) {
                    window.updateDroneModel(droneId);
                }
            }
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Basic validation
            if (!name || !email || !service || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    }
}
