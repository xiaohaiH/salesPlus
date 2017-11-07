import { HeaderModalSelect, HeaderModalFirstLinkage, HeaderModalSecondLinkage, HeaderModalThreeLinkage } from '../../../components/verify/AllData';

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
      let { code, data } = yield call(HeaderModalSelect);
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
                  name: 'firstColumnName'
                },
                sources: data
              },
              secondOrderLinkage: {
                selector: 'select',
                sources: [
                  {
                    "key": 'none',
                    "value": 'none'
                  }
                ],
                attr: {
                  name: 'firstCondition'
                }
              },
              threeOrderLinkage: {
                selector: 'input',
                attr: {
                  name: 'firstEvaluation'
                }
              }
            }
          ];
        };
        // result = deepCopy(result);
        yield put({ type: 'getModalContentData', payload: result })
      }
    },
    *firstModalChange({ payload: { firstColumnName, firstCondition, index } }, { call, put }){
      // if (!type){
      //   console.error('数据格式错误');
      //   return
      // };
      console.log(firstColumnName, firstCondition)
      
      const secondOrderLinkage = HeaderModalSecondLinkage(type);
      const selected = secondOrderLinkage.find(obj => obj.selected);
      if (!selected) {
        secondOrderLinkage[0]['selected'] = true
      };
      const threeOrderLinkage = HeaderModalThreeLinkage(type);
      yield put({ type: 'getSecondLinkageValue', payload: { secondOrderLinkage, index }})
      yield put({ type: 'getThreeLinkageValue', payload: { threeOrderLinkage, index }})
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
    getSecondLinkageValue({ modalContentData, ...state }, { payload: { index, secondOrderLinkage } }) {
      modalContentData[index]['secondOrderLinkage']['sources'] = secondOrderLinkage;
      return {
        ...state,
        modalContentData
      }
    },
    getThreeLinkageValue({ modalContentData, ...state }, { payload: { index, threeOrderLinkage } }){
      modalContentData[index]['threeOrderLinkage'] = threeOrderLinkage;
      return {
        ...state,
        modalContentData
      }
    }
  },
  subscriptions: {}
};

