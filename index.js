const PLUGIN_NAME = 'screen-spec-md'

const globby = require('globby')

const loadTmpl = require('./lib/load-tmpl')
const buildPage = require('./lib/build-page')
// const buildList = require('./lib/build-list');
const copyCoreFiles = require('./lib/copy-core-files')

// templateのタイプをキーに、HandlebarsのTemplate関数を持つ
const tmplMap = new Map()
const rootDir = `${__dirname}/example`
const destDir = './_spec'

Promise.resolve()
  // テンプレートを配置
  .then(() => globby('./dist/**/*.html'))
  .then(paths => Promise.all(paths.map(tmplPath => loadTmpl(tmplPath, tmplMap))))
  // MarkDownを変換・埋め込み
  .then(() => globby('./example/**/*.md')) //TODO: 設定ファイルか引数で渡されるものにする
  .then(paths => buildPage(paths, { rootDir, destDir, tmplMap }))
  // Vueのコアファイルをコピー
  .then(() => copyCoreFiles())

  .then(() => {
    console.log('All done :D')
  })
