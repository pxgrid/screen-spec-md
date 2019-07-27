const path = require('path')
const cpx = require('cpx')
const globby = require('globby')

const BUILT_IN_TEMPLATE = require('../../constants/dir-names').BUILT_IN_TEMPLATE
const makeDir = require('../../lib/utils/make-dir')
const loadTmpl = require('../../lib/load-tmpl')
const buildPage = require('../../lib/build-page')
const buildTreeJson = require('../../lib/build-tree-json')
const copyCoreFiles = require('../../lib/copy-core-files')

const copyMdSource = (mdPath, destPath) => {
  makeDir(destPath)
  cpx.copySync(path.resolve(mdPath, './**/*'), destPath)
}

exports.command = ['* [options]', 'convert']

exports.describe = 'Convert from markdown to html'

exports.builder = yargs => {
  yargs.options({
    m: {
      alias: 'mdDir',
      demandOption: true,
      requiresArg: true,
      describe: 'Path of the source(markdown) directory',
      type: 'string',
    },
    d: {
      alias: 'destDir',
      demandOption: true,
      requiresArg: true,
      describe: 'Path of directory to write out converted html',
      type: 'string',
    },
  })
}

exports.handler = async argv => {
  const rootMdDir = path.resolve(process.cwd(), argv.mdDir)
  const rootDestDir = path.resolve(process.cwd(), argv.destDir)
  copyMdSource(rootMdDir, rootDestDir)

  const rootMdFilesPath = path.resolve(rootMdDir, './**/*.md')
  const relativeMdFilesPath = path.relative(process.cwd(), rootMdFilesPath)
  const rootTemplateFilesPath = path.resolve(__dirname, `../../${BUILT_IN_TEMPLATE}/**/*.html`) //TODO: templateをユーザーが任意に選択できるようにする

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
