import React from 'react';
import {BrowserRouter as Router,Route,Link,Redirect,Switch} from 'react-router-dom';

const Test = () => (
  <Router>
    <div>
      <ul>
        <li><Link to='/'>首页</Link></li>
        <li><Link to='/about'>关于(跳转到联系界面)</Link></li>
        <li><Link to='/contact'>联系</Link></li>
        <li><Link to='/lost'>这个是找不到页面的</Link></li>
        <li><Link to='/aabbcc'>这个也是找不到页面的</Link></li>
      </ul>
      <Switch>
        <Redirect from='/about' to='contact' />
        <Route exact path='/' component={() => <h3>这个是首页</h3>} />
        <Route path='/about' component={() => <h3>这个是关于我们,能看到这个说明重定向失效了</h3>} />
        <Route path='/contact' component={() => <h3>这个是联系的页面,如果你是从关于组件跳转过来的话,说明重定向成功</h3>} />
        <Route component={({location}) => <h3>这个是404页面,能访问到这里说明这个路由没有提前定义或没有找到,来源于此路径 ---->   {location.pathname}</h3>} />
      </Switch>
    </div>
  </Router>
);

export default Test;