// About Page - Full Rotation Controls for 3D Objects
document.addEventListener('DOMContentLoaded', function() {
    const bmwLogo3D = document.getElementById('bmwLogo3D');
    const m4Logo3D = document.getElementById('m4Logo3D');

    let bmwRotation = 0;
    let m4Rotation = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let currentModel = null;

    // Setup rotation for both models
    if (bmwLogo3D) {
        bmwLogo3D.addEventListener('load', () => {
            setupManualRotation(bmwLogo3D, 'bmw', 60);
        });
    }
    
    if (m4Logo3D) {
        m4Logo3D.addEventListener('load', () => {
            setupManualRotation(m4Logo3D, 'm4', 60);
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
            model.style.cursor = 'grabbing';
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
            
            if (type === 'bmw') {
                bmwRotation -= deltaX * 0.01;
                model.setAttribute('camera-orbit', `${bmwRotation}rad ${verticalAngle}deg`);
            } else {
                m4Rotation -= deltaX * 0.01;
                model.setAttribute('camera-orbit', `${m4Rotation}rad ${verticalAngle}deg`);
            }
        }
        
        function dragTouch(e) {
            if (!isDragging || currentModel !== type) return;
            
            const deltaX = e.touches[0].clientX - lastMouseX;
            lastMouseX = e.touches[0].clientX;
            
            if (type === 'bmw') {
                bmwRotation -= deltaX * 0.01;
                model.setAttribute('camera-orbit', `${bmwRotation}rad ${verticalAngle}deg`);
            } else {
                m4Rotation -= deltaX * 0.01;
                model.setAttribute('camera-orbit', `${m4Rotation}rad ${verticalAngle}deg`);
            }
        }
        
        function stopDrag() {
            isDragging = false;
            currentModel = null;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('touchmove', dragTouch);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchend', stopDrag);
            model.style.cursor = 'grab';
        }

        // Set initial cursor
        model.style.cursor = 'grab';
    }

    // Add hover effects to stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('BMW About page loaded with full rotation controls!');
});