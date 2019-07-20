const embedHtml = require('./embed-html')

const renderPage = function(tmplMap, pageInfo) {
  const template = pageInfo.screen ? tmplMap.get('screen-spec') : tmplMap.get('doc')
  const html = embedHtml(template, pageInfo)
  return Promise.resolve(html)
}

module.exports = renderPage
