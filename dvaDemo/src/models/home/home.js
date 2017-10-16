import req from '../../utils/request';
import { stringify } from 'query-string';

/* 深度拷贝数组或者对象 */
const deepCopy = (obj, ...val) => {
  let copy = obj instanceof Array ? [] : {};
  /* 将多个数组或对象集合到一个对象并返回结果 */
  if(val.length){
    val.map((item, i) => {
      for(let key in item){
        if(item.hasOwnProperty(key)){
          if(item[key] === item)continue;
          copy[key] = item[key] instanceof Object ? deepCopy(item[key]) : item[key]
        }
      }
    });
  };
  /* 这块是深度拷贝 */
  for(let key in obj){
    if(obj[key].hasOwnProperty){
      if(obj[key] === obj) continue;
      copy[key] = obj[key] instanceof Object ? deepCopy(obj[key]) : obj[key]
    }
  }
  return copy
}
const name = localStorage.getItem('name');
const token = localStorage.getItem('token');
const permission = localStorage.getItem('permission');
const keys = {
  name,
  token,
  permission
};

export default {
  namespace: 'home',
  state: {
    header: [],
    content: [],
    /* content 备份的数据,在筛选的时候操作 */
    contentBack: [],
    /* 编辑时保存的数据 */
    editValue: {},
    /* 添加用户时的状态 */
    addModalStatus: false,
    /* 过滤时的状态 */
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
        content: state.content.filter(val => val.id !== id),
        contentBack: state.content.filter(val => val.id !== id)
      }
    },
    /* 编辑用户的状态管理 */
    editStatusManage(state, { payload: { content } }){
      return {
        ...state,
        content,
        /* 点击编辑或取消编辑时清空编辑时暂存的值 */
        editValue: {}
      }
    },
    /* 编辑时用户改变的值 */
    editChangeValue({ editValue, ...val }, { payload: { editValue: result } }){
      return {
        ...val,
        editValue: Object.assign(editValue, result)
      }
    },
    /* 编辑用户后保存 */
    save(state, { payload: { ...data } }){
      return {
        ...state,
        ...data
      }
    },
    /* 添加用户弹出的 modal 状态 */
    modalStatus(state, { payload: { addModalStatus } }){
      return {
        ...state,
        addModalStatus,
      }
    },
    /* 添加用户 */
    add(state, { payload: { ...val } }){
      return {
        ...state,
        ...val,
        addModalStatus: false
      }
    },
    /* 筛选用户是否显示的状态 */
    filterVisible(state, { payload: { visible:filterStatus } }){
      return {
        ...state,
        filterStatus
      }
    },
    /* 筛选的结果 */
    filterResult(state, { payload: { filterResult:content } }){
      return {
        ...state,
        content
      }
    }
  },
  effects: {
    *resHeaderData({ payload }, { call, put }){
      const params = {
        header: true,
        ...keys
      };
      // const headerData = yield call(req, 'http://easy-mock.com/mock/59cdb90da0ab222a113b8030/parctice/table/head', { body: stringify(params) });
      const headerData = yield call(req, 'http://localhost:99/homeData.php', { body: stringify(params) });
      yield put({ type: 'success', payload: { header: headerData } })
    },
    *resBodyData({ payload }, { call, put }){
      const params = {
        header: false,
        ...keys
      };
      // const content = yield call(req, 'http://easy-mock.com/mock/59cdb90da0ab222a113b8030/parctice/table/body', { body: stringify(params) });
      const content = yield call(req, 'http://localhost:99/homeData.php', { body: stringify(params) });
      let contentBack = deepCopy(content);
      yield put({ type: 'success', payload: { content, contentBack } })
    },
    *resDelete({ payload: { id } }, { call, put }){
      const params = {
        type: 'delete',
        id
      };
      // const { code } = yield call(req, 'http://easy-mock.com/mock/59cdb90da0ab222a113b8030/parctice/dataManage', { body: stringify(params) });
      const { code } = yield call(req, 'http://localhost:99/homeManageData.php', { body: stringify(params) });
      if(code){
        yield put({ type: 'delete', payload: { id } })
      }
    },
    *resEditStatusManage({ payload: { id, content } }, { call, put }){
      let alterValIndex = content.find(val => val.id === id);
      let alterVal = content.find(val => val.id === id);
      /* 改变编辑时的状态 */
      for(const k in alterVal){
        if(typeof alterVal[k].editable !== 'undefined'){
          alterVal[k].editable = !alterVal[k].editable;
        }
      };
      content[alterValIndex] = alterVal;
      yield put({ type: 'editStatusManage', payload: { content }})
    },
    *resSave({ payload : { id, content, editValue } }, { call, put }){
      let index = content.findIndex(val => val.id === id); 
      let val = Object.assign({}, content[index], editValue);
      for(let key in content[index]){
        if(typeof content[index][key].editable !== 'undefined'){
          val[key]['editable'] = false
        }
      };
      content[index] = val;
      // let { code } = yield call(req, 'http://easy-mock.com/mock/59cdb90da0ab222a113b8030/parctice/dataManage', { body: stringify(val) });
      let { code } = yield call(req, 'http://localhost:99/homeSaveData.php', { body: stringify(val) });
      if(code){
        yield put({ type: 'save', payload: { content, contentBack: deepCopy(content) } })
      }
    },
    *resAdd({ payload: { content, val } }, { call, put }){
      // const { code } = yield call(req, 'http://easy-mock.com/mock/59cdb90da0ab222a113b8030/parctice/dataManage', { body: stringify(val) });
      const { code } = yield call(req, 'http://localhost:99/homeAddData.php', { body: stringify(val) });
      let obj = {
        id: parseInt(content[content.length - 1]['id']) + 1
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
        yield put({ type: 'add', payload: { content, contentBack: deepCopy(content) } })
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