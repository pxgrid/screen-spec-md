const path = require('path')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const base = require('./webpack.base.js')
const editable = require('./server/editable')
const DevPlugin = require('./webpack.plugin.dev')

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true,
    after: editable,
  },
  devtool: 'eval-source-map',
  plugins: [
    new CopyWebpackPlugin([{ from: './public/dummies', to: '../' }]),
    new DevPlugin('./public/dummies'),
    // NOTE: 開発中にmdファイル変更をwatchさせてHTML出力をトリガするための苦肉の策
    new HtmlWebpackPlugin({ template: 'public/dummies/screen-spec.md' }),
    new HtmlWebpackPlugin({ template: 'public/dummies/doc.md' }),
  ],
})
