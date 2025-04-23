document.addEventListener("DOMContentLoaded", function () {
    // Language data
    const languages = [
        { name: "JavaScript", icon: "../assets/images/javascript-logo-svgrepo-com.svg" },
        { name: "HTML", icon: "../assets/images/HTML.svg" },
        { name: "CSS", icon: "../assets/images/css-icon.svg" },
        { name: "React JS", icon: "../assets/images/vscode-icons_file-type-reactjs.svg" },
        { name: "Ruby", icon: "../assets/images/devicon_ruby.svg" },
        { name: "Typescript", icon: "../assets/images/material-icon-theme_typescript.svg" },
        { name: "C", icon: "../assets/images/icons8-c-programming.svg" },
        { name: "C++", icon: "../assets/images/icons8-c++.svg" },
        { name: "C#", icon: "../assets/images/c_sharp.svg" },
        { name: "Kotlin", icon: "../assets/images/devicon_kotlin.svg" },
        { name: "Java", icon: "../assets/images/devicon_java.svg" },
        { name: "Dart", icon: "../assets/images/logos_dart.svg" }
    ];

    // DOM elements
    const languageGrid = document.getElementById("languageGrid");
    const skillForm = document.getElementById("skillForm");
    const saveButton = document.getElementById("savePreferences");
    let selectedLanguage = null;

    // Add search functionality
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container";
    searchContainer.innerHTML = `
        <input type="text" id="languageSearch" placeholder="Search languages..." 
               aria-label="Search programming languages">
        <div class="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
        </div>
    `;

    // Insert search before language grid
    languageGrid.parentNode.insertBefore(searchContainer, languageGrid);

    // Add search functionality
    const searchInput = document.getElementById("languageSearch");
    searchInput.addEventListener("input", function () {
        const searchTerm = this.value.toLowerCase();
        filterLanguages(searchTerm);
    });

    // Render language cards with improved accessibility
    function renderLanguageCards() {
        languageGrid.innerHTML = "";

        languages.forEach((lang, index) => {
            const card = document.createElement("div");
            card.className = "language-card";
            card.dataset.lang = lang.name;
            card.setAttribute("role", "option");
            card.setAttribute("aria-selected", "false");
            card.setAttribute("tabindex", "0"); // Make focusable

            // Check if this language was previously selected
            const savedLanguage = localStorage.getItem('prolingoLanguage');
            if (savedLanguage === lang.name) {
                card.classList.add("selected");
                card.setAttribute("aria-selected", "true");
                selectedLanguage = lang.name;
            }

            card.innerHTML = `
                <img src="${lang.icon}" alt="" aria-hidden="true">
                <span id="lang-name-${index}">${lang.name}</span>
            `;

            // Make card accessible
            card.setAttribute("aria-labelledby", `lang-name-${index}`);

            // Add event listeners for mouse and keyboard
            card.addEventListener("click", () => selectLanguage(card, lang.name));
            card.addEventListener("keydown", function (e) {
                // Select on Enter or Space
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectLanguage(card, lang.name);
                }
            });

            languageGrid.appendChild(card);
        });
    }

    // Extract language selection logic to reuse
    function selectLanguage(card, langName) {
        // Remove selected class from all cards
        document.querySelectorAll(".language-card").forEach(c => {
            c.classList.remove("selected");
            c.setAttribute("aria-selected", "false");
        });

        // Add selected class to clicked card
        card.classList.add("selected");
        card.setAttribute("aria-selected", "true");
        selectedLanguage = langName;

        // Clear any error messages
        clearErrorMessages();
    }

    // Filter languages based on search
    function filterLanguages(searchTerm) {
        const cards = document.querySelectorAll(".language-card");
        let hasVisibleCards = false;

        cards.forEach(card => {
            const langName = card.dataset.lang.toLowerCase();
            if (langName.includes(searchTerm)) {
                card.style.display = "";
                hasVisibleCards = true;
            } else {
                card.style.display = "none";
            }
        });

        // Show message if no results
        let noResultsMsg = document.getElementById("noResultsMessage");
        if (!hasVisibleCards) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement("div");
                noResultsMsg.id = "noResultsMessage";
                noResultsMsg.className = "no-results";
                noResultsMsg.textContent = "No languages match your search";
                languageGrid.parentNode.insertBefore(noResultsMsg, languageGrid.nextSibling);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    // Form validation and submission
    saveButton.addEventListener("click", function (e) {
        e.preventDefault();

        // Clear previous error messages
        clearErrorMessages();

        const skillLevel = document.querySelector('input[name="skill-level"]:checked');

        if (!skillLevel) {
            displayErrorMessage("skill-level-container", "Please select your skill level");
            return;
        }

        if (!selectedLanguage) {
            displayErrorMessage("languageGrid", "Please select a programming language");
            return;
        }

        // In a real app, you would save these preferences to database/API
        saveUserPreferences(skillLevel.value, selectedLanguage);

        // Show success message and redirect
        showSuccessMessage("Preferences saved successfully!");

        // Redirect after a short delay
        setTimeout(() => {
            // window.location.href = "../pages/dashboard.html";
            console.log("Would redirect to dashboard");
        }, 2000);
    });

    // Helper functions for form validation
    function displayErrorMessage(containerId, message) {
        const container = document.getElementById(containerId);

        // Create error element if it doesn't exist
        let errorDiv = container.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            container.appendChild(errorDiv);
        }

        // Display message with animation
        errorDiv.textContent = message;
        errorDiv.style.animation = 'fadeIn 0.3s forwards';
    }

    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(elem => elem.remove());
    }

    function showSuccessMessage(message) {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    function saveUserPreferences(skillLevel, language) {
        // Save to localStorage for persistence
        localStorage.setItem('prolingoSkillLevel', skillLevel);
        localStorage.setItem('prolingoLanguage', language);

        console.log("Skill Level:", skillLevel);
        console.log("Selected Language:", language);
    }

    // Load previous selections
    function loadSavedPreferences() {
        const savedSkillLevel = localStorage.getItem('prolingoSkillLevel');
        if (savedSkillLevel) {
            const radioButton = document.querySelector(`input[name="skill-level"][value="${savedSkillLevel}"]`);
            if (radioButton) radioButton.checked = true;
        }
    }

    // Initialize
    renderLanguageCards();
    loadSavedPreferences();

    // Move hover effects to CSS instead of JS
    const buttons = document.querySelectorAll("button, .nav-link, .edit-profile-link");
    buttons.forEach(button => {
        button.classList.add("hover-effect");
    });
});