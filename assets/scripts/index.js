'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const canvas = require('./canvas')

document.addEventListener('keydown', canvas.keyDownHandler, false)
document.addEventListener('keyup', canvas.keyUpHandler, false)
document.addEventListener('mousemove', canvas.mouseMoveHandler, false)

$(() => {
  setAPIOrigin(location, config)
  canvas.draw()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
