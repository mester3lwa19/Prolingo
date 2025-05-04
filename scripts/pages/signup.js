document.addEventListener("DOMContentLoaded", function () {//Waits for the full HTML to load before running the script

  // Form elements
  const form = document.getElementById("signupForm");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const successMessage = document.getElementById("successMessage");

  // Form validation
  form.addEventListener("submit", function (e) {
    e.preventDefault();//Prevents the default page reload when the form is submitted 
    //Runs validation logic
    let isValid = true;

    if (usernameInput.value.length < 4) {
      showError(
        usernameInput,
        "usernameError",
        "Username must be at least 4 characters"
      );
      isValid = false;
    } else {
      hideError(usernameInput, "usernameError");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      showError(emailInput, "emailError", "Please enter a valid email address");
      isValid = false;
    } else {
      hideError(emailInput, "emailError");
    }

    if (passwordInput.value.length < 8) {
      showError(
        passwordInput,
        "passwordError",
        "Password must be at least 8 characters"
      );
      isValid = false;
    } else {
      hideError(passwordInput, "passwordError");
    }

    if (confirmPasswordInput.value !== passwordInput.value) {
      showError(
        confirmPasswordInput,
        "confirmPasswordError",
        "Passwords do not match"
      );
      isValid = false;
    } else {
      hideError(confirmPasswordInput, "confirmPasswordError");
    }

    if (isValid) {
      form.style.display = "none";
      successMessage.style.display = "block";
      setTimeout(() => {
        window.location.href = "/pages/language_selection.html";
      }, 2000);
      // If all fields are valid:
      // Hide the form
      // Show the success message
      // Redirect to another page after 2 seconds
    }
  });

  function showError(input, errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.style.display = "block";
    input.classList.add("error");
  }

  function hideError(input, errorId) {
    const errorElement = document.getElementById(errorId);
    errorElement.style.display = "none";
    input.classList.remove("error");//Hides the error message and removes the red border
  }

  // Social signup interactions
  const googleButton = document.getElementById("googleSignUp");
  const facebookButton = document.getElementById("facebookSignUp");

  if (googleButton) {
    googleButton.addEventListener("click", function () {
      alert("Google Sign Up functionality to be implemented");
    });
  }

  if (facebookButton) {
    facebookButton.addEventListener("click", function () {
      alert("Facebook Sign Up functionality to be implemented");
    });
  }
});
