import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

const Test = (nextState, replace) => {
  console.info('routerEnter:', nextState)
}
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
  return(
    <Router history={history}>
      <Switch>
        {
          routes.map(({ path, ...dynamics }, key) => (
            <Route exact onChange={Test} onEnter={Test} key={key} path={path} component={dynamic({
              app,
              ...dynamics
            })}  />
          ))
        }
        <Route exact onChange={Test} onEnter={Test} component={notFound} />
      </Switch>
    </Router>
  )
}
export default RouterConfig;