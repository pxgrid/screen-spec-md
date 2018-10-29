/**
 * pageInfoの構造は、lib/parse-page-md/index.js を参照
 */
const path = require('path')

const mapPage = (pageInfo, currentDirTree, currentDirPath, underDirPathList) => {
  currentDirTree.forEach(tree => {
    if (tree.path === currentDirPath) {
      if (underDirPathList.length === 1) {
        tree.children.push({
          type: 'file',
          filename: pageInfo.filename,
          title: pageInfo.title,
        })
      } else {
        const nextDirPath = underDirPathList[0] + path.sep
        const nextUnderDirPathList = underDirPathList.slice(1, underDirPathList.length)
        mapPage(pageInfo, tree.children, nextDirPath, nextUnderDirPathList)
      }
    }
  })
}

const mapPages = (pageInfoList, dirTree) => {
  pageInfoList.forEach(pageInfo => {
    const fromRoot = pageInfo.fromRoot
    const splitPathList = fromRoot.split(path.sep)
    const currentDirPath = splitPathList[0] + path.sep
    const underDirPathList = splitPathList.slice(1, splitPathList.length)
    mapPage(pageInfo, dirTree, currentDirPath, underDirPathList)
  })
  return dirTree
}

module.exports = mapPages
