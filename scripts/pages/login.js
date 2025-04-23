document.addEventListener("DOMContentLoaded", function () {
  // Form elements
  const form = document.getElementById("signinForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const successMessage = document.getElementById("successMessage");

  // Form validation
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      showError(
        emailInput,
        "emailError",
        "Please enter a valid email address"
      );
      isValid = false;
    } else {
      hideError(emailInput, "emailError");
    }

    if (passwordInput.value.length === 0) {
      showError(
        passwordInput,
        "passwordError",
        "Password is required"
      );
      isValid = false;
    } else {
      hideError(passwordInput, "passwordError");
    }

    if (isValid) {
      form.style.display = "none";
      successMessage.style.display = "block";
      setTimeout(() => {
        window.location.href = "/pages/dashboard.html";
      }, 2000);
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
    input.classList.remove("error");
  }

  // Social signin interactions
  const googleButton = document.getElementById("googleSignIn");
  const facebookButton = document.getElementById("facebookSignIn");

  if (googleButton) {
    googleButton.addEventListener("click", function () {
      alert("Google Sign In functionality to be implemented");
    });
  }

  if (facebookButton) {
    facebookButton.addEventListener("click", function () {
      alert("Facebook Sign In functionality to be implemented");
    });
  }
});