const path = require('path')
const fs = require('fs')
const express = require('express')
const multer = require('multer')

const editable = app => {
  app.use(express.static('_spec')) //TODO: _specを外部から指定可能に

  const uploads = multer({ dest: path.join(__dirname, '__uploads/') })
  app.post('/__image', uploads.single('image'), function(req, res) {
    console.log('uploaded filename： ' + req.file.originalname)
    console.log('saved path：' + req.file.path)
    console.log('saved filename： ' + req.file.filename)
  })

  app.get('/__markdown', (req, res) => {
    console.log('req.query', req.query)
    console.log('process.cwd()', process.cwd())
    const mdPath = path.resolve(process.cwd(), 'example', `.${req.query.path}.md`) //TODO: exampleを外部から指定可能に
    const mdContent = fs.readFileSync(mdPath, { encoding: 'utf-8' })
    res.send(mdContent)
  })
}

module.exports = editable
