fetch("/scripts/components/user.json")
  .then((response) => response.json())
  .then((data) => {
    const user = data.user;

    document.querySelector(
      ".welcome-text h1"
    ).innerText = `Welcome back, ${user.name}!!`;
    document.querySelector(
      ".welcome-text p"
    ).innerText = `Level ${user.level} Progress`;
    document.getElementById("progressFill").style.width = user.progress + "%";
    document.querySelector(".daily-task").innerText = "🔥 " + user.dailyTask;
    document.getElementById("totalXP").innerText = user.xp;

    document.getElementById("questFill").style.width =
      user.dailyQuestProgress + "%";

    const profileStats = document.querySelector(".profile-stats");
    profileStats.innerHTML = `
      <h4>User Profile Stats</h4>
      <p>Total XP: <span id="totalXP">${user.xp}</span></p>
      <p>Total Active Days: ${user.activeDays}</p>
      <p>Languages Enrolled: ${user.languagesEnrolled}</p>
      <p>Lessons Completed: ${user.lessonsCompleted}</p>
    `;

    const continueLearning = document.querySelector(".continue-learning ul");
    continueLearning.innerHTML = "";
    user.continueLearning.forEach((lesson) => {
      const li = document.createElement("li");
      li.innerText = lesson + " ➔";
      continueLearning.appendChild(li);
    });

    const streakGrid = document.getElementById("streakGrid");
    streakGrid.innerHTML = "";

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const startDay = new Date(year, month, 1).getDay();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Add day names
    dayNames.forEach((day) => {
      const dayHeader = document.createElement("div");
      dayHeader.classList.add("day-name");
      dayHeader.innerText = day;
      streakGrid.appendChild(dayHeader);
    });

    // Empty slots before the first day
    for (let i = 0; i < (startDay === 0 ? 6 : startDay - 1); i++) {
      const emptyCell = document.createElement("div");
      emptyCell.classList.add("day");
      streakGrid.appendChild(emptyCell);
    }

    // Fill calendar days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;

      const dayCell = document.createElement("div");
      dayCell.classList.add("day");

      if (user.streakDates.includes(dateStr)) {
        dayCell.classList.add("streak");
      }

      if (today.getDate() === day) {
        dayCell.classList.add("today");
      }

      streakGrid.appendChild(dayCell);
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });
});
