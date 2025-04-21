// Mobile menu functionality
const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

if (hamburger && sidebar && closeSidebar) {
    hamburger.addEventListener("click", () => {
        sidebar.classList.add("open");
    });

    closeSidebar.addEventListener("click", () => {
        sidebar.classList.remove("open");
    });
}

// Add animation class to header
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    if (header) {
        header.classList.add('animate__animated', 'animate__fadeInDown');
    }
});