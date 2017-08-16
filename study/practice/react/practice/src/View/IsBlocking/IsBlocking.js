import React from 'react';
import {BrowserRouter as Router,Route,Link,Prompt} from 'react-router-dom';

let flag = true;

/* 当路由之间跳转时,因为某些原因需要提示时,可以用 Prompt 来进行提示,关闭页面等不会产生提示 */

function Test(){
  return (
    <Router>
      <div>
        <Prompt when={flag} message='你要离开?' />
        <div><Link to='/bbb'  >我要离开这个页面</Link></div>
        <Route path='/bbb' render={() => <h3>跳出来了</h3>} />
      </div>
    </Router>
  )
};

export default Test;