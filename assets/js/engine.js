// Heart page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const engineModel = document.getElementById('engineModel');
    
    // Start rotation at 180deg (3.14 radians) to match your starting position
    let engineRotation = 3.14; // 180 degrees in radians
    let isDragging = false;
    let lastMouseX = 0;

    // Engine model loading handlers
    if (engineModel) {
        // Show loading progress
        engineModel.addEventListener('progress', (event) => {
            const progress = Math.round(event.detail.totalProgress * 100);
            console.log(`Engine loading: ${progress}%`);
        });
        
        // Model loaded successfully - setup rotation
        engineModel.addEventListener('load', () => {
            console.log('✅ Engine model loaded successfully!');
            setupManualRotation();
        });
        
        // Handle errors
        engineModel.addEventListener('error', (event) => {
            console.error('❌ Error loading engine model:', event.detail);
            
            // Fallback
            const engineContainer = document.querySelector('.heart-engine');
            if (engineContainer) {
                engineContainer.innerHTML = `
                    <div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#f0f0f0; border-radius:15px;">
                        <p style="color:#666; font-size:18px;">Engine Model Loading...</p>
                    </div>
                `;
            }
        });
    }

    function setupManualRotation() {
        if (!engineModel) return;

        engineModel.addEventListener('mousedown', startDrag);
        engineModel.addEventListener('touchstart', startDragTouch);
        
        // Add cursor style
        engineModel.style.cursor = 'grab';
    }

    function startDrag(e) {
        isDragging = true;
        lastMouseX = e.clientX;
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
        engineModel.style.cursor = 'grabbing';
    }
    
    function startDragTouch(e) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        document.addEventListener('touchmove', dragTouch);
        document.addEventListener('touchend', stopDrag);
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - lastMouseX;
        lastMouseX = e.clientX;
        
        engineRotation -= deltaX * 0.01;
        // PRESERVE 75deg VERTICAL ANGLE
        engineModel.setAttribute('camera-orbit', `${engineRotation}rad 75deg`);
    }
    
    function dragTouch(e) {
        if (!isDragging) return;
        
        const deltaX = e.touches[0].clientX - lastMouseX;
        lastMouseX = e.touches[0].clientX;
        
        engineRotation -= deltaX * 0.01;
        engineModel.setAttribute('camera-orbit', `${engineRotation}rad 75deg`);
    }
    
    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', dragTouch);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
        engineModel.style.cursor = 'grab';
    }

    // Add hover effects to spec boxes
    const specBoxes = document.querySelectorAll('.spec-box');
    specBoxes.forEach(box => {
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    console.log('Heart page initialized successfully!');
});