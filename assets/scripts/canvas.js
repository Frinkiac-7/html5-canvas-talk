'use strict'

// const canvas = document.getElementById('tutorial')
// const ctx = canvas.getContext('2d')

const draw = function () {
  const canvas = document.getElementById('tutorial')
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d')

    // Quadratric curves example
    ctx.beginPath()
    ctx.moveTo(75, 25)
    ctx.quadraticCurveTo(25, 25, 25, 62.5)
    ctx.quadraticCurveTo(25, 100, 50, 100)
    ctx.quadraticCurveTo(50, 120, 30, 125)
    ctx.quadraticCurveTo(60, 120, 65, 100)
    ctx.quadraticCurveTo(125, 100, 125, 62.5)
    ctx.quadraticCurveTo(125, 25, 75, 25)
    ctx.stroke()
  }
}

module.exports = {
  draw
}
