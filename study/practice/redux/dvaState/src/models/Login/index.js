// import { login } from '';
import { routerRedux } from 'dva/router';

const delay = timeout => new Promise(resolve => { return setTimeout(resolve, timeout)})
module.exports = {
  namespace: 'app',
  state: {
    loginLoading: false
  },
  subscriptions: {
    setup ({dispatch}){

    }
  },
  effects: {
    *login ({ payload }, { call, put }){
      yield put({ type: 'showLoginLoading' })
      yield call(delay, 2000)
      yield put({ type: 'hideLoginLoading' })
      yield call(delay, 2000)
      yield put(routerRedux.push('/'))
    }
  },
  reducers: {
    showLoginLoading (state) {
      return {
        loadingLoading: true
      }
    },
    hideLoginLoading (state) {
      return {
        loginLoading: false
      }
    }
  }
}