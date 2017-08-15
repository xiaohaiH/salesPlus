import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link,Redirect,withRouter} from 'react-router-dom';

/* 定义基本组件 */
const Auth = () => (
  <Router>
    <div>
      <LoginShow />
      <ul>
        <li><Link to='/public'>随便你看</Link></li>
        <li><Link to='/protected'>先登录才可以看这个秘密</Link></li>
      </ul>

      <Route path='/public' component={Public} />
      <Route path='/login' component={Login} />
      <ProtectedRoute path='/protected' component={Protected} />
    </div>
  </Router>
);

/* 定义显示是否登录的条件 */
const isLogin = {
  isLogin: false,
  login(cb){
    this.isLogin = true;
    cb();
  },
  logOut(cb) {
    this.isLogin = false;
    cb();
  }
};

/* 定义组件 */
const LoginShow = withRouter(
  ({history}) => (
    isLogin.isLogin ? (
      <div>
        欢迎回来!
        <button onClick={() => {isLogin.logOut(() => history.push('/'))}} >退出登录</button>
      </div>
    ) : (<div>你还没有登录!</div>)
  )
);
const Public = () => <h3>{'这个里面没有秘密,随便你看0.0'}</h3>;
const Protected = () => <h3>既然你登录了,那就将这个秘密告诉你吧,你靠近点</h3>;

/* 重定向 */
const ProtectedRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={props => (
      isLogin.isLogin ? (<Component {...props}/>) : (<Redirect to={{pathname: '/login',state: {from: props.location}}} />)
    )} />
  );
};

class Login extends Component{
  state = {
    isRedirect: false
  }

  login = () => {
    isLogin.login(
      () => {
        this.setState({isRedirect: true})
      }
    )
  }

  render(){
    const {from} = (this.props.location && this.props.location.state) || {from: {pathname: '/'}};
    const {isRedirect} = this.state;
    if(isRedirect){
      return (
        <Redirect to={from} />
      )
    };
    return (
      <div>
        <p>您必须登录才能查看此组件内容</p>
        <button onClick={this.login}>登录</button>
      </div>
    )
  }
};
// const Login = () => (
//   isLogin.isLogin ? <h3>既然你登录了,那就将这个秘密告诉你吧,你靠近点</h3> : <p><span>请先登录在查看</span><button onClick={isLogin.login(({history}) => {history.push('/login')})}></button></p>
// );

export default Auth;