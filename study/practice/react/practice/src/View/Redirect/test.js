import React from 'react';
import {BrowserRouter as Router,Route,Link,Redirect,withRouter} from 'react-router-dom';

/* 定义基本组件 */
const Auth = () => (
  <Router>
    <div>
      <LoginShow />
      <ul>
        <li><Link to='/public'>公开</Link></li>
        <li><Link to='/protected'>私密</Link></li>
      </ul>

      <Route path='/public' component={Public} />
      <Route path='/login' component={Login} />
      <Route path='/protected' component={Protected} />
    </div>
  </Router>
);
/* 定义条件 */
const authVerify = {
  isLogin: false,
  logIn(cb){
    this.isLogin = true;
    cb();
  },
  logOut(cb){
    this.isLogin = false
    cb();
  }
};
/* 定义路由组件 */
const LoginShow = withRouter(
  ({history}) => authVerify.isLogin ? <p><span>欢迎回来</span><button onClick={() => history.push('/')}>退出登录</button></p> : <p>还没有登录</p>
);
const Public = () => <h3>111111111111111111</h3>;
const Login = withRouter(({history}) => authVerify.isLogin ? <Redirect to='/protected' /> : <div><span>未登录</span><button onClick={() => authVerify.logIn(() => history.push('/protected'))}>登录</button></div>);
const Protected = withRouter(
  ({history}) => authVerify.isLogin ? <h3>222222222222222222</h3> : <Redirect to='/login' />
);
export default Auth;