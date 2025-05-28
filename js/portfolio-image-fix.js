// Fix for portfolio gallery images not displaying

document.addEventListener('DOMContentLoaded', function() {
    // Find all portfolio images
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    
    // Check if images are loaded correctly
    portfolioImages.forEach(img => {
        // Set a default fallback image if the image fails to load
        img.onerror = function() {
            console.error('Failed to load image:', img.src);
            
            // Try to fix the path by exploring alternatives
            const originalSrc = img.src;
            
            // Try with a different path format
            if (originalSrc.includes('images/')) {
                // Try alternate paths
                const fileName = originalSrc.split('/').pop();
                const altPaths = [
                    `./images/${fileName}`,
                    `../images/${fileName}`,
                    `/images/${fileName}`
                ];
                
                // Try each alternative path
                tryLoadingWithAlternatePaths(img, altPaths);
            }
            
            // If all else fails, add a visual indicator
            img.parentElement.classList.add('image-load-error');
        };
        
        // Ensure image is visible once loaded
        img.onload = function() {
            img.style.opacity = '1';
            img.parentElement.classList.add('image-loaded');
        };
        
        // Force reload the image to trigger the events
        const currentSrc = img.src;
        img.src = '';
        setTimeout(() => {
            img.src = currentSrc;
        }, 10);
    });
    
    // Try loading with alternate paths
    function tryLoadingWithAlternatePaths(imgElement, paths) {
        let loaded = false;
        let pathIndex = 0;
        
        // Try each path until one works
        function tryNextPath() {
            if (pathIndex >= paths.length || loaded) return;
            
            const testImg = new Image();
            testImg.onload = function() {
                loaded = true;
                imgElement.src = paths[pathIndex];
                imgElement.parentElement.classList.remove('image-load-error');
                imgElement.parentElement.classList.add('image-loaded');
            };
            
            testImg.onerror = function() {
                pathIndex++;
                tryNextPath();
            };
            
            testImg.src = paths[pathIndex];
        }
        
        tryNextPath();
    }
    
    // Add debug overlay to check portfolio item layout
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        // Add a data attribute for debugging
        item.setAttribute('data-debug', 'portfolio-item');
        
        // Ensure the item is visible
        item.style.display = 'block';
        item.style.opacity = '1';
        
        // Add debug information
        const debugInfo = document.createElement('div');
        debugInfo.className = 'debug-info';
        debugInfo.style.display = 'none'; // Hidden by default
        debugInfo.innerHTML = `
            <div style="position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.7); color: white; padding: 5px; font-size: 10px; z-index: 1000;">
                Category: ${item.getAttribute('data-category')}
            </div>
        `;
        item.appendChild(debugInfo);
        
        // Show debug info on right-click
        item.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none';
        });
    });
});

// Add CSS styles for image error states
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .image-load-error {
            background: linear-gradient(45deg, #f3f3f3 25%, #e6e6e6 25%, #e6e6e6 50%, #f3f3f3 50%, #f3f3f3 75%, #e6e6e6 75%, #e6e6e6 100%);
            background-size: 20px 20px;
            position: relative;
        }
        
        .image-load-error::after {
            content: '!';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 32px;
            color: #ff5252;
            background: rgba(0,0,0,0.5);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .image-loaded img {
            animation: fadeIn 0.5s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
});
