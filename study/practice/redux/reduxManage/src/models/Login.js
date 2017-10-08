import res from '../utils/Login';
import { routerRedux } from 'dva/router';

const Login = {
  namespace: 'userInfo',
  state: {
    status: false,
    permission: '',
    msg: '',
    show: false,
  },
  effects: {
    *login({ payload }, { put, call }){
      yield put({ type: 'loading', payload: true })
      const result = yield call(res,'http://easy-mock.com/mock/59cdb90da0ab222a113b8030/parctice/login',{ body: 's=这里是要传给后台的参数' });
      if(result.success){
        yield put({ type: 'success', payload: result })
        yield put(routerRedux.push({
          pathname: '/table'
        }))
      }else{
        yield put({ type: 'fail', payload: result })
      }
      yield put({ type: 'loading', payload: false })
    }
  },
  reducers: {
    success(state, { payload }){
      return { ...state, permission: payload.permission, status: true, show: false, msg: '' }
    },
    fail(state, { payload }){
      return { ...state, permission: '', status: false, show: false, msg: payload.msg }
    },
    loading(state, { payload }){
      return { ...state, show: payload }
    }
  },
  subscriptions: {
    setup({ dispatch, history }){
      return history.listen(({ pathname, search }) => {
        if(pathname === '/'){
        }
      })
    }
  }
}
export default Login;