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