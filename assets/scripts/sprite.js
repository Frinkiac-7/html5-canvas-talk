'use strict'

const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')

// Creating an Image object for our character
let character = new Image()

// Setting the source to the image file
character.src = 'http://res.cloudinary.com/ismurray/image/upload/v1522761152/goblin.png'

// the wiDth and height of our spritesheet
const spriteWidth = 704
const spriteHeight = 320

// we have two rows and 8 cols in the current sprite sheet
const rows = 5
const cols = 11

// The 0th (first) row is for the down movement
const trackDown = 0

// 1st (second) row for the left movement (counting the index from 0)
const trackRight = 1

// To get the width of a single sprite we divided the width of sprite with the number of cols
// because all the sprites are of equal width and height
let width = spriteWidth / cols

// Same for the height we divided the height with number of rows
let height = spriteHeight / rows

// Each row contains 11 frame and at start we will display the first frame (assuming the index from 0)
let curFrame = 0

// The total frame is 11
let frameCount = 11

// x and y coordinates to render the sprite
let x = 0
let y = 0

// x and y coordinates of the canvas to get the single frame
let srcX = 0
let srcY = 0

// tracking the movement down and right
let down = true
let right = false

// Speed of the movement
let speed = 12

const updateFrame = function () {
  // clear the frame
  ctx.clearRect(x, y, width, height)
  // Updating the frame index
  curFrame = ++curFrame % frameCount

  // Calculating the x coordinate for spritesheet
  srcX = curFrame * width
}

const draw = function () {
  // Updating the frame
  updateFrame()
  // Drawing the image
  ctx.drawImage(character, srcX, srcY, width, height, x, y, width, height)
}

setInterval(draw, 100)

module.exports = {
  draw
}
