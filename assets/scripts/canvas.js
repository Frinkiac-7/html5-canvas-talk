'use strict'

// const canvas = document.getElementById('tutorial')
// const ctx = canvas.getContext('2d')

const draw = function () {
  const canvas = document.getElementById('tutorial')
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d')

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        ctx.beginPath()
        const x = 25 + j * 50 // x coordinate
        const y = 25 + i * 50 // y coordinate
        const radius = 20 // Arc radius
        const startAngle = 0 // Starting point on circle
        const endAngle = Math.PI + (Math.PI * j) / 2 // End point on circle
        const anticlockwise = i % 2 !== 0 // clockwise or anticlockwise

        ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)

        if (i > 1) {
          ctx.fill()
        } else {
          ctx.stroke()
        }
      }
    }
  }
}

module.exports = {
  draw
}
