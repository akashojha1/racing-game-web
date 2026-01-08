const gameArea = document.getElementById("game-area");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

let playerPos = 130;
let score = 0;
let obstacles = [];

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    playerPos -= 20;
    if (playerPos < 0) playerPos = 0;
    player.style.left = playerPos + "px";
  }
  if (e.key === "ArrowRight") {
    playerPos += 20;
    if (playerPos > 260) playerPos = 260; // 300 - 40
    player.style.left = playerPos + "px";
  }
});

// Create obstacle
function createObstacle() {
  const obs = document.createElement("div");
  obs.classList.add("obstacle");
  obs.style.left = Math.floor(Math.random() * 260) + "px";
  obs.style.top = "-40px";
  gameArea.appendChild(obs);
  obstacles.push(obs);
}

// Move obstacles
function moveObstacles() {
  obstacles.forEach((obs, index) => {
    let top = parseInt(obs.style.top);
    top += 5;
    obs.style.top = top + "px";

    // Check collision
    const obsLeft = parseInt(obs.style.left);
    const obsRight = obsLeft + 40;
    const playerLeft = playerPos;
    const playerRight = playerPos + 40;
    if (top + 40 >= 430 && top + 40 <= 500) { // bottom collision
      if (!(obsRight < playerLeft || obsLeft > playerRight)) {
        alert("Game Over! Score: " + score);
        location.reload();
      }
    }

    // Remove obstacle if out of screen
    if (top > 500) {
      gameArea.removeChild(obs);
      obstacles.splice(index, 1);
      score++;
      scoreDisplay.innerText = score;
    }
  });
}

// Game loop
setInterval(() => {
  createObstacle();
}, 1500);

setInterval(() => {
  moveObstacles();
}, 50);
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");

leftBtn.addEventListener("click", () => {
  playerPos -= 20;
  if (playerPos < 0) playerPos = 0;
  player.style.left = playerPos + "px";
});

rightBtn.addEventListener("click", () => {
  playerPos += 20;
  if (playerPos > 260) playerPos = 260;
  player.style.left = playerPos + "px";
});
