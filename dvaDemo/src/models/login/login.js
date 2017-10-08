import req from '../../utils/request';
import { routerRedux } from 'dva/router';
import { stringify } from 'query-string';

const delay = (time) => new Promise(resolve => setTimeout(resolve,time))
export default {
  namespace: 'login',
  state: {
    userLoginStatus: false,
    userInfo: {
      name: '',
      token: '',
      permission: ''
    },
    loading: false,
    hint: false
  },
  reducers: {
    success(state, { payload: { userLoginStatus, userInfo: { name, token, permission } } }){
      return {
        ...state,
        userLoginStatus: true,
        userInfo: {
          name: name,
          token: token,
          permission: permission
        }
      }
    },
    fail(state, { payload: { userLoginStatus, userInfo: { name, token, permission }, hint } }){
      return {
        ...state,
        userLoginStatus: false,
        userInfo: {
          name: '',
          token: '',
          permission: ''
        },
        hint
      }
    },
    loading(state, { payload: loading }){
      return {
        ...state,
        hint: false,
        loading
      }
    }
  },
  effects: {
    *loginRes({ payload }, { put, call }){
      yield put({ type: 'loading', payload: true });
      yield call(delay, 2000);
      const { code, data } = yield call(req,'http://localhost/dvaDemoLogin.php',{ body: JSON.stringify({ ...payload }) });
      if(code === 'success'){
        yield put({ type: 'success', payload: { ...data } });
        yield put(routerRedux.push('/table'))
      }else{
        yield put({ type: 'fail', payload: { ...data } })
      };
      yield put({ type: 'loading', payload: false })
    }
  },
  subscriptions: {
    setup({ dispatch, history }){
      return history.listen(({ pathname, search })=>{
        if(pathname !== '/'){
        }
      })
    }
  }
}