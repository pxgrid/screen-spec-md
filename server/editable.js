const path = require('path')
const fs = require('fs')
const express = require('express')
const multer = require('multer')

const regexpConstants = require('../lib/constants/regexp')
const md2html = require('../lib/utils/md2html')
const parsePageMd = require('../lib/parse-page-md/index')
const parseGitLog = require('../lib/utils/git-log')
const makeTemplateContext = require('../lib/build-page/make-template-context')

const editable = (app, mdDir) => {
  app.use(express.json())
  const uploads = multer({ dest: path.join(__dirname, '__uploads/') })

  // 画像のアップロード
  app.post('/__uploadImage', uploads.single('image'), (req, res) => {
    // TODO: ファイルタイプのチェック req.file.mimetype => "image/png"
    const uploadedPath = req.file.path
    const pathToMove = path.resolve(process.cwd(), mdDir, req.body.path)

    // TODO: ディレクトリトラバーサルチェック
    const regexp = new RegExp(`^${process.cwd()}`)
    console.log('regexp', regexp.test(pathToMove))

    // TODO: ディレクトリが無ければ作成する

    fs.renameSync(uploadedPath, pathToMove)
    res.json({})
  })

  // マークダウンの編集（読み込み）
  app.get('/__markdown', (req, res) => {
    const mdPath = req.query.path.replace(/\.html$/, '.md')
    const absoluteMdPath = path.resolve(process.cwd(), mdDir + '/' + mdPath)
    const mdContent = fs.readFileSync(absoluteMdPath, { encoding: 'utf-8' })
    res.send(mdContent)
  })

  // マークダウンの編集（書き込み）と変換したHTMLの出力
  app.post('/__markdown', (req, res, next) => {
    ;(async () => {
      const htmlPath = req.body.path
      const mdSource = req.body.markdown
      const mdRootPath = path.resolve(process.cwd(), mdDir)
      const mdPath = htmlPath.replace(/\.html$/, '.md')
      const absoluteMdPath = path.resolve(mdRootPath, mdPath)

      // マークダウンの更新
      fs.writeFileSync(absoluteMdPath, mdSource, { encoding: 'utf-8' })

      // ページを構成するための情報を返す
      const gitLog = await parseGitLog(absoluteMdPath)
      const pageInfo = parsePageMd(mdSource, gitLog, mdRootPath, mdDir + '/' + mdPath)
      const context = makeTemplateContext(pageInfo, { isEditable: true })
      res.json({ context: context })
    })().catch(next)
  })

  app.post('/__html', (req, res) => {
    const mdSource = req.body.markdown
    const mdSourceWithoutMeta = mdSource.replace(regexpConstants.markdownMeatArea, '')
    const html = md2html(mdSourceWithoutMeta)
    res.json({ html: html })
  })
}

const devEditable = app => {
  editable(app, 'public/dummies')
}

const productionEditable = (app, mdDir) => {
  editable(app, mdDir)
}

module.exports = {
  devEditable,
  productionEditable,
}
