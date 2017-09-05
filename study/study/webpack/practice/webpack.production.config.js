const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); /* 这个以 html 为模板,运行后自动生成 html 且自动引入需要的插件  */
const ExtractTextPlugin = require('extract-text-webpack-plugin'); /* 这个是将 css 单独拎出来打包 */
const CleanWebpackPlugin = require('clean-webpack-plugin'); /* 这个是每次运行前清空输出目录 */
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;

module.exports = {
  entry: ['./src/index.js','./src/index2.js','./src/react.js'],/* 入口文件 */
  output: {/* 输出文件和输出目录 */
    filename: 'bundle-[chunkhash:8].js',   /* 这个是在文件名前生成 hash 值 */
    path: path.resolve(__dirname,'dist')
  },
  module: {
    rules: [ /* rules -> 指定模块解析规则  use -> 指定用什么 loader */
      {
        test: /\.js[x]?$/,  /* 这里是配置转义 ES6 和 JSX 语法 */
        use: [
          {
            loader: 'babel-loader',
            // options: {  /* babel 需要的配置和选项比较复杂,所以放在同目录下的 .babel 中,这里就不用写了 */
            //   presets: ['es2015','react']
            // }
          }
        ],
        // include: '',  /* 这个是添加必须要处理的文件(夹) */
        exclude: path.resolve(__dirname,'node_modules')  /* 这个是屏蔽不需要处理的文件(夹) */
      },
      {
        test: /\.css$/, /* 注意,这里直接写正则,不需要打引号 */
        use: ExtractTextPlugin.extract({  /* 利用社区插件 ExtractTextPlugin 将 css 样式提取出来 */
          fallback: 'style-loader',/* loader 放置是有顺序的,这个必须放在 css-loader 前面 */
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,  /* 将 css 压缩 */
                modules: true  /* 这个选项是 css 样式只作用于当前模块 */
              }
            },
            {
              loader: 'postcss-loader',  /* 这个是配置 css 样式自动添加前缀的 */
              // options: {  /* postcss-loader 会比较多,所以配置在了同目录 postcss.config.js 中,这里就可以注释了 */
              //   plugins: [
              //     require('autoprefixer')
              //   ]
              // }
            }
          ]
        })
      },
      {/* 这块是用来打包图片的 */
        test: /\.(png|jpe?g|bmp|gif)$/,
        use: [
          {
            loader: 'url-loader?limit=10000&name=static/img/[name]-[hash:8].[ext]'  /* 当图片小于 10kb 时,不进行处理,图片大于 10kb 进行压缩并放置 static/img 目录下 */
          }
        ]
      },
      { /* 这一块是检索 html 文件的 */
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true  /* 压缩 html 文件 */
            }
          }
        ]
      },
      // { /* 这块是文件加载器,处理文件静态资源的,暂时用不到 */
      //   test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   loader: 'file-loader?name=./fonts/[name]-[hash:8].[ext]'
      // }
    ]
  },
  plugins: [ /* 这块是写插件的,可以到官网去查看支持的插件 */
    new HtmlWebpackPlugin({
      template: __dirname + '/src/index.tem1.html',
      // cache: true,  /* 只有在文件更改时才发出文件 */
      filename: 'index.html', /* 生成的 html 文件名 */
      // filename: 'index[hash].html', /* html 文件名前添加 hash 值 */
      inject: 'body', /* 这个是将注入的文件放在哪个位置,head 为头部,body 为底部 */
      favicon: __dirname + '/src/img/favicon.png', /* 引入小图标的路径 */
      minify: {
        removeComments: true, /* 删除 html 注释 */
        collapseWhitespace: false /* 删除空白行和换行符 */
      }
    }),
    new CleanWebpackPlugin(['dist'],{
      root: '', /* 为webpack.config.js的根的绝对路径 */
      verbose: true,  /* 是否打印日志 */
      dry: false  /* 不要删除任何东西,对测试有好处 */
    }),
    new webpack.optimize.UglifyJsPlugin(),  /* 将代码精简压缩 */
    new webpack.optimize.OccurrenceOrderPlugin(), /* 为组件分配 id,通过这个插件可以为使用最多的模块分配最小的 id */
    new ExtractTextPlugin('static/css/[name]-[chunkhash:8].css'),  /* 这个是将 css 代码单独拎出来打包并放置哪个目录中 */
    new ImageminWebpackPlugin({ /* 这个是压缩图片的,能减少大概30% */
      pngquant: {
        quality: '95-100'
      }
    })
  ]
}