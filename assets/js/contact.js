// Contact page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const businessCardModel = document.getElementById('businessCardModel');
    
    // Start rotation at 180deg horizontal, 90deg vertical
    let horizontalRotation = 3.7; 
    let verticalRotation = 1.57;   // 90 degrees in radians
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;

    // Contact Form Handling
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = contactForm.querySelectorAll('input[required]');
            let valid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.style.borderColor = '#ff4444';
                } else {
                    input.style.borderColor = '#2ea38a';
                }
            });
            
            if (!valid) {
                alert('Please fill in all required fields.');
                return;
            }
            
            const submitBtn = contactForm.querySelector('.contact-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you! Your message has been sent. We\'ll contact you soon.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Business Card model loading handlers
    if (businessCardModel) {
        // Model loaded successfully - setup rotation
        businessCardModel.addEventListener('load', () => {
            console.log('✅ Business card model loaded successfully!');
            // Set initial position to 180deg horizontal, 90deg vertical
            businessCardModel.setAttribute('camera-orbit', `${horizontalRotation}rad ${verticalRotation}rad`);
            setupManualRotation();
        });
    }

    function setupManualRotation() {
        if (!businessCardModel) return;

        businessCardModel.addEventListener('mousedown', startDrag);
        businessCardModel.addEventListener('touchstart', startDragTouch);
        
        // Add cursor style
        businessCardModel.style.cursor = 'grab';
    }

    function startDrag(e) {
        isDragging = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
        businessCardModel.style.cursor = 'grabbing';
        e.preventDefault();
    }
    
    function startDragTouch(e) {
        isDragging = true;
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
        document.addEventListener('touchmove', dragTouch);
        document.addEventListener('touchend', stopDrag);
        e.preventDefault();
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        
        // Only rotate horizontally (remove vertical rotation for stability)
        horizontalRotation -= deltaX * 0.01;
        
        // Keep vertical angle fixed at 90 degrees (1.57 radians)
        businessCardModel.setAttribute('camera-orbit', `${horizontalRotation}rad 1.57rad`);
        e.preventDefault();
    }
    
    function dragTouch(e) {
        if (!isDragging) return;
        
        const deltaX = e.touches[0].clientX - lastMouseX;
        lastMouseX = e.touches[0].clientX;
        
        // Only rotate horizontally
        horizontalRotation -= deltaX * 0.01;
        
        // Keep vertical angle fixed at 90 degrees (1.57 radians)
        businessCardModel.setAttribute('camera-orbit', `${horizontalRotation}rad 1.57rad`);
        e.preventDefault();
    }
    
    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', dragTouch);
        document.removeEventListener('mouseup', stopDrag);
        document.removeEventListener('touchend', stopDrag);
        businessCardModel.style.cursor = 'grab';
    }
    
    console.log('Contact page initialized successfully!');
});