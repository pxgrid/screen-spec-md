const fs = require('fs')
const ncp = require('ncp').ncp
ncp.limit = 16

const copyScriptsDir = () => {
  const source = './dist/_screen-spec-md'
  const dest = './_spec/_screen-spec-md'

  return new Promise(resolve => {
    ncp(source, dest, err => {
      if (err) throw err
      resolve()
    })
  })
}

const copyImageCanvasFile = () => {
  const source = './dist/__image-canvas.html'
  const dest = './_spec/__image-canvas.html'

  return new Promise(resolve => {
    fs.copyFile(source, dest, err => {
      if (err) throw err
      resolve()
    })
  })
}

const copyCoreFiles = () => {
  return Promise.resolve()
    .then(() => {
      return copyScriptsDir()
    })
    .then(() => {
      return copyImageCanvasFile()
    })
}

module.exports = copyCoreFiles
