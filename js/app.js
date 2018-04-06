const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const ballSize = 20;
let ballX = canvasWidth / 2 - ballSize / 2;
let ballY = canvasHeight / 2 - ballSize / 2;


const paddleHeight = 100;
const paddleWidth = 10;
const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidth = 6;
const lineHeight = 16;

let ballSpeedX = 0;
let ballSpeedY = 0;

let scorePlayer = 0;
let scoreAi = 0;
const playerPkt = document.getElementById('scoreYou');
const aiPkt = document.getElementById('scoreComputer');
playerPkt.textContent = scorePlayer;
aiPkt.textContent = scoreAi;


function table() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  for (let linePosition = 20; linePosition < canvasHeight; linePosition += 30) {
    ctx.fillStyle = "gray";
    ctx.fillRect(canvasWidth / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight);
  }
}


function reset() {
  if (ballX <= 0) {
    aiPkt.textContent = ++scoreAi;
    ballReset();
  } else if (ballX + ballSize >= canvasWidth) {
    playerPkt.textContent = ++scorePlayer;
    ballReset();
  }
}

function ballReset() {
  ballX = canvasWidth / 2 - ballSize / 2;
  ballY = canvasHeight / 2 - ballSize / 2;
  ctx.fillStyle = '#fff';
  ctx.fillRect(ballX, ballY, ballSize, ballSize);
  ballSpeedX = 0;
  ballSpeedY = 0;
}

function play() {
  let tab = [-1, 1, 1, -1];
  var los = Math.ceil(Math.random() * (tab.length - 1));
  if (tab[los] < 0) {
    ballSpeedX = -3;
    ballSpeedY = -3;
  } else {
    ballSpeedX = 3;
    ballSpeedY = 3;
  }

}

canvas.addEventListener("click", play);

function ball() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(ballX, ballY, ballSize, ballSize);
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballY <= 0 || ballY + ballSize >= canvasHeight) {
    ballSpeedY = -ballSpeedY;
    speedUp();
  }
  if (ballX <= 0 || ballX + ballSize >= canvasWidth) {
    ballSpeedX = -ballSpeedX;
    speedUp();
  }

  if (playerX < ballX + ballSize &&
    playerY < ballY + ballSize &&
    ballX < playerX + paddleWidth &&
    ballY < playerY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  if (aiX < ballX + ballSize &&
    aiY < ballY + ballSize &&
    ballX < aiX + paddleWidth &&
    ballY < aiY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }
}


function player() {
  ctx.fillStyle = "#7FFF00";
  ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}

function ai() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
}
topCanvas = canvas.offsetTop;

function playerPosition(event) {
  playerY = event.clientY - topCanvas - paddleHeight / 2;
  if (playerY >= canvasHeight - paddleHeight) {
    playerY = canvasHeight - paddleHeight;
  } else if (playerY <= 0) {
    playerY = 0;
  }
}

canvas.addEventListener("mousemove", playerPosition);

function speedUp() {
  console.log('przyspieszam');
  //predkosc x
  if (ballSpeedX > 0 && ballSpeedX < 16) {
    ballSpeedX += 0.5;
  } else if (ballSpeedX < 0 && ballSpeedX > -16) {
    ballSpeedX -= 0.5;
  }
  //predkosc y
  if (ballSpeedY > 0 && ballSpeedY < 16) {
    ballSpeedY += 0.5;
  } else if (ballSpeedY < 0 && ballSpeedY > -16) {
    ballSpeedY -= 0.5;
  }
}


function aiPosition() {
  const middlepaddle = aiY + paddleHeight / 2;
  const middleBall = ballY + ballSize / 2;

  if (ballX > 500) {
    if (middlepaddle - middleBall > 200) {
      aiY -= 25;

    } else if (middlepaddle - middleBall > 50) {
      aiY -= 15;

    } else if (middlepaddle - middleBall < -200) {
      aiY += 25;

    } else if (middlepaddle - middleBall < -50) {
      aiY += 15;

    }

  } else if (ballX <= 500 && ballX > 150) {
    if (middlepaddle - middleBall > 100) {
      aiY -= 10;
    } else if (middlepaddle - middleBall < -100) {
      aiY += 10;
    } else if (middlepaddle - middleBall > 40) {
      aiY -= 3;
    } else if (middlepaddle - middleBall < -40) {
      aiY += 3;
    }
  }
}

function game() {
  table();
  ball();
  player();
  ai();
  aiPosition();
  reset();
}


setInterval(game, 1000 / 80);
