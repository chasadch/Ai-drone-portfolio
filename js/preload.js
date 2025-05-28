// Preload script to improve website performance

// Preload images and videos to improve initial loading performance
document.addEventListener('DOMContentLoaded', function() {
    // Start preloading assets after DOM is loaded
    preloadAssets();
});

// Function to preload all critical assets
function preloadAssets() {
    // Preload images
    const imagesToPreload = [
        'images/making.jpg',
        'images/obj model training.jpg',
        'images/model traning results.png',
        'images/Screenshot 2025-05-14 125241.jpg',
        'images/WhatsApp Image 2025-05-02 at 09.29.30_55b67871.jpg'
    ];
    
    // Create image objects to preload
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Preload video thumbnails before playing videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Add loading attribute for better performance
        video.setAttribute('loading', 'lazy');
        
        // Only load video when it's near the viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Replace 'poster' with the first frame of the video
                    if (!video.getAttribute('poster')) {
                        // Create a poster from the first frame when possible
                        video.addEventListener('loadeddata', function() {
                            if (video.readyState >= 2) {
                                createPoster(video);
                            }
                        });
                    }
                    observer.unobserve(video);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(video);
    });
}

// Function to create a poster image from the first frame of a video
function createPoster(video) {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the first frame of the video
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Convert canvas to image data URL and set as poster
    try {
        const dataURL = canvas.toDataURL('image/jpeg');
        video.setAttribute('poster', dataURL);
    } catch (e) {
        console.error('Could not create poster for video:', e);
    }
}

// Add lazy loading to all images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
});

// Optimize rendering performance
window.addEventListener('load', function() {
    // Use requestAnimationFrame for smoother animations
    function optimizeRendering() {
        // Add will-change property to elements that will animate
        const animatedElements = document.querySelectorAll(
            '.hero-title-line, .hero-title-accent, .hero-description, ' +
            '.hero-cta, .hero-stats, .hero-drone-showcase, .service-card, ' +
            '.portfolio-item, .drone-select-item, .tech-feature, ' +
            '.video-item, .testimonial-card'
        );
        
        animatedElements.forEach(el => {
            el.style.willChange = 'transform, opacity';
        });
        
        // Remove will-change after animations complete to free up resources
        setTimeout(() => {
            animatedElements.forEach(el => {
                el.style.willChange = 'auto';
            });
        }, 5000); // Assume most initial animations complete within 5 seconds
    }
    
    // Run optimization
    requestAnimationFrame(optimizeRendering);
});
