document.addEventListener("DOMContentLoaded", function () {
    // Form elements
    const loginForm = document.getElementById("loginForm");
    const emailUsernameInput = document.getElementById("email-username");
    const passwordInput = document.getElementById("password");
  
    // Social buttons
    const googleButton = document.getElementById("googleLogIn");
    const facebookButton = document.getElementById("facebookLogIn");
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  
    const usernameRegex = /^[a-zA-Z0-9_]{4,}$/;


    // Form validation
   loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;
  
    // Remove previous errors
    clearErrors();
  
    const value = emailUsernameInput.value.trim();
  
    // Email or Username Validation
    if (value === "") {
      showError(emailUsernameInput, "emailUsernameError", "This field is required");
      isValid = false;
    } else if (!emailRegex.test(value) && !usernameRegex.test(value)) {
      showError(emailUsernameInput, "emailUsernameError", "Enter a valid email or username (min 4 characters)");
      isValid = false;
    }
  
    // Password validation
    if (passwordInput.value.trim().length < 8) {
      showError(passwordInput, "passwordError", "Password must be at least 8 characters");
      isValid = false;
    }
  
    if (isValid) {
      // Simulate successful login
      alert("Login successful!");
      // Redirect to desired page
      setTimeout(() => {
        window.location.href = "/learderboard.html";
      }, 1000);
    }
  });
  
  
    // Show and clear error helpers
    function showError(input, errorId, message) {
      let error = document.getElementById(errorId);
      if (!error) {
        error = document.createElement("div");
        error.id = errorId;
        error.style.color = "var(--error-color)";
        error.style.fontSize = "14px";
        error.style.marginTop = "6px";
        input.parentNode.appendChild(error);
      }
      error.textContent = message;
      input.classList.add("error");
    }
  
    function clearErrors() {
      document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
      document.querySelectorAll("[id$='Error']").forEach(el => el.remove());
    }
  
    // Social login placeholder alerts
    if (googleButton) {
      googleButton.addEventListener("click", function () {
        alert("Google Login functionality to be implemented");
      });
    }
  
    if (facebookButton) {
      facebookButton.addEventListener("click", function () {
        alert("Facebook Login functionality to be implemented");
      });
    }
  });
  