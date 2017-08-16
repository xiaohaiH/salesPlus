### 一: 引入文件中用花括号将名字包裹起来,是指读取引入文件中的方法
```
例: React代表引入的'react'文件,Component代表React下的Component方法
  import React, { Component , DOM } from 'react';
```

### 二: 在箭头函数中形参是个对象且对象里面包含冒号时,代表是赋值 冒号前赋值给冒号后 , 且冒号前的值打印会报错--defined
```
例: 
	function test({a,B: b},...val){
		console.log(b);
	};
	test({a:13,B: 45,b: 33},1,3,4); ///45.  B将自己的值赋值给了b  所以是45  此时B是打印不出来的
```
  
## 三: withRouter 函数说明,可用此来进行路由跳转
```
  withRouter参数是一个回调函数,回调函数中的参数是一个Object对象,其中包括 {location,history,match,staticContext}  主要用到的是前三个,location,history和match
  例:     ----  这个是判断是否登录,登录成功显示退出按钮,点击返回根路由
    const LoginShow = withRouter(
      ({history}) => (
        isLogin.isLogin ? (
          <div>
            <span>欢迎回来!</span>
            <button onClick={() => history.push('/')} >退出登录</button>
          </div>
        ) : (<div>你还没有登录!</div>)
      )
    );
```



