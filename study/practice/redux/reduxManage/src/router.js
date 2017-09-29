import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

const RouteConfig = ({ history, app }) => {
  const notFound = dynamic({
    app,
    component: () => import('./components/404/')
  });
  const routes =[
    {
      path: '/',
      component: () => import('./components/Home/')
    },
    {
      path: '/login',
      models: () => [ import('./models/Login') ],
      component: () => import('./components/Login/')
    },
    {
      path: '/test',
      component: () => import('./components/Test/')
    },
    {
      path: '/test/child',
      component: () => import('./components/Test/Child/')
    },
    {
      path: '/table',
      models: () => [ import('./models/Tabel') ],
      component: () => import('./components/Table/')
    }
  ];
  return (
    <Router history={history}>
      <Switch>
        {
          routes.map(({ path, ...dynamics }, key) => (
            <Route key={key} exact path={path} component={ dynamic({ app, ...dynamics }) } />
          ))
        }
        <Route exact component={notFound} />
      </Switch>
    </Router>
  )
}
export default RouteConfig;