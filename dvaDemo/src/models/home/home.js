import req from '../../utils/request';
import { stringify } from 'query-string';

/* 深度拷贝,数组将其转成字符串在转回数组,对象用 Object.create 来进行深度拷贝 */
// const deepCopy = obj => obj instanceof Array ? JSON.parse(JSON.stringify(obj)) : Object.create(obj);
const deepCopy = obj => {
  if(obj instanceof Array){
    let arr = obj.concat();
    arr = arr.map((item, i) => {
      if(item instanceof Object){
        let store = Object.create(item);
        for(let key in store.__proto__){
          store[key] = store.__proto__[key].constructor === Object ? deepCopy(store.__proto__[key]) : store.__proto__[key];
        }
        return store
      };
      return item
    })
    return arr
  }
  if(obj instanceof Object){
    let store = Object.create(obj);
    for(let key in store.__proto__){
      store[key] = store.__proto__[key]
    }
    return store
  };
};

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
    editStatusManage(state, { payload: { content, contentBack } }){
      return {
        ...state,
        content,
        contentBack,
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
      let alterValIndex = content.findIndex(val => val.id === id);
      let alterVal = content.find(val => val.id === id);
      /* 改变编辑时的状态 */
      for(const k in alterVal){
        if(typeof alterVal[k].editable !== 'undefined'){
          alterVal[k].editable = !alterVal[k].editable;
        }
      };
      content[alterValIndex] = alterVal;
      let contentBack = deepCopy(content);
      yield put({ type: 'editStatusManage', payload: { content, contentBack }})
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
      console.log(content)
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