import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

console.log();

// import About from '../../Components/Home/About.js';

/* 路由组件 */
const Home = () => {
  return (
    <div>这个是首页</div>
  );
};

const Ab = () => {
  return (
    <Router>
      <div>
        <Link to='/'>侬好啊</Link>
      </div>
    </Router>
  );
};

const About = () => {
  return (
    <Router>
      <div>
        <p>想了解我吗,快来点击吧</p>
        <Link to='/'>返回首页</Link>
      </div>
    </Router>
  );
};

const Introduce = () => {
  return (
    <Router>
      <div>
        <p>my name{'\''}s xiaoHai</p>
        <Link to='/'>返回首页</Link>
      </div>
    </Router>
  );
};

const Tell = () => {
  return (
    <Router>
      <div>
        <p>tel:13873819696</p>
        <p><Link to='/Tell/a'>跳到A</Link></p>
        <p><Link to='/Tell/b'>跳到B</Link></p>
        <p><Link to='/Tell/c'>跳到C</Link></p>
        <Route exact path='/Tell/a' component={NestA} />
        <Route path='/Tell/b' component={NestB} />
        <Route path='/Tell/c' component={NestC} />
      </div>
    </Router>
  );
};

/* 子路由组件 */
const NestA = () => {
  return (
    <div>已跳A</div>
  );
};

const NestB = () => {
  return (
    <div>已跳B</div>
  );
};

const NestC = () => {
  return (
    <div>已跳C</div>
  );
};

/* 要导出的组件集合(首页) */
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App" style={{overflow: 'hidden'}}>
          <div className="App-header">
            <h2>Welcome to React</h2>
          </div>
            <ul style={{float: 'left'}}>
              <li><Link to='/'>home</Link></li>
              <li><Link to='/a'>a</Link></li>
              <li><Link to='/about'>about</Link></li>
              <li><Link to='/Introduce'>Introduce</Link></li>
              <li><Link to='/Tell'>联系方式</Link></li>
            </ul>
            
            <div style={{float: 'left','margin': '0 0 0 200px'}}>
              <Route exact path='/' component={Home} /> 
              <Route path='/about' component={About} />
              <Route path='/a' component={Ab} /> 
              <Route path='/Introduce' component={Introduce} /> 
              <Route path='/Tell' component={Tell} /> 
            </div>
        </div>
      </Router>
    );
  }
};

export default App;
