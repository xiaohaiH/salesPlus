
### 一: 报错 'React' must be in scope when using JSX  react/react-in-jsx-scope
```
  解决方法: 引入 React 的时候首字母没有大写
```

### 二: 报错 Recursion(...): A valid React element (or null) must be returned. You may have returned undefined, an array or some other invalid object
```
  解决方法: 
    1. 输出的对象没有返回值
    2. Route(路由)没有定义,或没有 render 返回值
```