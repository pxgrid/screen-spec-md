const fs = require('fs')
const ncp = require('ncp').ncp
ncp.limit = 16

const copyNuxtFiles = () => {
  const source = './_template/_nuxt'
  const dest = './_spec/_nuxt'

  return new Promise(resolve => {
    ncp(source, dest, err => {
      if (err) throw err
      resolve()
    })
  })
}

const copyScreenEditorFiles = () => {
  const source = './_template/screen-editor.html'
  const dest = './_spec/_nuxt/__screen-editor.html'

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
      return copyNuxtFiles()
    })
    .then(() => {
      return copyScreenEditorFiles()
    })
}

module.exports = copyCoreFiles
