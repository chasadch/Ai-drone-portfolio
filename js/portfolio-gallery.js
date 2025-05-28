// WebGL Portfolio Gallery
let portfolioScene, portfolioCamera, portfolioRenderer;
let portfolioItems = [], raycaster, mouse;
let clock = new THREE.Clock();
let isPortfolioInitialized = false;

// Initialize the portfolio gallery after page load
document.addEventListener('DOMContentLoaded', function() {
    // Wait for page loader to complete
    const loader = document.querySelector('.loader-container');
    
    if (loader) {
        const checkLoaderInterval = setInterval(() => {
            if (loader.style.display === 'none') {
                clearInterval(checkLoaderInterval);
                setTimeout(() => {
                    initPortfolioGallery();
                }, 1000); // Slight delay to ensure smooth loading
            }
        }, 100);
        
        // Fallback
        setTimeout(() => {
            clearInterval(checkLoaderInterval);
            initPortfolioGallery();
        }, 5000);
    } else {
        initPortfolioGallery();
    }
});

// Initialize the portfolio gallery
function initPortfolioGallery() {
    const container = document.getElementById('portfolio-webgl');
    if (!container) return;
    
    // Setup scene
    portfolioScene = new THREE.Scene();
    
    // Setup camera
    portfolioCamera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    portfolioCamera.position.set(0, 0, 5);
    
    // Setup renderer
    portfolioRenderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    portfolioRenderer.setSize(container.clientWidth, container.clientHeight);
    portfolioRenderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(portfolioRenderer.domElement);
    
    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    portfolioScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    portfolioScene.add(directionalLight);
    
    // Add background particles
    createBackgroundParticles();
    
    // Create portfolio items
    createPortfolioItems();
    
    // Setup raycaster for interaction
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    
    // Event listeners
    window.addEventListener('resize', onPortfolioResize);
    container.addEventListener('mousemove', onPortfolioMouseMove);
    container.addEventListener('click', onPortfolioClick);
    
    // Start animation loop
    animatePortfolio();
    
    isPortfolioInitialized = true;
}

// Create background particles for visual effect
function createBackgroundParticles() {
    const particlesCount = 500;
    const particleGeometry = new THREE.BufferGeometry();
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0x00a8ff,
        size: 0.05,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending
    });
    
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(particleGeometry, particlesMaterial);
    portfolioScene.add(particles);
    
    // Store for animation
    portfolioScene.backgroundParticles = particles;
}

// Create 3D portfolio items from the existing portfolio grid
function createPortfolioItems() {
    // Get all portfolio items from the DOM
    const domItems = document.querySelectorAll('.portfolio-item');
    
    // Clear existing portfolio items
    portfolioItems.forEach(item => {
        portfolioScene.remove(item);
    });
    portfolioItems = [];
    
    // Calculate the layout
    const itemWidth = 1.5;
    const itemHeight = 1;
    const gap = 0.2;
    const itemsPerRow = 3;
    
    domItems.forEach((domItem, index) => {
        // Get the image URL
        const imgElement = domItem.querySelector('img');
        const imgUrl = imgElement ? imgElement.src : '';
        
        // Get the category and title
        const category = domItem.getAttribute('data-category') || '';
        const title = domItem.querySelector('h3') ? domItem.querySelector('h3').textContent : '';
        
        // Create a plane for the portfolio item
        const geometry = new THREE.PlaneGeometry(itemWidth, itemHeight);
        
        // Create material with the image texture
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.9
        });
        
        // If we have an image URL, load it as a texture
        if (imgUrl) {
            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(imgUrl, (texture) => {
                material.map = texture;
                material.needsUpdate = true;
            });
        }
        
        // Create the mesh
        const mesh = new THREE.Mesh(geometry, material);
        
        // Position the mesh in a grid layout
        const row = Math.floor(index / itemsPerRow);
        const col = index % itemsPerRow;
        
        // Center the grid
        const startX = ((itemsPerRow - 1) * (itemWidth + gap)) / -2;
        const startY = ((Math.ceil(domItems.length / itemsPerRow) - 1) * (itemHeight + gap)) / 2;
        
        mesh.position.x = startX + col * (itemWidth + gap);
        mesh.position.y = startY - row * (itemHeight + gap);
        mesh.position.z = 0;
        
        // Store metadata
        mesh.userData = {
            domElement: domItem,
            category: category,
            title: title,
            originalPosition: {
                x: mesh.position.x,
                y: mesh.position.y,
                z: mesh.position.z
            },
            originalRotation: {
                x: mesh.rotation.x,
                y: mesh.rotation.y,
                z: mesh.rotation.z
            }
        };
        
        // Add to scene and array
        portfolioScene.add(mesh);
        portfolioItems.push(mesh);
    });
}

// Handle window resize
function onPortfolioResize() {
    const container = document.getElementById('portfolio-webgl');
    if (!container) return;
    
    portfolioCamera.aspect = container.clientWidth / container.clientHeight;
    portfolioCamera.updateProjectionMatrix();
    portfolioRenderer.setSize(container.clientWidth, container.clientHeight);
}

