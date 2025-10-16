// Header 3D Logo - FULL 3-AXIS ROTATION
document.addEventListener('DOMContentLoaded', function() {
    const headerLogo = document.getElementById('headerLogo');
    
    if (headerLogo) {
        let isDragging = false;
        let lastMouseX = 0;
        let lastMouseY = 0;
        let isRightClick = false;
        
        // Load saved rotations
        let orbitRotation = parseFloat(localStorage.getItem('headerOrbitRotation')) || 0;
        let verticalAngle = parseFloat(localStorage.getItem('headerVerticalAngle')) || 0;
        let rollRotation = parseFloat(localStorage.getItem('headerRollRotation')) || 0;
        
        // Apply saved rotations
        updateCamera();

        // Mouse events for different rotations
        headerLogo.addEventListener('mousedown', function(e) {
            isDragging = true;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            isRightClick = e.button === 2; // Right click for roll
            this.style.cursor = 'grabbing';
            e.preventDefault();
        });

        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const deltaX = e.clientX - lastMouseX;
            const deltaY = e.clientY - lastMouseY;
            lastMouseX = e.clientX;
            lastMouseY = e.clientY;
            
            if (isRightClick) {
                // RIGHT CLICK + DRAG = Z-AXIS ROLL
                rollRotation += deltaX * 0.01;
            } else if (e.shiftKey) {
                // SHIFT + DRAG = Y-AXIS SPIN
                orbitRotation -= deltaX * 0.01;
            } else {
                // NORMAL DRAG = ORBIT (X and Y axes)
                orbitRotation -= deltaX * 0.01;
                verticalAngle = Math.max(-90, Math.min(90, verticalAngle - deltaY * 0.5));
            }
            
            updateCamera();
        });

        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                headerLogo.style.cursor = 'grab';
                saveRotations();
            }
        });

        // Touch events for mobile
        let touchStartDistance = 0;
        
        headerLogo.addEventListener('touchstart', function(e) {
            if (e.touches.length === 1) {
                // Single touch = orbit
                isDragging = true;
                lastMouseX = e.touches[0].clientX;
                lastMouseY = e.touches[0].clientY;
            } else if (e.touches.length === 2) {
                // Two fingers = roll
                isDragging = true;
                touchStartDistance = getTouchDistance(e.touches);
            }
            e.preventDefault();
        });

        document.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            if (e.touches.length === 1) {
                // Single touch orbit
                const deltaX = e.touches[0].clientX - lastMouseX;
                const deltaY = e.touches[0].clientY - lastMouseY;
                lastMouseX = e.touches[0].clientX;
                lastMouseY = e.touches[0].clientY;
                
                orbitRotation -= deltaX * 0.01;
                verticalAngle = Math.max(-90, Math.min(90, verticalAngle - deltaY * 0.5));
            } else if (e.touches.length === 2) {
                // Two finger roll
                const currentDistance = getTouchDistance(e.touches);
                const delta = currentDistance - touchStartDistance;
                touchStartDistance = currentDistance;
                
                rollRotation += delta * 0.01;
            }
            
            updateCamera();
        });

        document.addEventListener('touchend', function() {
            if (isDragging) {
                isDragging = false;
                saveRotations();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.key === 'r' || e.key === 'R') {
                // R key = reset all rotations
                orbitRotation = 0;
                verticalAngle = 0;
                rollRotation = 0;
                updateCamera();
                saveRotations();
            }
        });

        // Helper functions
        function updateCamera() {
            // Combine all rotations into camera-orbit
            headerLogo.setAttribute('camera-orbit', `${orbitRotation}rad ${verticalAngle}deg`);
            
            // Apply roll rotation separately using CSS transform
            headerLogo.style.transform = `rotateZ(${rollRotation}rad)`;
        }
        
        function saveRotations() {
            localStorage.setItem('headerOrbitRotation', orbitRotation.toString());
            localStorage.setItem('headerVerticalAngle', verticalAngle.toString());
            localStorage.setItem('headerRollRotation', rollRotation.toString());
        }
        
        function getTouchDistance(touches) {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }

        // Set initial cursor
        headerLogo.style.cursor = 'grab';
        headerLogo.style.transform = 'rotateZ(0rad)';
        
        // Click to go home
        headerLogo.addEventListener('click', function(e) {
            if (!isDragging && e.button === 0) { // Left click only
                e.preventDefault();
                window.location.href = 'index.html';
            }
        });

        // Prevent context menu on logo
        headerLogo.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    }
});