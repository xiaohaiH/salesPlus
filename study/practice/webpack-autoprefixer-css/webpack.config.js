const path = require('path');
const Clean = require('clean-webpack-plugin');
const Ex = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./src/index.css'],
  output: {
    filename: 'remove.css',
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|less)$/,
        use: Ex.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [require('autoprefixer')]
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new Clean(['dist'],{
      root: '',
      dry: false
    }),
    new Ex('[name].css')
  ]
}