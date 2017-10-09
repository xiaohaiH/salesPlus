import req from '../../utils/request';
import { stringify } from 'query-string';

export default {
  namespace: 'home',
  state: {
    header: [],
    content: []
  },
  reducers: {
    success(state, { payload: { ...result } }){
      return {
        ...state,
        ...result
      }
    },
    'delete'(state, { payload: { name }}){
      return {
        ...state,
        content: state.content.filter((val) => val.name !== name)
      }
    },
    edit(state,{ payload: { content } }){
      return {
        ...state,
        content
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
    *resDelete({ payload: { name } }, { call, put }){
      const params = {
        type: 'delete',
        name
      };
      const { success } = yield call(req, 'http://localhost:99/homeManageData.php', { body: stringify(params) });
      if(success){
        yield put({ type: 'delete', payload: { name}})
      }
    },
    *resEdit({ payload: { value, content } }, { call, put }){
      let updataValIndex = content.findIndex(val => val.name.value === value.name);
      let updataVal = content.find(val => val.name.value === value.name);
      for(const k in updataVal){
        if(typeof updataVal[k].editable !== 'undefined'){
          updataVal[k].editable = !updataVal[k].editable;
        }
      };
      content[updataValIndex] = updataVal;
      yield put({ type: 'edit', payload: { content }})
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