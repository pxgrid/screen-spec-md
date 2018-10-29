const makeDirNode = ({ path, children }) => {
  return {
    type: 'dir',
    path: path,
    children: children,
  }
}

module.exports = makeDirNode
