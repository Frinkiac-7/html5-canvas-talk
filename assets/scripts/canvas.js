'use strict'

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

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

const draw = function () {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // render the ball and paddle
  drawBall()
  drawPaddle()
  // set the new ball position
  x += dx
  y += dy

  // check for ball collision on top and bottom wall, reverse direction if true
  // also randomizes ball color
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy
    ballColor = getRandomColor()
  }
  // check for ball collision on left and right wall, reverse direction if true
  // also randomizes ball color
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx
    ballColor = getRandomColor()
  }

  // move paddle on player input, within bounds of game
  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += paddleSpeed
  } else if (leftPressed && paddleX > 0) {
    paddleX -= paddleSpeed
  }
}

// generate a random color
const getRandomColor = function () {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

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

setInterval(draw, 10)

module.exports = {
  draw,
  keyDownHandler,
  keyUpHandler
}