// Handle mouse move for hover effects
function onPortfolioMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    const container = document.getElementById('portfolio-webgl');
    const rect = container.getBoundingClientRect();
    
    mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
    
    // Update the raycaster
    raycaster.setFromCamera(mouse, portfolioCamera);
    
    // Check for intersections
    const intersects = raycaster.intersectObjects(portfolioItems);
    
    // Reset all items first
    portfolioItems.forEach(item => {
        // Animate back to original position if not the hovered item
        if (!intersects.length || intersects[0].object !== item) {
            gsap.to(item.position, {
                z: item.userData.originalPosition.z,
                duration: 0.5
            });
            
            gsap.to(item.rotation, {
                x: item.userData.originalRotation.x,
                y: item.userData.originalRotation.y,
                duration: 0.5
            });
            
            // Reset scale
            gsap.to(item.scale, {
                x: 1,
                y: 1,
                duration: 0.5
            });
            
            // Reset material
            if (item.material) {
                gsap.to(item.material, {
                    opacity: 0.9,
                    duration: 0.5
                });
            }
        }
    });
    
    // Apply hover effect to intersected item
    if (intersects.length > 0) {
        const hoveredItem = intersects[0].object;
        
        // Move forward
        gsap.to(hoveredItem.position, {
            z: 0.5,
            duration: 0.5
        });
        
        // Subtle rotation based on mouse position
        gsap.to(hoveredItem.rotation, {
            x: mouse.y * 0.1,
            y: mouse.x * 0.1,
            duration: 0.5
        });
        
        // Scale up slightly
        gsap.to(hoveredItem.scale, {
            x: 1.1,
            y: 1.1,
            duration: 0.5
        });
        
        // Increase opacity
        if (hoveredItem.material) {
            gsap.to(hoveredItem.material, {
                opacity: 1,
                duration: 0.5
            });
        }
        
        // Change cursor to pointer
        container.style.cursor = 'pointer';
    } else {
        // Reset cursor
        container.style.cursor = 'default';
    }
}

// Handle click events
function onPortfolioClick(event) {
    // Update the raycaster
    raycaster.setFromCamera(mouse, portfolioCamera);
    
    // Check for intersections
    const intersects = raycaster.intersectObjects(portfolioItems);
    
    if (intersects.length > 0) {
        const clickedItem = intersects[0].object;
        
        // Get the DOM element for this item
        const domElement = clickedItem.userData.domElement;
        
        // Trigger the same behavior as clicking the DOM element
        if (domElement) {
            // Create lightbox effect to show larger image
            const imgElement = domElement.querySelector('img');
            const imgUrl = imgElement ? imgElement.src : '';
            const title = clickedItem.userData.title || 'Portfolio Item';
            
            if (imgUrl) {
                createLightbox(imgUrl, title);
            }
        }
    }
}

// Create a lightbox to show the image in full size
function createLightbox(imgUrl, title) {
    // Create lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'portfolio-lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
    lightbox.style.display = 'flex';
    lightbox.style.alignItems = 'center';
    lightbox.style.justifyContent = 'center';
    lightbox.style.zIndex = '9999';
    lightbox.style.opacity = '0';
    lightbox.style.transition = 'opacity 0.3s ease';
    
    // Create image element
    const img = document.createElement('img');
    img.src = imgUrl;
    img.alt = title;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '80%';
    img.style.boxShadow = '0 5px 25px rgba(0, 0, 0, 0.5)';
    img.style.transform = 'scale(0.9)';
    img.style.transition = 'transform 0.3s ease';
    
    // Create title element
    const titleElement = document.createElement('div');
    titleElement.textContent = title;
    titleElement.style.position = 'absolute';
    titleElement.style.bottom = '20%';
    titleElement.style.left = '0';
    titleElement.style.width = '100%';
    titleElement.style.textAlign = 'center';
    titleElement.style.color = '#fff';
    titleElement.style.fontSize = '1.5rem';
    titleElement.style.fontWeight = 'bold';
    titleElement.style.opacity = '0';
    titleElement.style.transition = 'opacity 0.3s ease';
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '20px';
    closeBtn.style.right = '20px';
    closeBtn.style.backgroundColor = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.color = '#fff';
    closeBtn.style.fontSize = '2rem';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.zIndex = '10000';
    closeBtn.setAttribute('aria-label', 'Close lightbox');
    closeBtn.setAttribute('title', 'Close lightbox');
    
    // Add elements to lightbox
    lightbox.appendChild(img);
    lightbox.appendChild(titleElement);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);
    
    // Fade in animation
    setTimeout(() => {
        lightbox.style.opacity = '1';
        img.style.transform = 'scale(1)';
        titleElement.style.opacity = '1';
    }, 10);
    
    // Close lightbox on click
    lightbox.addEventListener('click', () => {
        lightbox.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        titleElement.style.opacity = '0';
        
        setTimeout(() => {
            document.body.removeChild(lightbox);
        }, 300);
    });
    
    // Prevent closing when clicking on the image
    img.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Animation loop
function animatePortfolio() {
    if (!isPortfolioInitialized) return;
    
    requestAnimationFrame(animatePortfolio);
    
    // Get elapsed time
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();
    
    // Animate background particles
    if (portfolioScene.backgroundParticles) {
        portfolioScene.backgroundParticles.rotation.y += delta * 0.05;
    }
    
    // Subtle camera movement
    portfolioCamera.position.y = Math.sin(elapsedTime * 0.2) * 0.2;
    portfolioCamera.position.x = Math.sin(elapsedTime * 0.1) * 0.2;
    portfolioCamera.lookAt(0, 0, 0);
    
    // Animate portfolio items
    portfolioItems.forEach((item, index) => {
        // Subtle floating animation
        item.position.y = item.userData.originalPosition.y + Math.sin(elapsedTime * 0.5 + index * 0.2) * 0.05;
    });
    
    // Render the scene
    portfolioRenderer.render(portfolioScene, portfolioCamera);
}

// Function to update portfolio gallery when filter changes
window.updatePortfolioGallery = function() {
    if (isPortfolioInitialized) {
        createPortfolioItems();
    }
};
