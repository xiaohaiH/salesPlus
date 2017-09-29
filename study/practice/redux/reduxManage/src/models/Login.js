import { routerRedux } from 'dva/router';
import request from '../utils/Login'

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
export default {
  namespace: 'userLogin',
  state:{
    sss: 10,
    //登陆状态
    userLoginStatus: false,
    //显示提示框
    userLoginHint: { state: false, msg: '' },
    show: false
  },
  subscriptions: {
    setup({ dispatch, history }){
      return history.listen(({ pathname }) => {
        // console.log(pathname)
        if(pathname === '/login'){
          // console.log(132)
        }
      })
    }
  },
  effects: {
    *login({ payload }, { call, put }){
      const data = yield call(request, 'http://easy-mock.com/mock/59cdb90da0ab222a113b8030/parctice/login');
      // if(data.success){
      if(data.fail){
        yield put({ type: 'userLoginSuccess', payload: { ...data } });
        alert('登陆成功')
        yield put(routerRedux.push('/'))
      }else{
        yield put({ type: 'userLoginFail', payload: { ...data } });
        // alert('登陆失败')
        console.log('登陆失败');
        // yield put({ type: 'show' });
      }
    }
  },
  reducers: {
    userLoginSuccess(state, { payload }){
      return {  userLoginStatus: true, userLoginHint: { state: false, msg: payload.msg } }
    },
    userLoginFail(state, { payload }){
      console.log(payload)
      return { sss: 11, userLoginStatus: false, userLoginHint: { state: true, msg: payload.msg }, show: true }
    }
  }
}