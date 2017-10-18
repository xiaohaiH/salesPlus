import { HeaderModalSelect } from '../../../components/verify/AllData';

export default {
  namespace: 'headerAside',
  state: {
    advancedSearchModal: false,
    modalSelectData: []
  },
  effects: {
    *pressEnter({ payload }, { call, put }){
      if(!payload) return ;
      alert('您正在搜索:' + payload)
    },
    /* 请求模态框下拉列表的数据 */
    *resModalData(action, { call, put }){
      const { code, data } = yield call(HeaderModalSelect);
      if(code === 'success'){
        yield put({ type: 'changeModalSelectData', payload: data })
      }
    }
  },
  reducers: {
    advancedSearchModalManage({ advancedSearchModal, ...state}){
      return {
        ...state,
        advancedSearchModal: !advancedSearchModal
      }
    },
    changeModalSelectData({ ...state }, { payload: modalSelectData }){
      return {
        ...state,
        modalSelectData
      }
    }
  },
  subscriptions: {}
}