import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

const RouterConfig = ({ history, app }) => {
  const notFound = dynamic({
    app,
    components: () => import('./components/404/')
  });
  const routes = [
    {
      path: '/',
      models: () => [ import('./models/Login') ],
      component: () => import('./components/Login/')
    },
    {
      path: '/table',
      models: () => [ import('./models/Table') ],
      component: () => import('./components/Table/')
    }
  ]
  return (
    <Router history={ history }>
      <Switch>
        {
          routes.map(({ path, ...dynamics }, key) => {
            return <Route exact key={key} path={path} component={
              dynamic({
                app,
                ...dynamics
              })
            } />
          })
        }
        <Route exace component={ notFound } />
      </Switch>
    </Router>
  )
}
export default RouterConfig;