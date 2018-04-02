'use strict'

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

// Initialize Score and Lives
let score = 0
let lives = 3

// ball position
let x = canvas.width / 2
let y = canvas.height - 30
// ball direction/speed
let dx = 2
let dy = -2
// ball size/color
const ballRadius = 10
let ballColor = '#0095DD'

// paddle variables
const paddleHeight = 10
const paddleWidth = 75
let paddleX = (canvas.width - paddleWidth) / 2
const paddleSpeed = 7

// user input variables
let rightPressed = false
let leftPressed = false

// initialize brick variables
const brickRowCount = 3
const brickColumnCount = 5
const brickWidth = 75
const brickHeight = 20
const brickPadding = 10
const brickOffsetTop = 30
const brickOffsetLeft = 30
// create 2D array of bricks
const bricks = []
for (let column = 0; column < brickColumnCount; column++) {
  bricks[column] = []
  for (let row = 0; row < brickRowCount; row++) {
    bricks[column][row] = { x: 0, y: 0, status: 1 }
  }
}

// renders the ball
const drawBall = function () {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = ballColor
  ctx.fill()
  ctx.closePath()
}

// renders the paddle
const drawPaddle = function () {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = '#0095DD'
  ctx.fill()
  ctx.closePath()
}

// set brick x/y values and render them
const drawBricks = function () {
  for (let column = 0; column < brickColumnCount; column++) {
    for (let row = 0; row < brickRowCount; row++) {
      if (bricks[column][row].status === 1) {
        const brickX = (column * (brickWidth + brickPadding)) + brickOffsetLeft
        const brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop
        bricks[column][row].x = brickX
        bricks[column][row].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fillStyle = '#0095DD'
        ctx.fill()
        ctx.closePath()
      }
    }
  }
}

// central hub of the game logic
const draw = function () {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // render the ball, paddle, and bricks
  drawBricks()
  drawBall()
  drawPaddle()
  drawScore()
  drawLives()
  collisionDetection()
  // set the new ball position
  x += dx
  y += dy

  // check for ball collision on left and right wall, reverse direction if true
  // also randomizes ball color
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx
    // ballColor = getRandomColor()
  }

  // check for ball collision on top wall, reverse direction and randomize ball
  // color if true. If ball collides with bottom wall, game over
  if (y + dy < ballRadius) {
    dy = -dy
    // ballColor = getRandomColor()
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy
    } else {
      lives--
      if (!lives) {
        alert('GAME OVER')
        clearInterval(renderGame)
        document.location.reload(true)
      } else {
        x = canvas.width / 2
        y = canvas.height - 30
        dx = 2
        dy = -2
        paddleX = (canvas.width - paddleWidth) / 2
      }
    }
  }

  // move paddle on player input, within bounds of game
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed
  } else if (leftPressed && paddleX > 0) {
    paddleX -= paddleSpeed
  }
}

// // generate a random color
// const getRandomColor = function () {
//   const letters = '0123456789ABCDEF'
//   let color = '#'
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)]
//   }
//   return color
// }

// Next 2 methods handle user input via keyboard
const keyDownHandler = function (event) {
  if (event.keyCode === 39) {
    rightPressed = true
  } else if (event.keyCode === 37) {
    leftPressed = true
  }
}

const keyUpHandler = function (event) {
  if (event.keyCode === 39) {
    rightPressed = false
  } else if (event.keyCode === 37) {
    leftPressed = false
  }
}

// handles user input via mouse
const mouseMoveHandler = function (event) {
  const relativeX = event.clientX - canvas.offsetLeft
  if (relativeX > 0 + (paddleWidth / 2) && relativeX < canvas.width - (paddleWidth / 2)) {
    paddleX = relativeX - paddleWidth / 2
  }
}

// check all bricks to see if any collide with ball center
const collisionDetection = function () {
  for (let column = 0; column < brickColumnCount; column++) {
    for (let row = 0; row < brickRowCount; row++) {
      const brick = bricks[column][row]
      if (brick.status === 1) {
        if (x > brick.x && x < brick.x + brickWidth && y > brick.y && y < brick.y + brickHeight) {
          dy = -dy
          brick.status = 0
          score++
          if (score === brickRowCount * brickColumnCount) {
            alert(`YOU WIN, CONGRATULATIONS! FINAL SCORE: ${score}`)
            document.location.reload()
          }
        }
      }
    }
  }
}

// Render the score
const drawScore = function () {
  ctx.font = '16px Arial'
  ctx.fillStyle = '#0095DD'
  ctx.fillText('Score: ' + score, 8, 20)
}

// Render player's life counter
const drawLives = function () {
  ctx.font = '16px Arial'
  ctx.fillStyle = '#0095DD'
  ctx.fillText('Lives: ' + lives, canvas.width - 65, 20)
}

const renderGame = setInterval(draw, 10)

module.exports = {
  draw,
  keyDownHandler,
  keyUpHandler,
  mouseMoveHandler
}
