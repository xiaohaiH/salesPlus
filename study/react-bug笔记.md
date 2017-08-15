### 一: 引入文件中用花括号将名字包裹起来,是指读取引入文件中的方法
```
例: React代表引入的'react'文件,Component代表React下的Component方法
  import React, { Component , DOM } from 'react';
```

### 二: 报错 'React' must be in scope when using JSX  react/react-in-jsx-scope
```
  解决方法: 引入 React 的时候首字母没有大写
```