document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle

  const menuToggle = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });
});
