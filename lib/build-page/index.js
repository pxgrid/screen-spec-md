const writeFile = require('../utils/write-file')
const padZero = require('../utils/pad-zero')
const destPath = require('../utils/dest-path')
const loadPage = require('./load-page')
const renderPage = require('./render-page')

/**
 * MarkdownのファイルをHTMLに変換する処理。
 * Markdownへのパス -> Pageというモデル -> HTML という処理の流れ。
 *
 */
function buildPage(paths, { rootDir, destDir, tmplMap }) {
  console.log('>>> publishing page...')
  return Promise.all(
    paths.map((mdPath, idx) => {
      const dest = `${destDir}/${destPath(mdPath)}.html`

      // 進捗をログ
      const total = String(paths.length)
      console.log(`[${padZero(idx + 1, total.length)}/${total}] ${dest}`)

      return Promise.resolve()
        .then(() => loadPage(rootDir, mdPath))
        .then(pageInfo => renderPage(tmplMap, pageInfo))
        .then(html => writeFile(dest, html))
    }),
  ).then(() => {
    console.log(`<<< ${paths.length} pages published!`)
  })
}

module.exports = buildPage
