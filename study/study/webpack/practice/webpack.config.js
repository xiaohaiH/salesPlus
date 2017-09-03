const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./src/index.js','./src/index2.js'],/* 入口文件 */
  output: {/* 输出文件和输出目录 */
    filename: 'bundle.js',
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules: [ /* rules -> 指定模块解析规则  use -> 指定用什么 loader */
      {
        test: /\.css$/, /* 注意,这里直接写正则,不需要打引号 */
        use: [
          'style-loader',/* loader 放置是有顺序的,这个必须放在 css-loader 前面 */
          'css-loader'
        ]
      }
    ]
  },
  plugins: [ /* 这块是写插件的,可以到官网去查看支持的插件 */
    new webpack.optimize.UglifyJsPlugin({ /* 将代码精简压缩 */
      compress: {
        warnings: false
      }
    })
  ],
  devServer: {
    contentBase: './dist',  /* 设置本地服务器的根目录,可以设置多个目录服务以数组的形式展示,相对或绝对路径均可 */
    // host: '192.168.1.100',  /* 设置主机,外部网络访问本地时配置,这个配置必须写本机 IP ,可不设置 */
    port: 8081,  /* 设置端口号 */
    watchContentBase: true,  /* 设置是否实时刷新 */
    // inline: true, /* 当源文件改变没有自动刷新时,可以试下这条命令 */
    // historyApiFallback: true, /* 开发单页应用时使用,设置为 true 时,所有跳转将指向 index.html,可以对象的方法自行配置,具体请见官网 */
    compress: true, /* 启用所有服务器的 gzip 压缩 */
    open: true,  /* 当服务器启动时,自动打开浏览器 */
    openPage: ''  /* 指定浏览器打开时要浏览的页面 */
  }
}