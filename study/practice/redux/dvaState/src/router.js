import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

const RouteConfig = ({ history, app }) => {
  const notFound = dynamic({
    app,
    component: () => import('./components/404/')
  });
  const routes = [
    {
      path: '/',
      component: () => import('./components/Home/IndexPage')
    },
    {
      path: '/login',
      models: () => [],
      component: () => import('./components/Login/')
    },
    {
      path: '/test',
      models: () => [],
      component: () => import('./components/Test/')
    },
    {
      path: '/test/ss',
      models: () => [],
      component: () => import('./components/Test2/')
    }
  ];
  return (
    <Router history={history}>
      <Switch>
        {
          routes.map(({ path, ...dynamics }, key) => (
            <Route
              key={key}
              exact
              path={path}
              component={ dynamic({ app, ...dynamics }) }
            />
          ))
        }
        <Route exact component={ notFound } />
      </Switch>
    </Router>
  )
};

export default RouteConfig;