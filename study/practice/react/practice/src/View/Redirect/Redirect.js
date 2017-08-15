import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link,Redirect,withRouter} from 'react-router-dom';

/* 设置路由和基本显示的组件 */
const Auth = () => (
  <Router>
    <div>
      <AuthButton />
      <ul>
        <li><Link to='/public'>公共页面</Link></li>
        <li><Link to='/protected'>私人页面</Link></li>
      </ul>
      <Route path='/public' component={Public} />
      <Route path='/login' component={Login} />
      <ProtectedRoute path='/protected' component={Protected} />
    </div>
  </Router>
);

/* 定义 登录 || 未登录 要执行的操作 */
const fakeAuth = {
  isAuthenticated: false,
  signInShow(cb) {
    this.isAuthenticated = true;
    setTimeout(cb,100);
  },
  signOut(cb){
    this.isAuthenticated = false;
    setTimeout(cb,100);
  }
};

/* 这个是判断是否登录,withRouter函数不懂 */
const AuthButton = withRouter(
  ({history}) => (
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome! <button onClick= {() => {fakeAuth.signOut(() => history.push('/'))}}>退出</button>
      </p>
    ) : (<p>你还没有登录</p>)
  )
);


/* 这个是重定向的,参数有点不懂 */
const ProtectedRoute = ({component: Component,...aaa}) => {
  // console.log(Component(),aaa);
  return (
  <Route {...aaa} render={props => (
    fakeAuth.isAuthenticated ? (<Component {...props} />) : (<Redirect to={{pathname: '/login',state: {from: props.location}}} />)
  )} />
)};

/* 这个是定义路由的组件值 */
const Public = () => <h3>Public</h3>;
const Protected = () => <h3>私人页面</h3>;


class Login extends Component {
  state = {
    loginRedirect: false
  }

  login = () => {
    fakeAuth.signInShow(
      () => {
        this.setState({loginRedirect: true})
      }
    )
  }

  render(){
    const {from} = (this.props.location && this.props.location.state) || {from: {pathname: '/'}};
    const {loginRedirect} = this.state;
    if(loginRedirect){
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

export default Auth;
/* class ManyRouter extends Component{
  render(){
    return (
      <Router>
        <div>
          <ul>
            <li><Link to='/'>首页</Link></li>
            <li><Link to='/health'>健康人生</Link></li>
            <li><Link to='/serve'>服务大厅</Link></li>
            <li><Link to='/about'>关于我们</Link></li>
            <li><Link to='/message'>建议留言</Link></li>
          </ul>
          <Route exact path='/' component={Home} />
          <Route path='/health' component={Health} />
          <Route path='/serve' component={Serve} />
          <Route path='/about' component={About} />
          <Route path='/message' component={Message} />
        </div>
      </Router>
    );
  }
};


const Home = () => (
  <div>
    <h3>首页</h3>
    <ul>
      <li><Link to='/health'>返回健康人生</Link></li>
      <li><Link to='/serve'>返回服务大厅</Link></li>
      <li><Link to='/about'>返回关于我们</Link></li>
      <li><Link to='/message'>返回建议留言</Link></li>
    </ul>
  </div>
);

const Health = () => (
  <div>
    <h3>健康人生</h3>
    <ul>
      <li><Link to='/'>返回首页</Link></li>
      <li><Link to='/serve'>返回服务大厅</Link></li>
      <li><Link to='/about'>返回关于我们</Link></li>
      <li><Link to='/message'>返回建议留言</Link></li>
    </ul>
  </div>
);

const Serve = () => (
  <div>
    <h3>服务大厅</h3>
    <ul>
      <li><Link to='/'>返回首页</Link></li>
      <li><Link to='/health'>返回健康人生</Link></li>
      <li><Link to='/about'>返回关于我们</Link></li>
      <li><Link to='/message'>返回建议留言</Link></li>
    </ul>
  </div>
);

const About = () => (
  <div>
    <h3>关于我们</h3>
    <ul>
      <li><Link to='/'>返回首页</Link></li>
      <li><Link to='/health'>返回健康人生</Link></li>
      <li><Link to='/serve'>返回服务大厅</Link></li>
      <li><Link to='/message'>返回建议留言</Link></li>
    </ul>
  </div>
);

const Message = () => (
  <div>
    <h3>建议留言</h3>
    <ul>
      <li><Link to='/'>返回首页</Link></li>
      <li><Link to='/health'>返回健康人生</Link></li>
      <li><Link to='/serve'>返回服务大厅</Link></li>
      <li><Link to='/health'>返回健康人生</Link></li>
    </ul>
  </div>
); 

export default ManyRouter;*/