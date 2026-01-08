const gameArea = document.getElementById("game-area");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");

let playerPos = 130;
let score = 0;
let obstacles = [];
let gameOver = false;

/* ================= PLAYER MOVE ================= */
function moveLeft() {
  if (gameOver) return;
  playerPos -= 25;
  if (playerPos < 0) playerPos = 0;
  player.style.left = playerPos + "px";
}

function moveRight() {
  if (gameOver) return;
  playerPos += 25;
  if (playerPos > 260) playerPos = 260;
  player.style.left = playerPos + "px";
}

/* ================= KEYBOARD ================= */
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
});

/* ================= MOBILE + PC (POINTER EVENTS) ================= */
leftBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  moveLeft();
});

rightBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  moveRight();
});

/* ================= OBSTACLES ================= */
function createObstacle() {
  if (gameOver) return;

  const obs = document.createElement("div");
  obs.className = "obstacle";
  obs.style.left = Math.floor(Math.random() * 260) + "px";
  obs.style.top = "-40px";

  gameArea.appendChild(obs);
  obstacles.push(obs);
}

function moveObstacles() {
  if (gameOver) return;

  obstacles.forEach((obs, i) => {
    let top = parseInt(obs.style.top);
    top += 6;
    obs.style.top = top + "px";

    const obsLeft = parseInt(obs.style.left);
    const obsRight = obsLeft + 40;
    const playerLeft = playerPos;
    const playerRight = playerPos + 40;

    // Collision
    if (top + 40 > 430 && top < 500) {
      if (!(obsRight < playerLeft || obsLeft > playerRight)) {
        endGame();
      }
    }

    // Remove
    if (top > 500) {
      obs.remove();
      obstacles.splice(i, 1);
      score++;
      scoreDisplay.innerText = score;
    }
  });
}

/* ================= END GAME ================= */
function endGame() {
  gameOver = true;
  alert("Game Over 🚗\nScore: " + score);
  location.reload();
}

/* ================= LOOPS ================= */
setInterval(createObstacle, 1200);
setInterval(moveObstacles, 40);
