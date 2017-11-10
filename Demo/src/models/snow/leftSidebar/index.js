// import { routerRedux } from 'dva/router';
import { deepCopy } from '../../../components/snow/deepCopy'
import { sidebarData } from '../../../components/verify/leftSidebar';
export default {
  namespace: 'leftSidebar',
  state: {
    data: [],
    /* 显示隐藏菜单 */
    showMenu: document.body.clientWidth > 800,
    /* 菜单外部的按钮 */
    showOutsideBtn: document.body.clientWidth > 800,
    /* 菜单收缩 */
    menuShink: false
  },
  effects: {
    *resData({ payload }, { call, put }){
      let { code, data } = yield call(sidebarData);
      if(code === 'success'){
        data = deepCopy(data);
        yield put({ type: 'receptionData', payload: data })
      }
    },
    /* 菜单展示 */
    *handleAutoShowMenu({ payload }, { call, put, select }) {
      const { leftSidebar: { showOutsideBtn } } = yield select(_ => _);
      if (showOutsideBtn !== payload){
        yield put({ type: 'autoShowMenu', payload })
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
    },
    /* 菜单自动展示 */
    autoShowMenu({ showMenu, menuShink, showOutsideBtn, ...state }, { payload }){
      return {
        ...state,
        showMenu: payload,
        showOutsideBtn: payload,
        menuShink: !menuShink
      }
    },
    /* 用户控制菜单的展示 */
    handleBtnShowMenu({ showMenu, ...state }){
      return {
        ...state,
        showMenu: !showMenu,
        menuShink: true
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
    },
    onResize({ history, dispatch }){
      return window.onresize = (e) => {
        const usableWidth = document.body.clientWidth > 800;
        // if(!usableWidth){
          dispatch({ type: 'handleAutoShowMenu', payload: usableWidth })
        // }
      }
    }
  }
}