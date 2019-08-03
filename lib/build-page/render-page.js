const embedHtml = require('./embed-html')

const renderPage = function(tmplMap, pageInfo, { isEditable }) {
  const template = pageInfo.screen ? tmplMap.get('screen-spec') : tmplMap.get('plain-spec')
  const html = embedHtml(template, pageInfo, { isEditable })
  return Promise.resolve(html)
}

module.exports = renderPage
