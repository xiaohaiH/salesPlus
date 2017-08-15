import react,{Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';

class ManyRouter extends Component{
  render(){
    return (
      <Router>
        <div>
          <ul>
            <li><Link to='/home'>首页</Link></li>
            <li><Link to='/health'>健康人生</Link></li>
            <li><Link to='/serve'>服务大厅</Link></li>
            <li><Link to='/about'>关于我们</Link></li>
            <li><Link to='/message'>建议留言</Link></li>
          </ul>
          <Route path='/home' component={Home} />
          <Route path='/health' component={Health} />
          <Route path='/serve' component={Serve} />
          <Route path='/about' component={About} />
          <Route path='/message' component={Message} />
        </div>
      </Router>
    );
  }
}

const Home = () => (
  <div>
    <h3>首页</h3>
    <ul>
      <li><Link to='/health'>健康人生</Link></li>
      <li><Link to='/serve'>服务大厅</Link></li>
      <li><Link to='/about'>关于我们</Link></li>
      <li><Link to='/message'>建议留言</Link></li>
    </ul>
  </div>
);

const Health = () => (
  <div>
    <h3>健康人生</h3>
    <ul>
      <li><Link to='/home'>首页</Link></li>
      <li><Link to='/serve'>服务大厅</Link></li>
      <li><Link to='/about'>关于我们</Link></li>
      <li><Link to='/message'>建议留言</Link></li>
    </ul>
  </div>
);

const Serve = () => (
  <div>
    <h3>服务大厅</h3>
    <ul>
      <li><Link to='/home'>首页</Link></li>
      <li><Link to='/health'>健康人生</Link></li>
      <li><Link to='/about'>关于我们</Link></li>
      <li><Link to='/message'>建议留言</Link></li>
    </ul>
  </div>
);

const About = () => (
  <div>
    <h3>关于我们</h3>
    <ul>
      <li><Link to='/home'>首页</Link></li>
      <li><Link to='/health'>健康人生</Link></li>
      <li><Link to='/serve'>服务大厅</Link></li>
      <li><Link to='/message'>建议留言</Link></li>
    </ul>
  </div>
);

const Message = () => (
  <div>
    <h3>建议留言</h3>
    <ul>
      <li><Link to='/home'>首页</Link></li>
      <li><Link to='/health'>健康人生</Link></li>
      <li><Link to='/serve'>服务大厅</Link></li>
      <li><Link to='/health'>健康人生</Link></li>
    </ul>
  </div>
);

export default ManyRouter;