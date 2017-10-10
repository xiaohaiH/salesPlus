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
      // const { code, data } = yield call(req,'http://localhost:99/dvaDemoLogin.php',{ body: JSON.stringify({ ...payload }) });
      const { code, data } = { code: 'success', userInfo: { name: 'a', token: 123, permission: 456 } };
      console.log(code)
      if(code === 'success'){
        yield put({ type: 'success', payload: { ...data } });
        localStorage.setItem('login','true');
        yield put(routerRedux.push('/home'))
      }else{
        localStorage.setItem('login','false');
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