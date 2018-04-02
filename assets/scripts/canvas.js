'use strict'

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

// ball position
let x = canvas.width / 2
let y = canvas.height - 30
// ball direction/speed
let dx = 2
let dy = -2
const ballRadius = 10
let ballColor = '#0095DD'

// renders the ball
const drawBall = function () {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
  ctx.fillStyle = ballColor
  ctx.fill()
  ctx.closePath()
}

const draw = function () {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // render the ball
  drawBall()
  x += dx
  y += dy

  // check for ball collision on top and bottom wall, reverse direction if true
  if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy
    ballColor = getRandomColor()
  }
  // check for ball collision on left and right wall, reverse direction if true
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx
    ballColor = getRandomColor()
  }
}
setInterval(draw, 10)

const getRandomColor = function () {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

module.exports = {
  draw
}
