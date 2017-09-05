const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const Clean = require('clean-webpack-plugin');

module.exports ={
  entry: ['./src/index.js'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname,'dist')
  },
  resolve: {
    extensions: ['.js','.css']
  },
  devtool: 'eval-source-map',
  module: {
    rules:[
      { /* 配置 css */
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          }
        ]
      },
      { /* 配置 ES6 */
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',

          }
        ]
      }
    ]
  },
  plugins: [
    new Clean(['dist'],{
      root: '',
      verbose: true,
      dry: false
    }),
    new HtmlPlugin({
      template: path.resolve(__dirname,'src/index.html')
    }),
    new HtmlPlugin({
      template: path.resolve(__dirname,'src/index.html'),
      filename: 'test.html'
    })
  ],
  devServer: {
    prot: 8082,
    contentBase: __dirname,
    inline: true
  }
}