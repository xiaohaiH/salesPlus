import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link,Redirect,withRouter} from 'react-router-dom';

class Auth extends Component {
  constructor(props){
    super(props);
    this.state = {isLogin: false};
    this.Public = this.Public.bind(this);
    this.Protected = this.Protected.bind(this);
    this.Login = this.Login.bind(this);
    this.LoginShow = this.LoginShow.bind(this);
  }

  Public(){
    return <h3>1111111111111</h3>;
  }
  
  Protected(){
    if(this.state.isLogin){
      return <h3>2222222222222</h3>;
    };
    return <Redirect to='/login' />;
  }

  Login = withRouter(
    ({history}) => (
      this.state.isLogin ? <Redirect to='/login' /> : (
        <div>
          <span>请登录</span>
          <button onClick={() => {this.setState({isLogin: true});history.push('/protected')}}>登录</button>
        </div>
      )
    )
  )
  
  LoginShow = withRouter(
    ({history}) => this.state.isLogin ? <p><span>欢迎回来!</span><button onClick={() => {this.setState({isLogin: false});history.push('/')}}>退出</button></p> : <p>你还没有登录</p>
  )

  render(){
    return (
      <Router>
        <div>
          <ul>
            <this.LoginShow />
            <li><Link to='/public'>公开</Link></li>
            <li><Link to='/protected'>不公开</Link></li>
          </ul>

          <Route path='/public' component={this.Public} />
          <Route path='/login' component={this.Login} />
          <Route path='/protected' component={this.Protected} />
        </div>
      </Router>
    );
  }
};

export default Auth;