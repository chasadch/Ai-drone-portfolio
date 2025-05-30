// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbarLinks = document.querySelector('.navbar-links');
    
    if (mobileMenuBtn && navbarLinks) {
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', function() {
            navbarLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            document.body.classList.toggle('mobile-menu-active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.navbar-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('mobile-menu-active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.navbar-links') && 
                !event.target.closest('.mobile-menu-btn') && 
                navbarLinks.classList.contains('active')) {
                navbarLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.classList.remove('mobile-menu-active');
            }
        });
    }
    
    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle responsive video resizing
    function resizeVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            if (window.innerWidth <= 768) {
                // Set height based on aspect ratio for mobile
                const width = video.offsetWidth;
                const height = width * 0.5625; // 16:9 aspect ratio
                video.style.height = height + 'px';
            } else {
                video.style.height = '';
            }
        });
    }
    
    // Initial call and resize event listener
    resizeVideos();
    window.addEventListener('resize', resizeVideos);
});
