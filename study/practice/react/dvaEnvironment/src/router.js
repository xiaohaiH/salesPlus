import React from 'react';
import { Router, Route } from 'dva/router';
import { Switch } from 'react-router-dom';
import IndexPage from './routes/IndexPage';
import products from './routes/products';

console.log(Switch)

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/products" component={products} />
      <Route path="/" component={IndexPage} />
    </Router>
  );
}
export default RouterConfig;
