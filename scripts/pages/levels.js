document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle

  const menuToggle = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });

  // Level data
  const levels = [
    {
      number: 1,
      category: "html",
      title: "P Tag",
      icon: "../assets/images/material-icon-theme_html.svg",
      progress: 100,
    },
    {
      number: 2,
      category: "html",
      title: "H Tag",
      icon: "../assets/images/material-icon-theme_html.svg",
      progress: 80,
    },
    {
      number: 3,
      category: "html",
      title: "Div Tag",
      icon: "../assets/images/material-icon-theme_html.svg",
      progress: 60,
    },
    {
      number: 4,
      category: "html",
      title: "Span Tag",
      icon: "../assets/images/material-icon-theme_html.svg",
      progress: 40,
    },
    {
      number: 5,
      category: "html",
      title: "Video Tag",
      icon: "../assets/images/material-icon-theme_html.svg",
      progress: 20,
    },
    {
      number: 6,
      category: "css",
      title: "Selectors",
      icon: "../assets/images/css-icon.svg",
      progress: 0,
    },
    {
      number: 7,
      category: "css",
      title: "Box Model",
      icon: "../assets/images/css-icon.svg",
      progress: 0,
    },
    {
      number: 8,
      category: "css",
      title: "Flexbox",
      icon: "../assets/images/css-icon.svg",
      progress: 0,
    },
    {
      number: 9,
      category: "css",
      title: "Grid",
      icon: "../assets/images/css-icon.svg",
      progress: 0,
    },
    {
      number: 10,
      category: "css",
      title: "Animations",
      icon: "../assets/images/css-icon.svg",
      progress: 0,
    },
    {
      number: 11,
      category: "javascript",
      title: "Variables",
      icon: "../assets/images/javascript-logo-svgrepo-com.svg",
      progress: 0,
    },
    {
      number: 12,
      category: "javascript",
      title: "Functions",
      icon: "../assets/images/javascript-logo-svgrepo-com.svg",
      progress: 0,
    },
    {
      number: 13,
      category: "javascript",
      title: "DOM",
      icon: "../assets/images/javascript-logo-svgrepo-com.svg",
      progress: 0,
    },
    {
      number: 14,
      category: "javascript",
      title: "Events",
      icon: "../assets/images/javascript-logo-svgrepo-com.svg",
      progress: 0,
    },
    {
      number: 15,
      category: "javascript",
      title: "Async",
      icon: "../assets/images/javascript-logo-svgrepo-com.svg",
      progress: 0,
    },
  ];

  // DOM elements
  const levelsGrid = document.getElementById("levelsGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Render levels
  function renderLevels(category = "all") {
    levelsGrid.innerHTML = "";

    const filteredLevels =
      category === "all"
        ? levels
        : levels.filter((level) => level.category === category);

    filteredLevels.forEach((level) => {
      const levelCard = document.createElement("div");
      levelCard.className = "level-card";
      levelCard.dataset.category = level.category;

      levelCard.innerHTML = `
                <div class="level-header">
                    <div class="level-number">${level.number}</div>
                    <img src="${level.icon}" alt="${level.category
        }" class="level-icon">
                </div>
                <div class="level-category">${level.category.toUpperCase()}</div>
                <div class="level-title">${level.title}</div>
                <div class="level-progress">
                    <div class="level-progress-bar" style="width: ${level.progress
        }%"></div>
                </div>
            `;

      levelCard.addEventListener("click", function () {
        // Animation when clicking a card
        this.style.animation = "pulse 0.5s";
        setTimeout(() => {
          this.style.animation = "";
        }, 500);

        // In a real app, this would navigate to the lesson
        // alert(`Starting Level ${level.number}: ${level.title}`);
        window.location.href = '/Prolingo/level.html';
      });

      levelsGrid.appendChild(levelCard);
    });
  }

  // Filter levels
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const category = this.dataset.category;
      renderLevels(category);
    });
  });

  // Initialize
  renderLevels();

  // Add hover effects to all buttons
  const buttons = document.querySelectorAll(
    "button, .nav-link, .edit-profile-link"
  );
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      if (this.classList.contains("filter-btn")) return;
      this.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
      if (this.classList.contains("filter-btn")) return;
      this.style.transform = "translateY(0)";
    });
  });

  // Simulate progress updates (for demo purposes)
  setTimeout(() => {
    const progressBars = document.querySelectorAll(".level-progress-bar");
    progressBars.forEach((bar) => {
      const targetWidth = parseInt(bar.style.width);
      let currentWidth = 0;

      const interval = setInterval(() => {
        if (currentWidth >= targetWidth) {
          clearInterval(interval);
          return;
        }
        currentWidth++;
        bar.style.width = `${currentWidth}%`;
      }, 20);
    });
  }, 500);
});
