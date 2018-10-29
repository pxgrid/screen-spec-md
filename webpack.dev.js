const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const merge = require('webpack-merge')
const base = require('./webpack.base.js')
module.exports = merge(base, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  devtool: 'eval-source-map',
  plugins: [new CopyWebpackPlugin([{ from: './public/dummies', to: '../' }])],
})
