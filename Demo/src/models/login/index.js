import { deepCopy } from '../../components/snow/deepCopy';
import { routerRedux } from 'dva/router';
import { stringify } from 'query-string';
import { loginLocalStorage } from '../../components/snow/localStorage.js';
/* 模拟登录 */
import { verify } from '../../components/verify/login';

const timer = time => new Promise(resolve => setTimeout(resolve,time)); 

export default {
  namespace: 'login',
  state: {
    // 登录提示
    hint: false,
    // 登录状态
    loading: false
  },
  effects: {
    *handleLogin({ payload }, { call, put }){
      const { code, userInfo } = yield call(verify, stringify(payload));
      yield put({ type: 'changeStatus' })
      if(code === 'success'){
        yield call(loginLocalStorage, userInfo);
        yield put({ type: 'changeStatus' });
        yield put(routerRedux.push('/home'))
      }else{
        yield put({ type: 'changeStatus', payload: true })
        // yield call(timer, 100)
        // console.log(123)
        // yield put({ type: 'changeStatus', payload: false })
      }
    }
  },
  reducers: {
    changeStatus(state, { payload: hint = false }){
      let { loading } = state;
      return {
        hint,
        loading: !loading
      }
    }
  },
  subscriptions: {
    setup(history, dispatch){
      // history.listen
    }
  }
}