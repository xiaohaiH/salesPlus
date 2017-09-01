const path = require('path');
module.exports = {
  entry: './src/index.js',/* 入口文件 */
  output: {/* 输出文件和输出目录 */
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules: [ /* rules -> 指定模块解析规则  use -> 指定用什么 loader */
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}