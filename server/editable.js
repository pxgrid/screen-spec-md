const path = require('path')
const fs = require('fs')
const express = require('express')
const multer = require('multer')

const parsePageMd = require('../lib/parse-page-md/index')
const parseGitLog = require('../lib/utils/git-log')
const makeTemplateContext = require('../lib/build-page/make-template-context')

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

  // マークダウンの編集（書き込み）と変換したHTMLの出力
  app.post('/__markdown', (req, res, next) => {
    ;(async () => {
      const htmlPath = req.body.path
      const mdSource = req.body.markdown
      const mdRootPath = path.resolve(process.cwd(), 'public/dummies') //TODO: public/dummiesを外部から指定可能に
      const mdPath = htmlPath.replace(/\.html$/, '.md')
      const absoluteMdPath = path.resolve(mdRootPath, `.${mdPath}`)

      // マークダウンの更新
      fs.writeFileSync(absoluteMdPath, mdSource, { encoding: 'utf-8' })

      // ページを構成するための情報を返す
      const gitLog = await parseGitLog(absoluteMdPath)
      const pageInfo = parsePageMd(mdSource, gitLog, mdRootPath, mdPath)
      const context = makeTemplateContext(pageInfo)
      res.json({ context: context })
    })().catch(next)
  })
}

module.exports = editable
