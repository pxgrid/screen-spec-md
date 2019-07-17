const makeTemplateContext = require('./make-template-context')

/**
 * @param handlebarsTemplate
 * @param pageInfo
 * @returns {*}
 */
const embedHtml = function(handlebarsTemplate, pageInfo) {
  return handlebarsTemplate(makeTemplateContext(pageInfo))
}

module.exports = embedHtml
