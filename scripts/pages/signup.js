document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const form = document.getElementById('signupForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const successMessage = document.getElementById('successMessage');
    
    // Toggle password visibility
    togglePassword.addEventListener('click', function() {
        togglePasswordVisibility(passwordInput, this);
    });
    
    toggleConfirmPassword.addEventListener('click', function() {
        togglePasswordVisibility(confirmPasswordInput, this);
    });
    
    function togglePasswordVisibility(input, button) {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        
        // Change icon based on password visibility
        const iconPath = type === 'password' ? 
            '../assets/images/si_lock-line.svg' : 
            '../assets/images/si_eye-line.svg';
        
        button.innerHTML = `<img src="${iconPath}" alt="Toggle password visibility">`;
    }
    
    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate username
        if (usernameInput.value.length < 4) {
            showError(usernameInput, 'usernameError', 'Username must be at least 4 characters');
            isValid = false;
        } else {
            hideError(usernameInput, 'usernameError');
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            showError(emailInput, 'emailError', 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError(emailInput, 'emailError');
        }
        
        // Validate password
        if (passwordInput.value.length < 8) {
            showError(passwordInput, 'passwordError', 'Password must be at least 8 characters');
            isValid = false;
        } else {
            hideError(passwordInput, 'passwordError');
        }
        
        // Validate password match
        if (passwordInput.value !== confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'confirmPasswordError', 'Passwords do not match');
            isValid = false;
        } else {
            hideError(confirmPasswordInput, 'confirmPasswordError');
        }
        
        if (isValid) {
            // Simulate form submission
            form.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Simulate redirect after 2 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        }
    });
    
    function showError(input, errorId, message) {
        const errorElement = document.getElementById(errorId);
        input.classList.add('error');
        input.classList.remove('success');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    function hideError(input, errorId) {
        const errorElement = document.getElementById(errorId);
        input.classList.remove('error');
        input.classList.add('success');
        errorElement.style.display = 'none';
    }
    
    // Social sign up buttons
    document.getElementById('googleSignUp').addEventListener('click', function() {
        alert('Redirecting to Google sign up...');
    });
    
    document.getElementById('facebookSignUp').addEventListener('click', function() {
        alert('Redirecting to Facebook sign up...');
    });
    
    // Add hover effects to all buttons
    const buttons = document.querySelectorAll('button, .btn, .social-signup-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});