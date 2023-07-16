// Game variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const paddleWidth = 100;
const paddleHeight = 10;
const paddleSpeed = 5;
const brickRowCount = Math.floor(Math.random() * 5) + 2; // Random number of rows (2-6)
const brickColumnCount = Math.floor(Math.random() * 5) + 3; // Random number of columns (3-7)
const brickWidth = 50;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 50;
const brickOffsetLeft =
  (canvas.width - (brickWidth + brickPadding) * brickColumnCount) / 2;
const obstacleWidth = 80;
const obstacleHeight = 10;
const obstacleColor = "#FF0000";
const obstacleOffsetTop = canvas.height / 2 - obstacleHeight / 2;
const totalLevels = 10;
let paddleX = (canvas.width - paddleWidth) / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballSpeedX = 4; // Increase ball speed
let ballSpeedY = -4; // Increase ball speed
let score = 0;
let lives = 3;
let level = 1;
let gameRunning = true;
let obstacles = [];

// Event listeners for paddle movement
document.addEventListener("keydown", movePaddle);
document.addEventListener("keyup", stopPaddle);

// Move paddle left or right
let rightPressed = false;
let leftPressed = false;

function movePaddle(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function stopPaddle(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

// Create the bricks
const bricks = Array.from({ length: brickColumnCount }, (_, c) =>
  Array.from({ length: brickRowCount }, (_, r) => ({
    x: c * (brickWidth + brickPadding) + brickOffsetLeft,
    y: r * (brickHeight + brickPadding) + brickOffsetTop,
    status: 1,
    color: getRandomColor(),
  }))
);

// Generate random obstacles
function generateObstacles() {
  obstacles = Array.from({ length: level + 2 }, () => ({
    x: Math.random() * (canvas.width - obstacleWidth),
    y: Math.random() * (canvas.height / 2 - obstacleHeight),
  }));
}

// Get a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Update game logic
function updateGame() {
  if (gameRunning) {
    // Move the paddle
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
      paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= paddleSpeed;
    }

    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with walls
    if (ballX + ballSpeedX > canvas.width || ballX + ballSpeedX < 0) {
      ballSpeedX = -ballSpeedX;
    }
    if (ballY + ballSpeedY < 0) {
      ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddle
    if (
      ballY + ballSpeedY > canvas.height - paddleHeight &&
      ballX + ballSpeedX > paddleX &&
      ballX + ballSpeedX < paddleX + paddleWidth
    ) {
      ballSpeedY = -ballSpeedY;
    }

    // Ball collision with bricks
    bricks.forEach((column) => {
      column.forEach((brick) => {
        if (brick.status === 1) {
          if (
            ballX > brick.x &&
            ballX < brick.x + brickWidth &&
            ballY > brick.y &&
            ballY < brick.y + brickHeight
          ) {
            ballSpeedY = -ballSpeedY;
            brick.status = 0;
            score += level * 10;
            if (score === brickRowCount * brickColumnCount * level * 10) {
              if (level === totalLevels) {
                updateHighScores(score);
                gameRunning = false;
                showRestartButton();
                alert("Congratulations! You completed all levels!");
              } else {
                level++;
                ballSpeedX += 1; // Increase ball speed
                ballSpeedY -= 1; // Increase ball speed
                resetGame();
                resetBall();
                generateObstacles();
                alert("Congratulations! Level " + level + " completed!");
              }
            }
          }
        }
      });
    });

    // Ball collision with obstacles
    obstacles.forEach((obstacle) => {
      if (
        ballX > obstacle.x &&
        ballX < obstacle.x + obstacleWidth &&
        ballY + ballSpeedY > obstacle.y &&
        ballY + ballSpeedY < obstacle.y + obstacleHeight
      ) {
        ballSpeedY = -ballSpeedY;
      }
    });

    // Ball collision with bottom wall (lose life)
    if (ballY + ballSpeedY > canvas.height) {
      if (lives > 1) {
        lives--;
        resetBall();
      } else {
        updateHighScores(score);
        gameRunning = false;
        showRestartButton();
        alert("Game Over!");
      }
    }
  }

  // Draw game elements
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  drawBricks();
  drawObstacles();
  drawScore();
  drawLives();
  drawLevel();
}

// Reset ball position and speed
function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;
}

// Reset game (bricks, paddle position)
function resetGame() {
  paddleX = (canvas.width - paddleWidth) / 2;
  bricks.forEach((column) => {
    column.forEach((brick) => {
      brick.status = 1;
    });
  });
}

// Draw the paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Draw the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

// Draw the bricks
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.status === 1) {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
        ctx.fillStyle = brick.color;
        ctx.fill();
        ctx.closePath();
      }
    });
  });
}

// Draw the obstacles
function drawObstacles() {
  ctx.fillStyle = obstacleColor;
  obstacles.forEach((obstacle) => {
    ctx.fillRect(obstacle.x, obstacle.y, obstacleWidth, obstacleHeight);
  });
}

// Draw the score
function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

// Draw the lives
function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Draw the level
function drawLevel() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Level: " + level, canvas.width / 2 - 30, 20);
}

// Update high scores
function updateHighScores(score) {
  const scoreList = document.getElementById("scoreList");
  const scoreItem = document.createElement("li");
  scoreItem.textContent = score;
  scoreList.appendChild(scoreItem);
}

// Show the restart button
function showRestartButton() {
  const restartButton = document.getElementById("restartButton");
  restartButton.style.display = "block";
}

// Restart the game
function restartGame() {
  location.reload();
}

// Game loop
setInterval(updateGame, 22); 
