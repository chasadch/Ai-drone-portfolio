// Three.js Drone Model & Animation
let scene, camera, renderer, drone, lights, particles;
let mixer, clock, animations = {};
let isInitialized = false;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the 3D scene after the page loader completes
    const loader = document.querySelector('.loader-container');
    
    // Check if loader exists and wait for it to complete
    if (loader) {
        const checkLoaderInterval = setInterval(() => {
            if (loader.style.display === 'none') {
                clearInterval(checkLoaderInterval);
                initDroneScene();
            }
        }, 100);
        
        // Fallback in case loader takes too long
        setTimeout(() => {
            clearInterval(checkLoaderInterval);
            initDroneScene();
        }, 5000);
    } else {
        // No loader found, initialize immediately
        initDroneScene();
    }
});

// Initialize the 3D drone scene
function initDroneScene() {
    // Check if container exists
    const container = document.getElementById('drone-canvas-container');
    if (!container) return;
    
    // Initialize clock for animations
    clock = new THREE.Clock();
    
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 10);
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Create lighting
    createLights();
    
    // Create drone model
    createDroneModel();
    
    // Create particle effects
    createParticleEffects();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
    
    isInitialized = true;
}

// Create lights for the scene
function createLights() {
    // Main directional light (simulates sun)
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 7);
    mainLight.castShadow = true;
    
    // Set up shadow properties
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -10;
    mainLight.shadow.camera.right = 10;
    mainLight.shadow.camera.top = 10;
    mainLight.shadow.camera.bottom = -10;
    
    scene.add(mainLight);
    
    // Ambient light for overall illumination
    const ambientLight = new THREE.AmbientLight(0x404060, 0.5);
    scene.add(ambientLight);
    
    // Accent lights with colors
    const blueLight = new THREE.PointLight(0x00a8ff, 1, 20);
    blueLight.position.set(-5, 2, 3);
    scene.add(blueLight);
    
    const purpleLight = new THREE.PointLight(0x8a2be2, 0.5, 20);
    purpleLight.position.set(5, -2, -3);
    scene.add(purpleLight);
    
    // Store lights for animation
    lights = {
        main: mainLight,
        ambient: ambientLight,
        blue: blueLight,
        purple: purpleLight
    };
}

// Create the drone model
function createDroneModel() {
    // Create a group for the entire drone
    drone = new THREE.Group();
    scene.add(drone);
    
    // Drone body
    const bodyGeometry = new THREE.BoxGeometry(2, 0.5, 3);
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: 0x333333,
        specular: 0xffffff,
        shininess: 100,
        flatShading: false
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    drone.add(body);
    
    // Create a more aerodynamic shape by adding additional elements
    const frontGeometry = new THREE.ConeGeometry(0.25, 1, 4);
    frontGeometry.rotateX(Math.PI / 2);
    const frontMesh = new THREE.Mesh(frontGeometry, bodyMaterial);
    frontMesh.position.set(0, 0, -1.5);
    frontMesh.castShadow = true;
    frontMesh.receiveShadow = true;
    drone.add(frontMesh);
    
    // Drone arms
    const armPositions = [
        { x: 1.5, y: 0, z: 1.5 },
        { x: -1.5, y: 0, z: 1.5 },
        { x: 1.5, y: 0, z: -1.5 },
        { x: -1.5, y: 0, z: -1.5 }
    ];
    
    const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 8);
    armGeometry.rotateX(Math.PI / 2);
    
    const armMaterial = new THREE.MeshPhongMaterial({
        color: 0x00a8ff,
        specular: 0xffffff,
        shininess: 30
    });
    
    // Create propellers and arms
    const propellers = [];
    
    armPositions.forEach((pos, index) => {
        // Rotated arm for X configuration
        const arm = new THREE.Mesh(armGeometry, armMaterial);
        arm.position.set(0, 0, 0);
        arm.castShadow = true;
        arm.receiveShadow = true;
        
        // Angle each arm correctly
        arm.rotation.y = Math.PI / 4 + (index * Math.PI / 2);
        
        drone.add(arm);
        
        // Propeller motors
        const motorGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
        const motorMaterial = new THREE.MeshPhongMaterial({
            color: 0x222222,
            specular: 0x555555,
            shininess: 30
        });
        
        const motor = new THREE.Mesh(motorGeometry, motorMaterial);
        motor.position.set(pos.x, pos.y, pos.z);
        motor.castShadow = true;
        motor.receiveShadow = true;
        drone.add(motor);
        
        // Propeller blades
        const propGeometry = new THREE.BoxGeometry(1.5, 0.05, 0.2);
        const propMaterial = new THREE.MeshPhongMaterial({
            color: 0xdddddd,
            transparent: true,
            opacity: 0.8,
            side: THREE.DoubleSide
        });
        
        const propeller = new THREE.Mesh(propGeometry, propMaterial);
        propeller.position.set(pos.x, pos.y + 0.2, pos.z);
        propeller.castShadow = true;
        drone.add(propeller);
        
        // Add to propellers array for animation
        propellers.push(propeller);
    });
    
    // Add camera/sensor at the bottom
    const cameraGeometry = new THREE.SphereGeometry(0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
    const cameraMaterial = new THREE.MeshPhongMaterial({
        color: 0x222222,
        specular: 0x000000,
        shininess: 30
    });
    
    const droneCam = new THREE.Mesh(cameraGeometry, cameraMaterial);
    droneCam.position.set(0, -0.25, 0);
    droneCam.rotation.x = Math.PI;
    droneCam.castShadow = true;
    droneCam.receiveShadow = true;
    drone.add(droneCam);
    
    // Camera lens
    const lensGeometry = new THREE.CircleGeometry(0.15, 16);
    const lensMaterial = new THREE.MeshPhongMaterial({
        color: 0x00a8ff,
        specular: 0xffffff,
        shininess: 100,
        side: THREE.DoubleSide
    });
    
    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.position.set(0, -0.26, 0);
    lens.rotation.x = Math.PI / 2;
    drone.add(lens);
    
    // Add LED lights
    const ledGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const redLedMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const greenLedMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    
    const frontRightLed = new THREE.Mesh(ledGeometry, greenLedMaterial);
    frontRightLed.position.set(1, -0.1, 1.5);
    drone.add(frontRightLed);
    
    const frontLeftLed = new THREE.Mesh(ledGeometry, redLedMaterial);
    frontLeftLed.position.set(-1, -0.1, 1.5);
    drone.add(frontLeftLed);
    
    // Store propellers for animation
    drone.propellers = propellers;
    
    // Position the drone in the scene
    drone.position.set(0, 0, 0);
    
    // Add subtle automatic animation
    animateDrone();
}

