import req from '../../utils/request';
import { routerRedux } from 'dva/router';
import { stringify } from 'query-string';

// const delay = (time) => new Promise(resolve => setTimeout(resolve,time))
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
      const { code, data } = yield call(req,'http://localhost:99/dvaDemoLogin.php',{ body: JSON.stringify({ ...payload }) });
      if(code === 'success'){
        const { userLoginStatus : login, userInfo: { token, permission, name } } = data;
        yield put({ type: 'success', payload: { ...data } });
        localStorage.setItem('login', login)
        localStorage.setItem('name', name)
        localStorage.setItem('token', token)
        localStorage.setItem('permission', permission)
        yield put(routerRedux.push('/home'))
      }else{
        localStorage.setItem('login', '')
        localStorage.setItem('name', '')
        localStorage.setItem('token', '')
        localStorage.setItem('permission', '')
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