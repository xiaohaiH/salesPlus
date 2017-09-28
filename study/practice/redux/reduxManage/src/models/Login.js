import { routerRedux } from 'dva/router';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
export default {
  namespace: 'app',
  state:{
    loginLoading: false
  },
  subscriptions: {
    setup({ dispatch }){}
  },
  effects: {
    *login({ payload }, { call, put }){
      yield put({ type: 'showLoginLoading' });
      yield call(delay, 2000);
      yield put({ type: 'hideLoginLoding' });
      yield call(delay, 1000);
      yield put(routerRedux.push('/'))
    }
  },
  reducers: {
    showLoginLoading(state){
      console.log(11)
      return { loginLoading: true }
    },
    hideLoginLoading(state){
      return { loginLoading: false }
    }
  }
}