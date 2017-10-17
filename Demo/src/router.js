import React from 'react';
import dynamic from 'dva/dynamic';
import { Router, Route, Switch } from 'dva/router';
import { routerRedux } from 'dva/router';

const RouterConfig = ({ history, app }) => {
  const notFound = dynamic({
    app,
    component: () => import('./routes/404/')
  })
  const routes = [
    {
      path: '/',
      models: () => [ import('./models/login/index.js') ],
      component: () => import('./routes/login/index.js')
    },
    {
      path: '/home',
      models: () => [ import('./models/home/index.js'), import('./models/snow/leftSidebar/index.js') ],
      component: () => import('./routes/home/index.js')
    },
    {
      path: '/ss',
      models: () => [ import('./models/snow/leftSidebar/index.js') ],
      component: () => import('./components/snow/leftSidebar/index.js')
    }
  ];
  history.listen(({ pathname }) => {
    const loginVerify = localStorage.getItem('permission');
    let { _store: { dispatch } } = app;
    if(pathname === '/'){
      loginVerify ? dispatch(routerRedux.push('home')) : ''
    }else{
      loginVerify ? '' : dispatch(routerRedux.push('/'))
    }
  });
  return (
    <Router history={history}>
      <Switch>
        {
          routes.map(({ path, ...dynamics }, key) => (
            <Route key={key} exact path={path} component={dynamic({
              app,
              ...dynamics
            })} />
          ))
        }
        <Route exact component={notFound} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
