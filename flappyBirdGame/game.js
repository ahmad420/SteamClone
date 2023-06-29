const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const backgroundImage = new Image();
backgroundImage.src = "./images/bgg.gif";

const birdImage = new Image();
birdImage.src = "./images/bib.png";

const bird = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 48,
  height: 48,
  gravity: 0.5,
  velocity: 0,
  jump: -10,
  rotation: 0,

  draw() {
    ctx.save(); // Save the current canvas state

    // Translate the canvas to the bird's position
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);

    // Rotate the canvas based on the bird's velocity
    ctx.rotate(((Math.PI / 6) * this.velocity) / 20);

    // Draw the bird image (centered)
    ctx.drawImage(
      birdImage,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );

    ctx.restore(); // Restore the canvas state
  },

  flap() {
    if (!gameOver) {
      this.velocity = this.jump;
    }
  },

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;

    // Limit the bird's rotation angle
    if (this.velocity > 10) {
      this.rotation = Math.PI / 6; // Maximum downward tilt
    } else if (this.velocity < -10) {
      this.rotation = -Math.PI / 6; // Maximum upward tilt
    } else {
      this.rotation = ((Math.PI / 6) * this.velocity) / 10; // Proportional tilt
    }
  },
};

let score = 0;
const scoreDisplay = document.getElementById("scoreDisplay");

// Pipe class
class Pipe {
  constructor() {
    this.x = canvas.width;
    this.y = 0;
    this.width = 50;
    this.height = Math.floor(Math.random() * (canvas.height / 2)) + 50;
    this.gap = 200;
    this.highlighted = false;
    this.cornerRadius = 10;
  }

  draw() {
    ctx.fillStyle = "rgb(0, 120, 0)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillRect(
      this.x,
      this.height + this.gap,
      this.width,
      canvas.height - this.height - this.gap,
      this.cornerRadius
    );
  }

  update() {
    this.x -= 2;

    if (bird.x > this.x + this.width && !this.highlighted) {
      this.highlighted = true;
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
    }

    if (this.x + this.width <= 0) {
      pipes.shift();
    }

    if (
      bird.x + bird.width > this.x &&
      bird.x < this.x + this.width &&
      (bird.y < this.height || bird.y + bird.height > this.height + this.gap)
    ) {
      gameOver = true;
      stopBackgroundMusic();
    }
  }
}

const pipes = [];
let frames = 0;
let gameOver = false;
let gameStarted = false;
// Main game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

  bird.update();
  bird.draw();

  if (frames % 100 === 0) {
    pipes.push(new Pipe());
  }

  for (let i = 0; i < pipes.length; i++) {
    pipes[i].update();
    pipes[i].draw();
  }

  if (bird.y + bird.height > canvas.height || bird.y < 0) {
    gameOver = true;
    stopBackgroundMusic();
  }

  if (gameOver) {
    resetButton.style.display = "block";
    gameOverMessage.style.display = "block";
    return;
  }

  frames++;
  requestAnimationFrame(gameLoop);
}
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const gameOverMessage = document.getElementById("gameOver");
const bgMusic = document.getElementById("bgMusic");

function startGame() {
  gameStarted = true;
  startButton.style.display = "none";
  playBackgroundMusic();
  gameLoop();
}
// Reset the game
function resetGame() {
  playBackgroundMusic();
  resetButton.style.display = "none";
  gameOverMessage.style.display = "none";
  bird.y = canvas.height / 2;
  bird.velocity = 0;
  pipes.length = 0;
  frames = 0;
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  gameOver = false;
  startGame();
}

function handleKeyDown(event) {
  if (event.code === "Space") {
    bird.flap();
  }
}
function handleMouseDown(event) {
  event.preventDefault();
  bird.flap();
}
// Play background music
function playBackgroundMusic() {
  bgMusic.play();
}
// Stop background music
function stopBackgroundMusic() {
  bgMusic.pause();
  bgMusic.currentTime = 0;
}

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("mousedown", handleMouseDown);
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
