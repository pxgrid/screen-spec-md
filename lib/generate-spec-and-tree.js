const path = require('path')
const cpx = require('cpx')
const globby = require('globby')

const BUILT_IN_TEMPLATE = require('../constants/dir-names').BUILT_IN_TEMPLATE
const makeDir = require('../lib/utils/make-dir')
const loadTmpl = require('../lib/load-tmpl')
const buildPage = require('../lib/build-page')
const buildTreeJson = require('../lib/build-tree-json')
const copyCoreFiles = require('../lib/copy-core-files')

const copyMdSource = (mdDirPath, destPath) => {
  makeDir(destPath) // recreate the dest directory.
  const sourcePath = path.resolve(mdDirPath, './**/*')
  cpx.copySync(sourcePath, destPath)
}

const generateSpecAndTree = async (mdDir, destDir, { isEditable }) => {
  copyMdSource(mdDir, destDir)
  const absoluteMdFilesPath = path.resolve(mdDir, './**/*.md')
  const relativeMdFilesPath = path.relative(process.cwd(), absoluteMdFilesPath)

  //TODO: templateをユーザーが任意に選択できるようにし、存在しなければ警告する
  //TODO: 上記見しての場合、BUILT_IN_TEMPLATEのテンプレートを使用するものとするが、それが存在しなければnpm run buildを実行させるよう促す
  const rootTemplateFilesPath = path.resolve(__dirname, `../${BUILT_IN_TEMPLATE}/**/*.html`)
  // templateのタイプをキーに、HandlebarsのTemplate関数を持つ
  const tmplMap = new Map()

  return Promise.resolve()
    .then(() => globby(rootTemplateFilesPath))
    .then(paths => Promise.all(paths.map(tmplPath => loadTmpl(tmplPath, tmplMap))))
    .then(() => globby(relativeMdFilesPath))
    .then(paths => {
      return Promise.all([
        buildPage(paths, { rootDir: mdDir, destDir: destDir, tmplMap }, { isEditable: isEditable }),
        buildTreeJson(paths, { rootDir: mdDir, destDir: destDir }),
      ])
    })
    .then(() => copyCoreFiles(destDir))
    .then(() => console.log('All done :D'))
}

module.exports = generateSpecAndTree
