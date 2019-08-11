const path = require('path')
const yaml = require('js-yaml')
const regexpMarkdownMetaArea = require('../constants/regexp').markdownMeatArea

const parseMetaYaml = (metaRegexpRes, mdPath) => {
  const metaYamlContent = metaRegexpRes[0].replace(/---/g, '')
  try {
    return yaml.safeLoad(metaYamlContent)
  } catch (e) {
    console.log(`YAML section is invalid: ${mdPath}`)
    return {}
  }
}

/**
 * Markdownの先頭のyaml形式で書かれたmeta情報を取得する
 */
const parsePageMd = (md, gitLog, rootDir, mdPath) => {
  const dir = path.dirname(mdPath)
  const result = {
    title: '',
    screen: '',
    absolutesScreen: '',
    mdSource: '',
    filename: path.basename(mdPath.replace(/\.md$/, '.html')),
    dir: dir.replace(/([^(.|/)]$)/, '$1/'),
    fromRoot: path.relative(rootDir, dir).replace(/([^(.|/)]$)/, '$1/'),
    toRoot: path.relative(dir, rootDir).replace(/([^/]$)/, '$1/'),
    updatedAuthorName: gitLog.updated ? gitLog.updated.name : '',
    updatedDate: gitLog.updated ? gitLog.updated.date : '',
    createdAuthorName: gitLog.created.name,
    createdDate: gitLog.created.date,
  }

  const metaRegexpRes = regexpMarkdownMetaArea.exec(md)
  if (!metaRegexpRes) {
    result.mdSource = md
    return result
  }
  const metaYaml = parseMetaYaml(metaRegexpRes, mdPath)
  result.title = metaYaml.title || ''
  result.screen = metaYaml.screen || ''
  result.absolutesScreen = metaYaml.screen
    ? path.resolve('/' + result.fromRoot, metaYaml.screen)
    : ''
  result.mdSource = md.slice(metaRegexpRes[0].length)
  return result
}

module.exports = parsePageMd
