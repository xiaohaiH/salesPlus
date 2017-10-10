import { Router, Route, Switch } from 'dva/router';
import { routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';

const RouterConfig = ({ history, app}) => {
  const notFound = dynamic({
    app,
    component: () => import('./routes/404')
  });
  const routes = [
    {
      path: '/',
      models: () => [ import('./models/login/login') ],
      component: () => import('./routes/login/index')
    },
    {
      path: '/home',
      models: () => [ import('./models/home/home') ],
      component: () => import('./routes/home/home')
    }
  ];
  /* 验证用户是否登录 start */
  history.listen(({ pathname }) => {
    const examineLogin = localStorage.getItem('login');
    if(pathname === '/'){
      if(examineLogin === 'true'){
        app._store.dispatch(routerRedux.replace('/home'))
      }
    }else{
      if(examineLogin !== 'true'){
        app._store.dispatch(routerRedux.replace('/'))
      }
    }
  })
  /* 验证用户是否登录 end */
  return(
    <Router history={history}>
      <Switch>
        {
          routes.map(({ path, ...dynamics }, key) => (
            <Route exact key={key} path={path} component={dynamic({
              app,
              ...dynamics
            })}  />
          ))
        }
        <Route exact component={notFound} />
      </Switch>
    </Router>
  )
}
export default RouterConfig;