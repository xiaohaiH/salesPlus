## resolve.alias  -> Object
```
为 import 或 require 经常引入的模块或路径创建别名;
示例: 
alias: {
  @: path.resolve(__dirname, 'src'),
  Utilities: path.resolve(__dirname, 'src/utilities/'),
}
```
## resolve.enforceExtension -> Boolean
```
如果true，它不会允许无扩展文件,默认为 false 
示例: 默认情况下: require('./foo') 等同于 require('./foo.js')
```
## resolve.extensions -> array
```
自动解决某些扩展,当用户在引入文件时不需要输入扩展名  import File from './index'
示例: extensions: [".js", ".json", "css"]
```
## resolve.mainFiles  -> array
```
解析目录是要使用的文件名: 
示例: mainFiles: ["index","home"]
```
## resolve.modules  -> array
```
设置 webpack 解析模块时搜索哪些目录,使用绝对路径只搜索给定的目录,使用相对路径会搜索它的祖先目录.
示例: modules: [path.resolve(__dirname, "src"),"node_modules"]  默认只有 node_modules,当添加目录时放在它的前面,优先级高于默认目录.
```
## resolve.plugins  -> array
```
允许插入额外的插件
示例: plugins: [new DirectoryNamedWebpackPlugin()]
```

## resolveLoader  -> object
```
与 resolve 属性相同,但仅用于解析 webpack 的加载程序包
示例: {
  modules: ["node_modules"],
  extensions: [".js",".json"],
  mainFields: ["loader","main"]
}
```

## Condition  -> object
```
可以是下列条件其中之一: 
  字符串 ->  要匹配输入必须从提供的字符串开始,绝对目录路径或文件的绝对路径
  正则  ->  它使用输入进行测试
  函数  ->  它与输入一起调用，并且必须返回一个真值来匹配
  一系列条件 ->  至少有一个条件必须匹配
  对象  ->  所有属性必须匹配,每个属性都有一个定义的行为
  { test: Condition }: 条件必须匹配,这个约定是在这里提供一个RegExp或者RegExps数组,但是没有被强制执行
  { include: Condition }: 条件必须匹配,约定是在这里提供一个字符串或字符串数​​组,但不执行
  { exclude: Condition }: 条件不能匹配,约定是在这里提供一个字符串或字符串数​​组,但不执行
  { and: [Condition] }: 所有条件必须匹配
  { or: [Condition] }: 任何条件必须匹配
  { not: [Condition] }: 所有条件不得匹配
示例: 
  {
    test: /\.css$/,
    include: [
      path.resolve(__dirname, "app/styles"),
      path.resolev(__dirname, "vendor/styles")
    ]
  }
```