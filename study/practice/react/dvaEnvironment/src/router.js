import React from 'react';
import { Router, Route, Switch } from 'dva/router';
// import IndexPage from './routes/IndexPage';
import products from './routes/products';


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/products" component={products} />
      <Route path="/" component={IndexPage} />
    </Router>
  );
}
export default RouterConfig;
