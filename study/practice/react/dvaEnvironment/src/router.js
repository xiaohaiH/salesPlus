import React from 'react';
import { Router, Route } from 'dva/router';
import { Switch } from 'react-router-dom';
import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import Home from './routes/Home/Home';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/products" component={Products} />
      <Route path='/home' component={Home} />
      <Route path="/" component={IndexPage} />
    </Router>
  );
}
export default RouterConfig;
