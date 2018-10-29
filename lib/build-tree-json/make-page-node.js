const makePageNode = ({ filename, title }) => {
  return {
    type: 'file',
    filename: filename,
    title: title,
  }
}

module.exports = makePageNode
