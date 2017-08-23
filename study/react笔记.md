## 以下事件处理器,捕获触发,在事件名字后追加 Capture 字符串,冒泡触发正常写
```
例: 使用 onClickCapture 而不是 onClick 来在捕获阶段处理点击事件。
剪贴板事件: 事件名: onCopy,onCut,onPaste  属性: DOMDataTransfer,clipboardData;
键盘事件: 事件名: onKeyDown,onKeyPress,onKeyUp  属性: boolean altKey,Number charCode,boolean ctrlKey,function getModifierState(key),String key,Number keyCode
焦点事件: 事件名: onFocus,onBlur  属性: DOMEventTarget,relatedTarget;
表单事件: 事件名: onChange,onInput,onSubmit;
鼠标事件: 事件名: onClick,onDoubleClick,onDrag,onDragEnd,onDragEnter,onDragExit,onDragLeave,onDragOver,onDragStart,onDrop,onMouseDown,onMouseEnter,onMouseLeave,onMouseMove,onMouseOut,onMouseOver,onMouseUp  属性: boolean altKey,Number button,Number buttons,Number clientX,Number clientY,boolean ctrlKey,function getModifierState(key),boolean metaKey,Number pageX,Number pageY,DOMEventTarget relatedTarget,Number screenX,Number screenY,boolean shiftKey;
触摸事件:在渲染所有组件之前调用 React.initializeTouchEvents(true) --- 事件名: onTouchCancel,onTouchEnd,onTouchMove,onTouchStart  属性: boolean altKey,DOMTouchList changedTouches,boolean ctrlKey,function getModifierState(key),boolean metaKey,boolean shiftKey,DOMTouchList targetTouches,DOMTouchList touches;
UI 事件: 事件名: onScroll  属性: Number detail,DOMAbstractView view;
滚轮事件: 事件名: onWheel  属性: Number deltaMode,Number deltaX,Number deltaY,Number deltaZ;
```

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



