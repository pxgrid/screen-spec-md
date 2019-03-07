const path = require('path')
const express = require('express')
const multer = require('multer')

const editable = express()
editable.use(express.static('_spec')) //TODO: 指定可能に

const upload = multer({ dest: path.join(__dirname, '__uploads') })
editable.post('/profile', upload.single('avatar'), function(req, res) {
  console.log('uploaded filename： ' + req.file.originalname)
  console.log('saved path：' + req.file.path)
  console.log('saved filename： ' + req.file.filename)
})

editable.listen(3000, () => console.log('screen-spec-md: Writer mode: listening on port 3000!'))