// Create particle effects for visual enhancement
function createParticleEffects() {
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
        sizes[i] = Math.random() * 0.5;
    }
    
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x00a8ff,
        size: 0.1,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true
    });
    
    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
}

// Animate the drone with floating and propeller rotation
function animateDrone() {
    if (!drone) return;
    
    // Create subtle floating animation
    const floatingAnimation = () => {
        const time = Date.now() * 0.001;
        
        // Subtle hovering motion
        drone.position.y = Math.sin(time * 0.5) * 0.3;
        
        // Very subtle rotation
        drone.rotation.x = Math.sin(time * 0.3) * 0.05;
        drone.rotation.z = Math.cos(time * 0.2) * 0.05;
        drone.rotation.y = Math.sin(time * 0.1) * 0.1;
        
        // Animate propellers
        if (drone.propellers) {
            drone.propellers.forEach((propeller, index) => {
                propeller.rotation.y += 0.3 + (index * 0.05);
            });
        }
        
        // Animate lights for pulsing effect
        if (lights) {
            lights.blue.intensity = 0.5 + Math.sin(time * 2) * 0.3;
            lights.purple.intensity = 0.5 + Math.cos(time * 2) * 0.3;
        }
    };
    
    // Store animation reference
    animations.floating = floatingAnimation;
}

// Update on window resize
function onWindowResize() {
    const container = document.getElementById('drone-canvas-container');
    if (!container) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Run all animations
    for (const animName in animations) {
        if (animations[animName]) animations[animName]();
    }
    
    // Animate particles
    if (particles) {
        particles.rotation.y += 0.0005;
    }
    
    // Update animation mixer if available
    if (mixer) {
        mixer.update(clock.getDelta());
    }
    
    renderer.render(scene, camera);
}

// Function to update drone model for different drone types
// This will be called from main.js when user selects different drones
window.updateDroneModel = function(droneId) {
    if (!isInitialized || !drone) return;
    
    // Change drone appearance based on selection
    switch(droneId) {
        case 'drone1': // CineMaster Pro X8
            // Change to large professional drone
            drone.scale.set(1, 1, 1);
            drone.children.forEach(child => {
                if (child.material && child.material.color) {
                    if (child.material.color.getHex() === 0x333333) {
                        child.material.color.setHex(0x333333);
                    }
                }
            });
            break;
            
        case 'drone2': // Agility FPV 5"
            // Change to small, racing-style drone
            drone.scale.set(0.7, 0.7, 0.7);
            drone.children.forEach(child => {
                if (child.material && child.material.color) {
                    if (child.material.color.getHex() === 0x333333) {
                        child.material.color.setHex(0x222222);
                    }
                }
            });
            break;
            
        case 'drone3': // SurveyMaster 600
            // Change to mapping/surveying style drone
            drone.scale.set(1.2, 0.9, 1.2);
            drone.children.forEach(child => {
                if (child.material && child.material.color) {
                    if (child.material.color.getHex() === 0x333333) {
                        child.material.color.setHex(0x444444);
                    }
                }
            });
            break;
    }
};
