const player = document.getElementById("player");
const gameArea = document.querySelector(".game-area");
const scoreEl = document.getElementById("score");

let playerX = 130;
let score = 0;
let gameOver = false;

// Move functions
function moveLeft() {
  if (playerX > 0) {
    playerX -= 20;
    player.style.left = playerX + "px";
  }
}

function moveRight() {
  if (playerX < 260) {
    playerX += 20;
    player.style.left = playerX + "px";
  }
}

// Keyboard controls
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
});

// Mobile buttons
document.getElementById("leftBtn").addEventListener("click", moveLeft);
document.getElementById("rightBtn").addEventListener("click", moveRight);

// Create obstacles
function createObstacle() {
  if (gameOver) return;

  const obs = document.createElement("div");
  obs.className = "obstacle";
  obs.style.left = Math.floor(Math.random() * 260) + "px";
  gameArea.appendChild(obs);

  let obsTop = -40;

  const fall = setInterval(() => {
    if (gameOver) {
      clearInterval(fall);
      return;
    }

    obsTop += 5;
    obs.style.top = obsTop + "px";

    // Collision
    if (
      obsTop > 420 &&
      obsTop < 480 &&
      Math.abs(playerX - parseInt(obs.style.left)) < 40
    ) {
      alert("Game Over! Score: " + score);
      gameOver = true;
      location.reload();
    }

    // Remove obstacle
    if (obsTop > 500) {
      obs.remove();
      clearInterval(fall);
      score++;
      scoreEl.innerText = score;
    }
  }, 30);
}

// Start game
setInterval(createObstacle, 1500);
