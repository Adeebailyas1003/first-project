// Form validation and functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.registration-form');
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Registration submitted successfully!';
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = 'Please fill in all required fields.';
    
    // Insert messages after the form title
    const title = document.querySelector('h1');
    title.parentNode.insertBefore(successMessage, title.nextSibling);
    title.parentNode.insertBefore(errorMessage, successMessage.nextSibling);
    
    // Set today's date as default for date field
    const dateField = document.getElementById('applyDate');
    const today = new Date().toISOString().split('T')[0];
    dateField.value = today;
    
    // User Info Display functionality
    const fullNameInput = document.getElementById('fullName');
    const courseSelect = document.getElementById('course');
    const userInfoSection = document.getElementById('userInfoSection');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const userCourseDisplay = document.getElementById('userCourseDisplay');
    const formContainer = document.querySelector('.form-container');
    
    // Handle name input for user info display
    fullNameInput.addEventListener('input', function() {
        const name = this.value.trim();
        
        if (name.length > 0) {
            // Get first name
            const firstName = name.split(' ')[0];
            
            // Show user info section
            userInfoSection.style.display = 'block';
            
            // Display user name
            userNameDisplay.textContent = firstName;
            
            // Move form to the right
            formContainer.classList.add('move-right');
            
            // Add a small delay for smooth transition
            setTimeout(() => {
                userInfoSection.style.animation = 'slideInInfo 1s ease-out forwards';
            }, 100);
            
        } else {
            // Hide user info section
            userInfoSection.style.display = 'none';
            
            // Clear user name
            userNameDisplay.textContent = '';
            userCourseDisplay.textContent = '';
            
            // Move form back to center
            formContainer.classList.remove('move-right');
        }
    });
    
    // Handle course selection
    courseSelect.addEventListener('change', function() {
        const selectedCourse = this.value;
        const name = fullNameInput.value.trim();
        
        if (selectedCourse && name.length > 0) {
            // Update course display
            userCourseDisplay.textContent = selectedCourse;
            
            // Show user info section if not already visible
            if (userInfoSection.style.display === 'none') {
                userInfoSection.style.display = 'block';
                formContainer.classList.add('move-right');
                
                setTimeout(() => {
                    userInfoSection.style.animation = 'slideInInfo 1s ease-out forwards';
                }, 100);
            }
        } else if (!selectedCourse) {
            // Clear course display
            userCourseDisplay.textContent = '';
        }
    });
    
    // Form submission handling
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide previous messages
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
        
        // Basic validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#dc3545';
            } else {
                field.style.borderColor = '#e1e5e9';
            }
        });
        
        // Email validation
        const emailField = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField.value && !emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.style.borderColor = '#dc3545';
            errorMessage.textContent = 'Please enter a valid email address.';
        }
        
        if (isValid) {
            successMessage.style.display = 'block';
            form.reset();
            dateField.value = today; // Reset date to today
            
            // Hide user info section
            userInfoSection.style.display = 'none';
            userNameDisplay.textContent = '';
            userCourseDisplay.textContent = '';
            formContainer.classList.remove('move-right');
            
            // Scroll to top to show success message
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        } else {
            errorMessage.style.display = 'block';
            
            // Scroll to first error field
            const firstErrorField = form.querySelector('[style*="border-color: rgb(220, 53, 69)"]');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '#e1e5e9';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(220, 53, 69)') {
                this.style.borderColor = '#e1e5e9';
            }
        });
    });
    
    // Phone number formatting
    const phoneField = document.getElementById('phone');
    phoneField.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
        e.target.value = value;
    });
    
    // Course selection change handler
    const courseField = document.getElementById('course');
    courseField.addEventListener('change', function() {
        if (this.value) {
            this.style.borderColor = '#28a745';
            setTimeout(() => {
                this.style.borderColor = '#e1e5e9';
            }, 1000);
        }
    });
    
    // Add loading state to submit button
    const submitBtn = document.querySelector('.btn-primary');
    submitBtn.addEventListener('click', function() {
        if (form.checkValidity()) {
            this.textContent = 'Submitting...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Submit Registration';
                this.disabled = false;
            }, 2000);
        }
    });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add focus effects to form elements
    const formElements = document.querySelectorAll('input, select, textarea');
    
    formElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        element.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}); 