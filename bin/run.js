const PLUGIN_NAME = 'screen-spec-md'

const path = require('path')
const cpx = require('cpx')
const globby = require('globby')

const makeDir = require('../lib/utils/make-dir')
const loadTmpl = require('../lib/load-tmpl')
const buildPage = require('../lib/build-page')
const buildTreeJson = require('../lib/build-tree-json')
const copyCoreFiles = require('../lib/copy-core-files')

const copyMdSource = (mdPath, destPath) => {
  makeDir(destPath)
  cpx.copySync(path.resolve(mdPath, './**/*'), destPath)
}

const run = async (mdDir, destDir) => {
  const rootMdDir = path.resolve(process.cwd(), mdDir)
  const rootDestDir = path.resolve(process.cwd(), destDir)
  copyMdSource(rootMdDir, rootDestDir)

  const rootMdFilesPath = path.resolve(rootMdDir, './**/*.md')
  const relativeMdFilesPath = path.relative(process.cwd(), rootMdFilesPath)
  const rootTemplateFilesPath = path.resolve(__dirname, '../dist/**/*.html')

  // templateのタイプをキーに、HandlebarsのTemplate関数を持つ
  const tmplMap = new Map()

  Promise.resolve()
    // テンプレートを配置
    .then(() => globby(rootTemplateFilesPath))
    .then(paths => Promise.all(paths.map(tmplPath => loadTmpl(tmplPath, tmplMap))))
    // MarkDownを変換・埋め込み
    .then(() => globby(relativeMdFilesPath))
    .then(paths => {
      return Promise.all([
        buildPage(paths, { rootDir: rootMdDir, destDir: rootDestDir, tmplMap }),
        buildTreeJson(paths, { rootDir: rootMdDir, destDir: rootDestDir }),
      ])
    })
    // Vueで開発されたビルド済みのコアファイルをコピー
    .then(() => copyCoreFiles(rootDestDir))

    .then(() => {
      console.log('All done :D')
    })
}

module.exports = run
