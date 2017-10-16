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
      // models: () => [ import('./models/login/') ],
      component: () => import('./routes/login/')
    },
    {
      path: '/home',
      // models: () => [ import('./models/home/') ],
      component: () => import('./routes/home/')
    }
  ];
  const loginVerify = localStorage.getItem('loginVerify');
  let { _store: { dispatch } } = app;
  // history.listen(({ pathname }) => {
  //   console.log(pathname)
  //   if(pathname === '/'){
  //     loginVerify ? dispatch(routerRedux.push('home')) : dispatch(routerRedux.push('/'))
  //   }else{
  //     loginVerify ? '' : dispatch(routerRedux.push('/'))
  //   }
  // })
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
