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
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  if (header) {
    header.classList.add("animate__animated", "animate__fadeInDown");
  }
});
// Get the button:
let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
const navBar = document.querySelector(".navbar");

const offset = 50;

window.addEventListener("scroll", () => {
  if (window.scrollY >= offset) {
    navBar.style.backgroundColor = "#254446";
    navBar.style.transition = "background-color 0.3s ease-in-out";
    navBar.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    navBar.style.borderBottom = "1px solid #EEEEEE";
  } else {
    navBar.style.backgroundColor = "transparent";
    navBar.style.borderBottom = "none";
    navBar.style.boxShadow = "none";}
});
