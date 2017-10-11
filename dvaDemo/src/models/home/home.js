import req from '../../utils/request';
import { stringify } from 'query-string';

export default {
  namespace: 'home',
  state: {
    header: [],
    content: [],
    addModalStatus: false
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
      return {
        ...state,
        ...data
      }
    },
    modalStatus(state, { payload: { addModalStatus } }){
      return {
        ...state,
        addModalStatus,
      }
    },
    add(state, { payload: { content } }){
      return {
        ...state,
        content,
        addModalStatus: false
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
    },
    *resAdd({ payload: { content, val } }, { call, put }){
      const { code } = yield call(req, 'http://localhost:99/homeSaveData.php', { body: stringify(val) });
      let obj = {
        id: content.length + 1
      };
      for(const key in val){
        if(typeof val[key] !== 'boolean'){
          obj[key] = {};
          obj[key].value = val[key] || '' ;
          val[key + 'Editable'] && (obj[key].editable = false)
        }
      }
      if(code){
        content.push(obj);
        yield put({ type: 'add', payload: { content } })
      }
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