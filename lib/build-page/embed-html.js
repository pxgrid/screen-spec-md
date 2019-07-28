const makeTemplateContext = require('./make-template-context')

/**
 * @param handlebarsTemplate
 * @param pageInfo
 * @param isEditable
 * @returns {*}
 */
const embedHtml = function(handlebarsTemplate, pageInfo, isEditable) {
  return handlebarsTemplate(makeTemplateContext(pageInfo, isEditable))
}

module.exports = embedHtml
