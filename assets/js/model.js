    // Featured page JavaScript - With sounds for all buttons
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize model viewers
        const carModel = document.getElementById('carModel');
        const keyModel = document.getElementById('keyModel');

        // Audio elements for sound effects
        const unlockSound = new Audio('assets/sounds/unlock.mp3');
        const lockSound = new Audio('assets/sounds/lock.mp3');
        const engineSound = new Audio('assets/sounds/engine.mp3');
        const honkSound = new Audio('assets/sounds/honk.mp3');

        // Preload sounds
        const sounds = [unlockSound, lockSound, engineSound, honkSound];
        sounds.forEach(sound => {
            sound.preload = 'auto';
            sound.volume = 0.7;
        });

        let carRotation = 0;
        let keyRotation = 0;
        let isDragging = false;
        let lastMouseX = 0;
        let currentModel = null;

        // Button trigger areas - Final optimized positions
        const buttonAreas = {
            unlock:  { left: 0.395, right: 0.575, top: 0.24, bottom: 0.40 },
            lock:    { left: 0.390, right: 0.585, top: 0.390, bottom: 0.53 },
            engine:  { left: 0.390, right: 0.590, top: 0.50, bottom: 0.65 },
            honk:    { left: 0.385, right: 0.595, top: 0.66, bottom: 0.77 }
        };

        // Model load handlers
        if (carModel) {
            carModel.addEventListener('load', () => {
                setupManualRotation(carModel, 'car', 85); // 85deg for car
            });
        }
        
        if (keyModel) {
            keyModel.addEventListener('load', () => {
                setupManualRotation(keyModel, 'key', 75); // 75deg for key
                setupKeyInteractions();
            });
        }

        function setupManualRotation(model, type, verticalAngle) {
            model.addEventListener('mousedown', startDrag);
            model.addEventListener('touchstart', startDragTouch);
            
            function startDrag(e) {
                isDragging = true;
                currentModel = type;
                lastMouseX = e.clientX;
                document.addEventListener('mousemove', drag);
                document.addEventListener('mouseup', stopDrag);
            }
            
            function startDragTouch(e) {
                isDragging = true;
                currentModel = type;
                lastMouseX = e.touches[0].clientX;
                document.addEventListener('touchmove', dragTouch);
                document.addEventListener('touchend', stopDrag);
            }
            
            function drag(e) {
                if (!isDragging || currentModel !== type) return;
                
                const deltaX = e.clientX - lastMouseX;
                lastMouseX = e.clientX;
                
                if (type === 'car') {
                    carRotation -= deltaX * 0.01;
                    // PRESERVE 85deg VERTICAL ANGLE
                    model.setAttribute('camera-orbit', `${carRotation}rad ${verticalAngle}deg`);
                } else {
                    keyRotation -= deltaX * 0.01;
                    // PRESERVE 75deg VERTICAL ANGLE  
                    model.setAttribute('camera-orbit', `${keyRotation}rad ${verticalAngle}deg`);
                }
            }
            
            function dragTouch(e) {
                if (!isDragging || currentModel !== type) return;
                
                const deltaX = e.touches[0].clientX - lastMouseX;
                lastMouseX = e.touches[0].clientX;
                
                if (type === 'car') {
                    carRotation -= deltaX * 0.01;
                    // PRESERVE 85deg VERTICAL ANGLE
                    model.setAttribute('camera-orbit', `${carRotation}rad ${verticalAngle}deg`);
                } else {
                    keyRotation -= deltaX * 0.01;
                    // PRESERVE 75deg VERTICAL ANGLE
                    model.setAttribute('camera-orbit', `${keyRotation}rad ${verticalAngle}deg`);
                }
            }
            
            function stopDrag() {
                isDragging = false;
                currentModel = null;
                document.removeEventListener('mousemove', drag);
                document.removeEventListener('touchmove', dragTouch);
                document.removeEventListener('mouseup', stopDrag);
                document.removeEventListener('touchend', stopDrag);
            }
        }

        // Setup key interactions with sounds
        function setupKeyInteractions() {
            keyModel.addEventListener('click', (event) => {
                const rect = keyModel.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                
                // Calculate relative coordinates (0 to 1)
                const relX = x / rect.width;
                const relY = y / rect.height;
                
                // Button regions detection
                if (isInUnlockButtonRegion(relX, relY)) {
                    handleUnlockButton();
                } else if (isInLockButtonRegion(relX, relY)) {
                    handleLockButton();
                } else if (isInEngineButtonRegion(relX, relY)) {
                    handleEngineButton();
                } else if (isInHonkButtonRegion(relX, relY)) {
                    handleHonkButton();
                }
            });
        }
        
        // Button region detection functions
        function isInUnlockButtonRegion(x, y) {
            return x > buttonAreas.unlock.left && x < buttonAreas.unlock.right && 
                y > buttonAreas.unlock.top && y < buttonAreas.unlock.bottom;
        }
        
        function isInLockButtonRegion(x, y) {
            return x > buttonAreas.lock.left && x < buttonAreas.lock.right && 
                y > buttonAreas.lock.top && y < buttonAreas.lock.bottom;
        }
        
        function isInEngineButtonRegion(x, y) {
            return x > buttonAreas.engine.left && x < buttonAreas.engine.right && 
                y > buttonAreas.engine.top && y < buttonAreas.engine.bottom;
        }
        
        function isInHonkButtonRegion(x, y) {
            return x > buttonAreas.honk.left && x < buttonAreas.honk.right && 
                y > buttonAreas.honk.top && y < buttonAreas.honk.bottom;
        }
        
        // Button handlers with sounds
        function handleUnlockButton() {
            unlockSound.currentTime = 0;
            unlockSound.play().catch(e => console.log('Unlock sound error:', e));
        }
        
        function handleLockButton() {
            lockSound.currentTime = 0;
            lockSound.play().catch(e => console.log('Lock sound error:', e));
        }
        
        function handleEngineButton() {
            engineSound.currentTime = 0;
            engineSound.play().catch(e => console.log('Engine sound error:', e));
        }
        
        function handleHonkButton() {
            honkSound.currentTime = 0;
            honkSound.play().catch(e => console.log('Honk sound error:', e));
        }

        // Add interactive functionality to specs
        const specs = document.querySelectorAll('.spec');
        specs.forEach(spec => {
            spec.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            spec.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    });