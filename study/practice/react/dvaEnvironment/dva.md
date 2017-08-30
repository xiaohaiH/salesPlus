## 路由设置为正常路径
```
在 index.js 设置
import { browserHistory  } from 'dva/router';
const app = dva({
  history: browserHistory
});
```
## 路由设置为哈希路径
```
在 index.js 设置
import { useRouterHistory } from 'dva/router';
```

## 去除 hashHistory 下的 _k 查询参数
```
import { useRouterHistory } from 'dva/router';
import { createHashHistory } from 'history';
const app = dva({
  history: useRouterHistory(createHashHistory)({ queryKey: false }),
});
```

## 设置 @ 表示 src 目录
```
  1.找到这个文件: dvaEnvironment\node_modules\roadhog\lib\config\webpack.config.dev.js
  2.找到此对象:  
    resolve: {
      extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.json', '.jsx', '.ts', 'tsx', '']
    }
    --- var path = require('path') ---
  3.将此对象改为 ↓ ,其中 path 需要引入, __dirname 代表此文件的绝对路径, 中间参数代表要返回的层级,第三个参数代表以此为根目录:
    resolve: {
      extensions: ['.web.js', '.web.jsx', '.web.ts', '.web.tsx', '.js', '.json', '.jsx', '.ts', 'tsx', ''],alias: {
        '@': path.join(__dirname, '../../../../', 'src')
      }
    }
不懂的话可参考 vue -> build\webpack.base.conf.js 文件.
```