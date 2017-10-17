// import { routerRedux } from 'dva/router';
import { deepCopy } from '../../../components/snow/deepCopy'
import { sidebarData } from '../../../components/verify/leftSidebar';
export default {
  namespace: 'leftSidebar',
  state: {
    data: [],
    menuShink: false
  },
  effects: {
    *resData({ payload }, { call, put }){
      let { code, data } = yield call(sidebarData);
      if(code === 'success'){
        data = deepCopy(data);
        yield put({ type: 'receptionData', payload: data })
      }
    }
  },
  reducers: {
    receptionData(state, { payload: data }){
      return {
        ...state,
        data
      }
    },
    /* 菜单收缩 */
    handleClickShrink({ menuShink, ...state }){
      return {
        ...state,
        menuShink: !menuShink
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }){
      return history.listen(({ pathname }) => {
        if(pathname !== '/'){
          dispatch({ type: 'resData' })
        }
      })
    }
  }
}