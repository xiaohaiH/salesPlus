import { HeaderModalSelect, HeaderModalFirstLinkage, HeaderModalSecondLinkage, HeaderModalThreeLinkage } from '../../../components/verify/AllData';

const timer = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
const deepCopy = obj => JSON.parse(JSON.stringify(obj));
/* 以数据源为模板,生成数据->(不让 name 重名) -> name 名等于 name + 1    @dataArr: 数据源, @dataSource: 已经存在的数据 */
const createLinkageSources = (dataArr = [], dataSources = []) => {
  if(!dataArr.length) return ;
  const index = dataSources.length && Number(dataSources[dataSources.length - 1][0]['attr']['names'].split(/\w+[^\d]/)[1]) + 1
  let result = [];
  dataArr.map((item, i) => {
    if (!item || (item instanceof Array && !item.length)) return false;
    let generate = {};
    Object.keys(item).map(key => {
      if (!item[key] || (item[key] instanceof Array && !item[key].length)) return false;
      const { selector, attr: { names, ...attr }, ...props } = item[key];
      generate[key] = {
        selector: item[key]['selector'],
        attr: {
          names: names + index,
          ...attr
        },
        ...props
      }
    });
    result.push(generate)
  });
  return result;
}
/**
*	数据源 @type: 元素类型, @names: 元素 ID, @firstSources: 第一个元素的数据, @secondSources: 第二个元素的数据, @threeSources: 第三个元素的数据,
*/
const dataSources = ({ type = 'select', firstNames = 'firstColumnName', secondNames = 'secondCondition', firstSources = [], secondSources = [], threeSources = {} }) => {
  return [
    {
      '0': {
        selector: type,
        attr: {
          names: firstNames
        },
        sources: firstSources
      },
      '1': {
        selector: type,
        sources: secondSources,
        attr: {
          names: secondNames
        }
      },
      '2': threeSources,
      '3': {
        selector: 'Icon',
        attr: {
          names: 'del'
        }
      }
    }
  ]
}



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
        let { code, data: firstSources } = yield call(HeaderModalFirstLinkage, payload);
        // console.log(firstSources)
        let result = [];
        if (code === 'success'){
          if (firstSources.length){
            const secondSources = yield call(HeaderModalSecondLinkage, firstSelected);
            const firstSelected = (firstSources.find(ele => ele.selected) && firstSources.find(ele => ele.selected)['key']) || firstSources[0]['key'];
            const secondSelected = (secondSources.find(ele => ele.selected) && secondSources.find(ele => ele.selected)['key']) || secondSources[0]['key'];
            const threeSources = yield call(HeaderModalThreeLinkage, firstSelected, secondSelected);
            const sources = dataSources({ firstSources, secondSources, threeSources });
            result = yield call(createLinkageSources, sources);
          }
        };
        yield put({ type: 'getModalContentData', payload: result })
      }
    },
    /* 三级联动 first 下拉框 */
    *firstModalChange({ payload: { firstType, index } }, { call, put }){
      const secondOrderLinkage = yield call(HeaderModalSecondLinkage, firstType);
      const selected = (secondOrderLinkage.find(obj => obj.selected) || ((secondOrderLinkage[0]['selected'] = true) && secondOrderLinkage[0]))['key'];
      let threeOrderLinkage = yield call(HeaderModalThreeLinkage, firstType, selected);
      if (!(threeOrderLinkage instanceof Array)) {
        const atr = {
          attr: {
            names: threeOrderLinkage.attr.names + index
          }
        }
        threeOrderLinkage = Object.assign(threeOrderLinkage, atr)
      };
      yield put({ type: 'getSecondLinkageValue', payload: { secondOrderLinkage, index }});
      yield put({ type: 'getThreeLinkageValue', payload: { threeOrderLinkage, index }})
    },
    /* 三级联动 second 下拉框 */
    *secondModalChange({ payload: { firstType, firstCondition, index} }, { call, put }){
      let threeOrderLinkage = yield call(HeaderModalThreeLinkage, firstType, firstCondition);
      // console.log(threeOrderLinkage)
      if (!(threeOrderLinkage instanceof Array)) {
        const atr = {
          attr: {
            names: threeOrderLinkage.attr.names + index
          }
        }
        threeOrderLinkage = Object.assign(threeOrderLinkage, atr)
      };
      yield put({ type: 'getThreeLinkageValue', payload: { threeOrderLinkage, index } })
    },
    /* 添加条件 */
    *addAllCondition({ payload }, { call, put, select }){
      let { code, data: firstSources } = yield call(HeaderModalFirstLinkage, payload);
      const allDataSources = yield select(state => state.headerAside.modalContentData)
      let result = [];
      if (code === 'success') {
        if (firstSources.length) {
          const secondSources = yield call(HeaderModalSecondLinkage, firstSelected);
          const firstSelected = (firstSources.find(ele => ele.selected) && firstSources.find(ele => ele.selected)['key']) || firstSources[0]['key'];
          const secondSelected = (secondSources.find(ele => ele.selected) && secondSources.find(ele => ele.selected)['key']) || secondSources[0]['key'];
          const threeSources = yield call(HeaderModalThreeLinkage, firstSelected, secondSelected);
          const sources = dataSources({ firstSources, secondSources, threeSources });
          result = yield call(createLinkageSources, sources, allDataSources);
        }
      };
      yield put({ type: 'addModalContentData', payload: result })
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
      modalContentData[index][1]['sources'] = secondOrderLinkage;
      return {
        ...state,
        modalContentData
      }
    },
    getThreeLinkageValue({ modalContentData, ...state }, { payload: { index, threeOrderLinkage } }){
      modalContentData[index][2] = threeOrderLinkage;
      return {
        ...state,
        modalContentData
      }
    },
    delCondition({ modalContentData, ...state }, { payload }){
      return {
        ...state,
        modalContentData: modalContentData.filter((e, i) => i !== payload)
      }
    },
    addModalContentData({ modalContentData, ...state }, { payload }){
      return {
        ...state,
        modalContentData: modalContentData.concat(payload)
      }
    }
  },
  subscriptions: {}
};

