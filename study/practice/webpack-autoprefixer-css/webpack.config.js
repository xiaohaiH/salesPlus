const path = require('path');
const webpack = require('webpack');
const Clean = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const Ex = require('extract-text-webpack-plugin');
const ImgPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle-[chunkhash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {loader: 'html-loader'}
        ]
      },
      {
        test: /\.js(x)?$/,
        use: [
          {loader: 'babel-loader'}
        ]
      },
      {
        test: /\.(css|less)$/,
        use: Ex.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {loader: 'postcss-loader'},
            {loader: 'less-loader'}
          ]
        })
      },
      {
        test: /\.(scss|sass)$/,
        use: Ex.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader'},
            {loader: 'postcss-loader'},
            {loader: 'sass-loader'}
          ]
        })
      },
      {
        test: /\.(jp(e)?g|png|bmp|gif)$/,
        use: [
          {loader: 'file-loader?limit=5000&name=assets/[name]-[hash:8].[ext]'}
        ]
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: './src/main.html',
      innest: 'body',
      filename: 'main-[chunkhash:8].html'
    }),
    new Clean(['dist'],{
      root: '',
      verbose: true,
      dry: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ImgPlugin({
      pngquant: {
        quality: '95-100'
      }
    }),
    new Ex('home.css')
  ]
}