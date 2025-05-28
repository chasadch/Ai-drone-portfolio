// Contact Form Validation and Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const serviceSelect = document.getElementById('service');
    const submitButton = document.querySelector('.contact-form button[type="submit"]');
    
    // Add floating label effect
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        // Initial check for pre-filled inputs
        checkInputValue(input);
        
        // Add event listeners
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            checkInputValue(input);
        });
        
        input.addEventListener('input', () => {
            validateInput(input);
        });
    });
    
    // Check if input has value
    function checkInputValue(input) {
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('has-value');
        } else {
            input.parentElement.classList.remove('has-value');
            input.parentElement.classList.remove('focused');
        }
    }
    
    // Validate form inputs
    function validateInput(input) {
        const inputType = input.getAttribute('type');
        const inputId = input.getAttribute('id');
        const errorElement = input.parentElement.querySelector('.error-message');
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error styles
        input.classList.remove('invalid');
        
        // Clear existing error message
        if (errorElement) {
            errorElement.remove();
        }
        
        // Validate based on input type
        if (inputId === 'name' && input.value.trim() === '') {
            isValid = false;
            errorMessage = 'Please enter your name';
        } else if (inputId === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value) && input.value.trim() !== '') {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        } else if (inputId === 'phone' && input.value.trim() !== '') {
            const phonePattern = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
            if (!phonePattern.test(input.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        } else if (inputId === 'message' && input.value.trim() === '') {
            isValid = false;
            errorMessage = 'Please enter your message';
        }
        
        // Add error message if not valid
        if (!isValid) {
            input.classList.add('invalid');
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = errorMessage;
            input.parentElement.appendChild(error);
        }
        
        return isValid;
    }
    
    // Validate all inputs
    function validateForm() {
        let isFormValid = true;
        
        formInputs.forEach(input => {
            if (input.id === 'name' || input.id === 'email' || input.id === 'message') {
                const isInputValid = validateInput(input);
                if (!isInputValid) {
                    isFormValid = false;
                }
            }
        });
        
        return isFormValid;
    }
    
    // Add character counter for message
    if (messageInput) {
        const maxLength = messageInput.getAttribute('maxlength') || 500;
        
        // Create character counter element
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.textContent = `0/${maxLength}`;
        messageInput.parentElement.appendChild(charCounter);
        
        // Update character counter
        messageInput.addEventListener('input', () => {
            const currentLength = messageInput.value.length;
            charCounter.textContent = `${currentLength}/${maxLength}`;
            
            // Change color when approaching limit
            if (currentLength > maxLength * 0.8) {
                charCounter.style.color = '#ff9800';
            } else {
                charCounter.style.color = '';
            }
        });
    }
    
    // Handle form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const isValid = validateForm();
        
        if (isValid) {
            // Show loading state
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            submitButton.innerHTML = '<span class="spinner"></span> Sending...';
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Reset form styles
                formInputs.forEach(input => {
                    input.parentElement.classList.remove('has-value');
                    input.parentElement.classList.remove('focused');
                });
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Your message has been sent successfully! We\'ll get back to you soon.';
                contactForm.appendChild(successMessage);
                
                // Reset button
                submitButton.disabled = false;
                submitButton.classList.remove('loading');
                submitButton.textContent = 'Message Sent';
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                        submitButton.textContent = 'Send Message';
                    }, 500);
                }, 5000);
            }, 2000);
        }
    });
    
    // Add service selector interactivity
    if (serviceSelect) {
        // Create custom styled select
        const customSelect = document.createElement('div');
        customSelect.className = 'custom-select';
        
        const selectedOption = document.createElement('div');
        selectedOption.className = 'selected-option';
        selectedOption.textContent = serviceSelect.options[serviceSelect.selectedIndex].text;
        
        const optionsList = document.createElement('div');
        optionsList.className = 'options-list';
        
        // Add options
        Array.from(serviceSelect.options).forEach(option => {
            const customOption = document.createElement('div');
            customOption.className = 'option';
            customOption.textContent = option.text;
            customOption.dataset.value = option.value;
            
            customOption.addEventListener('click', () => {
                selectedOption.textContent = option.text;
                serviceSelect.value = option.value;
                optionsList.classList.remove('show');
                customSelect.classList.remove('open');
            });
            
            optionsList.appendChild(customOption);
        });
        
        // Toggle options list
        selectedOption.addEventListener('click', () => {
            customSelect.classList.toggle('open');
            optionsList.classList.toggle('show');
        });
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!customSelect.contains(e.target)) {
                optionsList.classList.remove('show');
                customSelect.classList.remove('open');
            }
        });
        
        // Add to DOM
        customSelect.appendChild(selectedOption);
        customSelect.appendChild(optionsList);
        
        // Replace original select
        serviceSelect.parentElement.appendChild(customSelect);
        serviceSelect.style.display = 'none';
    }
});
