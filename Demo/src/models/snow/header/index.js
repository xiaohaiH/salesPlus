import { HeaderModalSelect, HeaderModalFirstLinkage, HeaderModalSecondLinkage } from '../../../components/verify/AllData';

const timer = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
const deepCopy = obj => JSON.parse(JSON.stringify(obj));

export default {
  namespace: 'headerAside',
  state: {
    // 高级搜索模态框的状态
    advancedSearchModal: false,
    // 模态框标题 select 框的数据
    modalSelectData: [],
    // 模态框内容的数据
    modalContentData: []
  },
  effects: {
    *pressEnter({ payload }, { call, put }){
      if(!payload) return ;
      alert('您正在搜索:' + payload)
    },
    /* 请求模态框下拉列表的数据 */
    *resModalData(action, { call, put }){
      // yield call(timer, 1000);
      const { code, data } = yield call(HeaderModalSelect);
      if(code === 'success'){
        yield put({ type: 'changeModalSelectData', payload: data })
      }
    },
    /* 模态下拉框数据改变后 */
    *moduleChange({ payload }, { call, put }){
      if(payload === 'none'){
        yield put({ type: 'getModalContentData', payload: [] })
      } else {
        yield call(timer, 1000);
        let { code, data } = HeaderModalFirstLinkage(payload);
        let result = [];
        if (code === 'success'){
          result = [
            {
              firstOrderLinkage: {
                selector: 'select',
                attr: {
                  onChange(key){
                    const val = this.children.find(list => list.key === key)['props']['type'];
                    yield put({ type: 'firstModalChange', payload: val})
                  }
                },
                sources: data
              },
              sencondOrderLinkage: {
                selector: 'select',
                sources: [
                  {
                    "key": 'none',
                    "value": 'none'
                  }
                ],
                attr: {
                  name: 'select2'
                }
              },
              threeOrderLinkage: {
                selector: 'input',
                attr: {
                  name: 'select3'
                }
              }
            }
          ];
        };
        // result = deepCopy(result);
        yield put({ type: 'getModalContentData', payload: result })
      }
    },
    *firstModalChange({ payload }, { call, put }){
      if(!payload){
        console.error('数据格式错误');
        return
      }
      if(payload === 'T'){
        yield put({ type: '', payload: [] })
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
    },
    getModalContentData({ modalContentData, ...state }, { payload }){
      return {
        ...state,
        modalContentData: payload
      }
    },
    getLinkageValue({ modalContentData: {  }, ...state }, { payload}){

    }
  },
  subscriptions: {}
};

