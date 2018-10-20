const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    tree: './src/tree.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist', '_screen-spec-md'),
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{ from: 'public/**/*', to: '../', flatten: true }]),
    new CopyWebpackPlugin([{ from: 'node_modules/vue/dist/vue.min.js', to: './' }]),
    new WriteFilePlugin(), // This is necessary for CopyWebpackPlugin used with webpack-dev-server
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
  ],
}
