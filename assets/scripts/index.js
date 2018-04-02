'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

const draw = function () {
  const canvas = document.getElementById('tutorial')
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'rgb(200, 0, 0)'
    ctx.fillRect(10, 10, 50, 50)

    ctx.fillStyle = 'rgba(0, 0, 200, 0.5)'
    ctx.fillRect(30, 30, 50, 50)
  }
}

$(() => {
  setAPIOrigin(location, config)
  draw()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
