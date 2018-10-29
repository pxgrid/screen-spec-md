const makeDirNode = ({ path, children }) => {
  return {
    type: 'dir',
    path: path,
    children: children,
    filename: '',
    title: '',
    rootPath: '',
  }
}

module.exports = makeDirNode
