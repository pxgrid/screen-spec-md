const marked = require('marked')

const UiflowMDRenderer = require('../ui-flow/UiflowMDRenderer')

const renderer = new UiflowMDRenderer()

// idに対して`#日本語`でもジャンプできるように
renderer.heading = function(text, level) {
  return `<h${level} id="${text}">${text}</h${level}>`
}

marked.setOptions({
  renderer: renderer,
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
})

/**
 * ↑で定義してるカスタムレンダラーを使ってMarkdownをHTMLにする処理。
 *
 */
function md2html(md) {
  return marked(md)
}

module.exports = md2html
