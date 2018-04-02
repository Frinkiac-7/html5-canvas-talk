'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

const draw = function () {
  const canvas = document.getElementById('tutorial')
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d')
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
