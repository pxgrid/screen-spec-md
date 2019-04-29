const path = require('path')
const fs = require('fs')
const express = require('express')
const multer = require('multer')

const editable = app => {
  app.use(express.json())

  // 閲覧
  // app.use(express.static('_spec')) //TODO: _specを外部から指定可能に

  // 画像のアップロード
  const uploads = multer({ dest: path.join(__dirname, '__uploads/') })
  app.post('/__image', uploads.single('image'), function(req, res) {
    console.log('uploaded filename： ' + req.file.originalname)
    console.log('saved path：' + req.file.path)
    console.log('saved filename： ' + req.file.filename)
  })

  // マークダウンの編集（読み込み）
  app.get('/__markdown', (req, res) => {
    const mdPath = req.query.path.replace(/\.html$/, '.md')
    const absoluteMdPath = path.resolve(process.cwd(), 'public/dummies', `.${mdPath}`) //TODO: public/dummiesを外部から指定可能に
    const mdContent = fs.readFileSync(absoluteMdPath, { encoding: 'utf-8' })
    res.send(mdContent)
  })

  // マークダウンの編集（書き込み）
  app.post('/__markdown', (req, res) => {
    const mdSource = req.body.markdown
    const mdPath = req.body.path.replace(/\.html$/, '.md')
    const absoluteMdPath = path.resolve(process.cwd(), 'public/dummies', `.${mdPath}`) //TODO: public/dummiesを外部から指定可能に
    fs.writeFileSync(absoluteMdPath, mdSource, { encoding: 'utf-8' })
    res.send('OK')
  })
}

module.exports = editable
