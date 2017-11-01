const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); /* 这个以 html 为模板,运行后自动生成 html 且自动引入需要的插件  */
const ImageminPlugin = require('imagemin-webpack-plugin').default; /* 引入图片打包插件 */

module.exports = {
  entry: ['./src/index.js', './src/index2.js', './src/react.js'],
  /* 入口文件 */
  output: { /* 输出文件和输出目录 */
    filename: 'bundle.js',
    // filename: '[chunkhash]-bundle.js',   /* 这个是在文件名前生成 hash 值 */
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',
  module: {
    rules: [ /* rules -> 指定模块解析规则  use -> 指定用什么 loader */ {
      test: /\.js[x]?$/,
      /* 这里是配置转义 ES6 和 JSX 语法 */
      use: [{
        loader: 'babel-loader',
        // options: {  /* babel 需要的配置和选项比较复杂,所以放在同目录下的 .babel 中,这里就不用写了 */
        //   presets: ['es2015','react']
        // }
      }],
      // include: '',  /* 这个是添加必须要处理的文件(夹) */
      exclude: path.resolve(__dirname, 'node_modules') /* 这个是屏蔽不需要处理的文件(夹) */
    }, {
      test: /\.css$/,
      /* 注意,这里直接写正则,不需要打引号 */
      use: [
        'style-loader', /* loader 放置是有顺序的,这个必须放在 css-loader 前面 */ {
          loader: 'css-loader',
          options: {
            modules: true /* 这个选项是 css 样式只作用于当前模块 */
          }
        }, {
          loader: 'postcss-loader',
          /* 这个是配置 css 样式自动添加前缀的 */
          // options: {  /* postcss-loader 会比较多,所以配置在了同目录 postcss.config.js 中,这里就可以注释了 */
          //   plugins: [
          //     require('autoprefixer')
          //   ]
          // }
        }
      ]
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader'
      }]
    }, { /* 这块是用来打包图片的 */
      test: /\.(png|jpe?g|bmp|gif)$/,
      use: [{
        loader: 'url-loader?limit=10000&name=static/img/[name].[ext]' /* 当图片小于 10kb 时,不进行处理,图片大于 10kb 进行压缩并放置 static/img 目录下 */
      }]
    }]
  },
  plugins: [ /* 这块是写插件的,可以到官网去查看支持的插件 */
    new webpack.optimize.UglifyJsPlugin({ /* 将代码精简压缩 */
      compress: {
        warnings: false
      }
    }),
    new webpack.HotModuleReplacementPlugin(), /* 这个插件是模块更新的,还需在 .babelrc 中配置其他数据 */
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.tem1.html',
      // cache: true,  /* 只有在文件更改时才发出文件 */
      filename: 'index.html',
      /* 生成的 html 文件名 */
      // filename: 'index[hash].html', /* html 文件名前添加 hash 值 */
      inject: 'body',
      /* 这个是将注入的文件放在哪个位置,head 为头部,body 为底部 */
      favicon: __dirname + '/src/static/img/favicon.png' /* 引入小图标的路径 */
    }),
    new ImageminPlugin()
  ],
  devServer: {
    contentBase: './dist',
    /* 设置本地服务器的根目录,可以设置多个目录服务以数组的形式展示,相对或绝对路径均可 */
    host: '192.168.31.210',
    /* 设置主机,外部网络访问本地时配置,这个配置必须写本机 IP ,可不设置 */
    port: 8081,
    /* 设置端口号 */
    watchContentBase: true,
    /* 设置是否实时刷新 */
    inline: true,
    /* 当源文件改变没有自动刷新时,可以试下这条命令 */
    hot: true,
    /* 这里是配置热更新的,需要安装插件(HotModuleReplacementPlugin),官方提供 */
    // historyApiFallback: true, /* 开发单页应用时使用,设置为 true 时,所有跳转将指向 index.html,可以对象的方法自行配置,具体请见官网 */
    compress: true,
    /* 启用所有服务器的 gzip 压缩 */
    open: true,
    /* 当服务器启动时,自动打开浏览器 */
    openPage: '' /* 指定浏览器打开时要浏览的页面 */
  }
}