import req from '../../utils/request';
import { stringify } from 'query-string';

export default {
  namespace: 'home',
  state: {
    header: [],
    content: [],
    contentBack: [],
    addModalStatus: false,
    filterStatus: false
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
      console.log(state.content[0].name.value, state.contentBack[0].name.value, content)
      return {
        ...state,
        // content
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
      console.log(state, content)
      return {
        ...state,
        content,
        addModalStatus: false
      }
    },
    filterVisible(state, { payload: { visible:filterStatus } }){
      return {
        ...state,
        filterStatus
      }
    },
    filterResult(state, { payload: { filterResult:content } }){
      return {
        ...state,
        content
      }
    }
  },
  effects: {
    *resHeaderData({ payload }, { call, put }){
      const name = localStorage.getItem('name');
      const token = localStorage.getItem('token');
      const permission = localStorage.getItem('permission');
      const params = {
        name,
        header: true,
        token,
        permission
      };
      const headerData = yield call(req, 'http://localhost:99/homeData.php', { body: stringify(params) });
      yield put({ type: 'success', payload: { header: headerData } })
    },
    *resBodyData({ payload }, { call, put }){
      const name = localStorage.getItem('name');
      const token = localStorage.getItem('token');
      const permission = localStorage.getItem('permission');
      const params = {
        name,
        header: false,
        token,
        permission
      };
      const contentData = yield call(req, 'http://localhost:99/homeData.php', { body: stringify(params) });
      yield put({ type: 'success', payload: { content: contentData, contentBack: contentData } })
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