const embedHtml = require('./embed-html')

const renderPage = function(tmplMap, pageInfo) {
  const template = pageInfo.screen ? tmplMap.get('screen-spec') : tmplMap.get('plain-spec')
  const html = embedHtml(template, pageInfo)
  return Promise.resolve(html)
}

module.exports = renderPage
