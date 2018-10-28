const path = require('path')

function destPath(pathStr) {
  const { dir, name } = path.parse(pathStr)

  // ['.', 'example', 'foo', 'bar']
  const dirArr = dir.split(path.sep)
  dirArr.splice(0, 2)

  // ['foo', 'bar']
  return path.join(...dirArr, name)
}

module.exports = destPath
