import React from 'react';
import {BrowserRouter as Router,Route,NavLink,Switch} from 'react-router-dom';

const SideBar = () => (
  <Router>
    <div>
      <ul style={{float: 'left'}}>
        <li><NavLink exact to='/'>首页</NavLink></li>
        <li><NavLink to='/detail'>详情</NavLink></li>
        <li><NavLink to='/about'>关于</NavLink></li>
      </ul>
      <div style={{float: 'right'}}>
        <Switch>
          <Route path='/:id' component={({match}) => (<h3>{match.params.id}</h3>)} />
        </Switch>
      </div>
    </div>
  </Router>
);

export default SideBar;