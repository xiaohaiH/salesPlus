import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

function RouterConfig({ history, app }) {
  const IndexPage = dynamic({
    app,
    component: () => import('./routes/IndexPage.js')
  });
  // const Users = dynamic({
  //   app,
  //   models: () => ([
  //     import ('./models/users')
  //   ]),
  //   component: () => import('./routes/Users')
  // });
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        {/* <Route path="/users" exact component={Users} /> */}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
