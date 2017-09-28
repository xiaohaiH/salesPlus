import React from 'react';
import { Router, Route } from 'dva/router';

const RouterConfig = ( { history, app } ) => {
  const routes = [
    {
      path: '/',
      getIndexRoute(nextState, cb){
        require.ensure([], require => {
          cb(null, { component: require('@/components/Home/IndexPage') })
        })
      },
      childRoutes: [ require('@/routes/Login/'), require('@/routes/Test/') ]
    }
  ];
  return <Router history={ history } routes={ routes } />
}


export default RouterConfig;
