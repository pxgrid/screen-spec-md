const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    spec: './src/spec.js',
    index: './src/index.js',
    doc: './src/doc.js',
    'image-canvas': './src/image-canvas.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist', '_screen-spec-md'),
    publicPath: '/_screen-spec-md/',
  },
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /assets\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /assets\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.html/,
        use: 'raw-loader',
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([{ from: './node_modules/handlebars/dist/handlebars.js', to: './' }]),
    new CopyWebpackPlugin([{ from: './public/dummies/tree.json', to: '../' }]),
    new WriteFilePlugin(), // This is necessary for CopyWebpackPlugin used with webpack-dev-server
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({
      filename: '../doc.html',
      template: './public/doc.html',
      excludeChunks: ['image-canvas', 'spec', 'index'],
    }),
    new HtmlWebpackPlugin({
      filename: '../spec.html',
      template: './public/spec.html',
      excludeChunks: ['image-canvas', 'doc', 'index'],
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './public/index.html',
      excludeChunks: ['image-canvas', 'spec', 'doc'],
    }),
    new HtmlWebpackPlugin({
      filename: '../__image-canvas.html',
      template: 'public/__image-canvas.html',
      excludeChunks: ['doc', 'index', 'spec'],
    }),
  ],
}
