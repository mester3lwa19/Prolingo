document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuToggle = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active");
  });

  // leaderboard.js
  const leaderboard = [
    { name: "Malak Amr", score: 4050, sign: 7 },
    { name: "Mariam Islam", score: 3500, sign: 9 },
    { name: "Fayrouz Tarek", score: 5000, sign: 8 },
    { name: "Karim Wael", score: 4500, sign: 5 },
    { name: "Ali Khaled", score: 5075, sign: 6 },
    
  ];

  // Sort by score descending
  leaderboard.sort((a, b) => b.score - a.score);

  // Assign new ranks based on sorted order
  leaderboard.forEach((user, index) => {
    user.rank = index + 1;
  });

  const container = document.querySelector('.lead-container');
  container.innerHTML = ''; // Clear previous content

  leaderboard.forEach((user, index) => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('one-to-ten');
    userDiv.innerHTML = `
      <div class="num-name">
        <div class="left-num">
          <div class="img-container">
            <img src="/assets/images/${getRankIcon(index)}.svg" class="img" alt="rank-icon">
            <p class="${index < 3 ? 'first-3-nums' : 'remaining-nums'}">${user.rank}</p>
          </div>
        </div>
        <div class="avatar-name">
          <div class="avatar">
            <div class="avatar-badge-wrapper">
              <img src="/assets/images/User.svg" class="avatar-img" alt="avatar">
              <span class="badge">${user.sign}</span>
            </div>
          </div>
          <p class="name">${user.name}</p>
        </div>
      </div>
      <p class="right-num">${user.score}</p>
    `;
    container.appendChild(userDiv);
  });

  function getRankIcon(index) {
    if (index === 0) return 'Vector';
    if (index === 1) return 'Vector (2)';
    if (index === 2) return 'last';
    return 'remaining-nums';
  }
});
