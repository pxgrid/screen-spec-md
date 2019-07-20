const fs = require('fs')
const path = require('path')
const ncp = require('ncp').ncp
ncp.limit = 16

// build済みのファイルが格納されているディレクトリ
const distDir = path.resolve(__dirname, '../../dist')

const copyScriptsDir = destDir => {
  const source = path.resolve(distDir, './_screen-spec-md')
  const dest = path.resolve(destDir, './_screen-spec-md')

  return new Promise(resolve => {
    ncp(source, dest, err => {
      if (err) throw err
      resolve()
    })
  })
}

const copyImageCanvasFile = destDir => {
  const source = path.resolve(distDir, '__screen-editor.html')
  const dest = path.resolve(destDir, './__screen-editor.html')

  return new Promise(resolve => {
    fs.copyFile(source, dest, err => {
      if (err) throw err
      resolve()
    })
  })
}

/**
 * @param destDir マークダウンを変換後のhtmlファイルを出力するディレクトリ
 * @returns {Promise<void | never>}
 */
const copyCoreFiles = destDir => {
  return Promise.resolve()
    .then(() => {
      return copyScriptsDir(destDir)
    })
    .then(() => {
      return copyImageCanvasFile(destDir)
    })
}

module.exports = copyCoreFiles
