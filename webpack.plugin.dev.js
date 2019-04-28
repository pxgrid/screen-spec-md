const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const parsePageMd = require('./lib/parse-page-md/index')
const parseGitLog = require('./lib/utils/git-log')
const embedHtml = require('./lib/build-page/embed-html')

const embedHtmlDummyPage = async (html, pageName, dummiesDirPath) => {
  const template = Handlebars.compile(html)
  const mdPath = path.resolve(dummiesDirPath, `./${pageName}.md`)
  const mdSource = fs.readFileSync(mdPath, 'utf-8')
  const gitLog = await parseGitLog(mdPath)
  const pageInfo = parsePageMd(mdSource, gitLog, dummiesDirPath, mdPath)

  return embedHtml(template, pageInfo).then(html => {
    try {
      return Promise.resolve(html)
    } catch (e) {
      console.error(e)
      return Promise.reject('')
    }
  })
}

class DevPlugin {
  constructor(dummiesDirPath, distDirPath) {
    this.dummiesDirPath = dummiesDirPath
    this.distDirPath = distDirPath
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('DevPlugin', compilation => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('DevPlugin', (data, callback) => {
        const pageName = path.basename(data.outputName, '.html')
        embedHtmlDummyPage(data.html, pageName, this.dummiesDirPath, this.distDirPath).then(
          html => {
            data.html = html
            callback(null, data)
          },
        )
      })
    })
  }
}

module.exports = DevPlugin
