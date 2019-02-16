const path = require('path')

/**
 * 出力用のファイルパスに変換する
 * ./example/foo/bar => foo/bar
 * example/foo/bar   => foo/bar
 * @param pathStr
 * @returns {*}
 */
function destPath(pathStr) {
  const relativePath = path.relative(process.cwd(), pathStr)
  const { dir, name } = path.parse(relativePath)

  const dirArr = dir.split(path.sep)
  if (dirArr[0] === '.') {
    dirArr.splice(0, 2)
  } else {
    dirArr.splice(0, 1)
  }
  return path.join(...dirArr, name)
}

module.exports = destPath
