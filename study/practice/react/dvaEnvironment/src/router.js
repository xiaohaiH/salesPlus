import React from 'react';
import { Router, Route } from 'dva/router';
import { Switch } from 'react-router-dom';
import dynamic from 'dva/dynamic';



import Users from "./routes/Users";
import IndexPage from './routes/IndexPage'

function RouterConfig({ history }) {

  // const Users = dynamic({
  //   app,
  //   modules: () => [import ('./models/users')],
  //   conponents: () => import ('./routes/Users')
  // })

  return (
    <Router history={history}>
      <div>
        <Route path="/users" component={Users} />
        <Route path="/" component={Users} />
      </div>
    </Router>
  );
}
export default RouterConfig;
