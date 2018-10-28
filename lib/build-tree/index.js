const writeFile = require('../utils/write-file')
const loadPage = require('../utils/load-page')
const listToDirTree = require('./list-to-dir-tree')

/**
 * Markdownのファイルからサイトのツリー構造を構築する
 * Markdownへのパス -> pageInfoの配列 -> 子ページのパス情報も持つオブジェクトの配列 -> ツリー構造のjson
 *
 */
function buildTree(paths, { rootDir, destDir }) {
  console.log('>>> publishing tree...')

  return Promise.all(
    paths.map(mdPath => {
      return Promise.resolve().then(() => loadPage(rootDir, mdPath))
    }),
  )
    .then(pageInfoList => {
      const dirTree = listToDirTree(pageInfoList)
      // TODO: ディレクトリのみのツリーなので、ファイル情報を組み込む処理を追加で実装する
      const dest = `${destDir}/tree.json`
      return writeFile(dest, JSON.stringify(dirTree))
    })
    .then(() => {
      console.log(`<<< tree published!`)
    })
}

module.exports = buildTree
