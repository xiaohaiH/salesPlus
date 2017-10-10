import req from '../../utils/request';
import { stringify } from 'query-string';

export default {
  namespace: 'home',
  state: {
    header: [],
    content: [],
    // addSataus: false
  },
  reducers: {
    success(state, { payload: { ...result } }){
      return {
        ...state,
        ...result
      }
    },
    'delete'(state, { payload: { id }}){
      return {
        ...state,
        content: state.content.filter((val) => val.id !== id)
      }
    },
    editStatusManage(state, { payload: { content } }){
      return {
        ...state,
        content
      }
    },
    save(state, { payload: { ...data } }){
      console.log(data)
      return {
        ...state,
        ...data
      }
    }
  },
  effects: {
    *resHeaderData({ payload }, { call, put }){
      const obj = {
        name: 'a',
        header: true,
        token: 123,
        permission: 'common'
      };
      const headerData = yield call(req, 'http://localhost:99/homeData.php', { body: stringify(obj) });
      yield put({ type: 'success', payload: { header: headerData } })
    },
    *resBodyData({ payload }, { call, put }){
      const params = {
        name: 'a',
        header: false,
        token: 123,
        permission: 'common'
      };
      const contentData = yield call(req, 'http://localhost:99/homeData.php', { body: stringify(params) });
      yield put({ type: 'success', payload: { content: contentData } })
    },
    *resDelete({ payload: { id } }, { call, put }){
      const params = {
        type: 'delete',
        id
      };
      const { success } = yield call(req, 'http://localhost:99/homeManageData.php', { body: stringify(params) });
      if(success){
        yield put({ type: 'delete', payload: { id } })
      }
    },
    *resEditStatusManage({ payload: { value, content, type } }, { call, put }){
      let updataValIndex = content.findIndex(val => val.id === value.id);
      let updataVal = content.find(val => val.id === value.id);
      for(const k in updataVal){
        if(typeof updataVal[k].editable !== 'undefined'){
          updataVal[k].editable = !updataVal[k].editable;
        }
        if(typeof updataVal[k] === 'object' && type !== 'save'){
          updataVal[k].value = value[k];
        }
      };
      content[updataValIndex] = updataVal;
      yield put({ type: 'editStatusManage', payload: { content }})
    }
  },
  subscriptions: {
    setup({ dispatch, history }){
      return history.listen(({ pathname, search }) => {
        if(pathname === '/home'){
          dispatch({ type: 'resHeaderData', payload: { a: 1 } })
          dispatch({ type: 'resBodyData', payload: { a: 1 } })
        }
      })
    }
  }
}