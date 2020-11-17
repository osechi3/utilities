/*
  Creates 3 copies of an image with the provided width
*/

const sharp = require('sharp')
const fs = require('fs')
const imageDirectory = './src/assets/images'
const path = require('path')

resizeToSmall({ userWidth: 200 })
resizeToMedium({ userWidth: 360 })
resizeToLarge({ userWidth: 600 })

function resizeToSmall ({ userWidth }) {
  fs.readdirSync(imageDirectory).forEach(image => {
    if (!/(-small|-medium|-large)\.(jpg|jpeg|png|webp|gif|)/.test(image)) {
      console.log(image.toString().match(/\.(jpg|jpeg|png|webp|gif|)$/)[0])
      sharp(`${imageDirectory}/${image}`)
        .resize({ width: userWidth, fit: 'contain' })
        .toFile(`${imageDirectory}/${image}-small${path.extname(image)}`)
        .catch(error => {
          console.log(error)
        })
    }
  })
}

function resizeToMedium ({ userWidth }) {
  fs.readdirSync(imageDirectory).forEach(image => {
    if (!/(-small|-medium|-large)\.(jpg|jpeg|png|webp|gif|)/.test(image)) {
      sharp(`${imageDirectory}/${image}`)
        .resize({ width: userWidth, fit: 'contain' })
        .toFile(`${imageDirectory}/${image}-medium${path.extname(image)}`)
        .catch(error => {
          console.log(error)
        })
    }
  })
}

function resizeToLarge ({ userWidth }) {
  fs.readdirSync(imageDirectory).forEach(image => {
    if (!/(-small|-medium|-large)\.(jpg|jpeg|png|webp|gif|)/.test(image)) {
      sharp(`${imageDirectory}/${image}`)
        .resize({ width: userWidth, fit: 'contain' })
        .toFile(`${imageDirectory}/${image}-large${path.extname(image)}`)
        .catch(error => {
          console.log(error)
        })
    }
  })
}
