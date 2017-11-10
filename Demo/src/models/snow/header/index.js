import { HeaderModalSelect, HeaderModalFirstLinkage, HeaderModalSecondLinkage, HeaderModalThreeLinkage } from '../../../components/verify/AllData';

const timer = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));
const deepCopy = obj => JSON.parse(JSON.stringify(obj));
/* 以数据源为模板,生成数据->(不让 name 重名) -> name 名等于 name + 1    @dataArr: 数据源, @dataSource: 已经存在的数据 */
const createLinkageSources = (dataArr = [], dataSources = []) => {
  if(!dataArr.length) return ;
  const index = dataSources.length && Number(dataSources[dataSources.length - 1][0]['attr']['names'].split(/\w+[^\d]/)[1]) + 1
  let result = [];
  dataArr.map((item, i) => {
    if (!item || (item instanceof Array && !item.length) || (item instanceof Object && !Object.keys(item).length)) return false;
    let generate = {};
    Object.keys(item).map(key => {
      if (!item[key] || (item[key] instanceof Array && !item[key].length) || (item[key] instanceof Object && !Object.keys(item[key]).length)) return false;
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
const dataSources = ({ type = 'select', firstNames = 'allFirstColumnName', secondNames = 'allSecondCondition', firstSources = [], secondSources = [], threeSources = {} }) => {
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
  /* 返回 model 数据属性名, @modelName: 数据源名字, eleName: 元素名称 */
const backProperty = (modelName, eleName) => {
  if (eleName === 'model' || eleName === undefined) {
    return modelName ? 'anyCondition' : 'allCondition'
  };
  return modelName ? 'any' + eleName : 'all' + eleName
}


export default {
  namespace: 'headerAside',
  state: {
    // 高级搜索模态框的状态
    advancedSearchModal: false,
    // 模态框标题 select 框的数据
    modalSelectData: [],
    // 模态框内容的数据 @showCondition: 是否显示条件筛选框, @allCondition: 所有条件, @anyCondition: 任一条件
    modalContentData: {
      showCondition: false,
      allCondition: [],
      anyCondition: []
    },
    // modalContentData: []
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
        yield put({ type: 'getModalContentData', payload: { result: { allCondition: [], anyCondition: [] }, showCondition: false } })
      } else {
        // yield call(timer, 1000);
        let { code, data: firstSources } = yield call(HeaderModalFirstLinkage, payload);
        let result = {};
        if (code === 'success'){
          if (firstSources.length){
            const secondSources = yield call(HeaderModalSecondLinkage, firstSelected);
            const firstSelected = (firstSources.find(ele => ele.selected) && firstSources.find(ele => ele.selected)['key']) || firstSources[0]['key'];
            const secondSelected = (secondSources.find(ele => ele.selected) && secondSources.find(ele => ele.selected)['key']) || secondSources[0]['key'];
            const allThreeSources = yield call(HeaderModalThreeLinkage, firstSelected, secondSelected, 'allThreeEvaluation');
            const anyThreeSources = yield call(HeaderModalThreeLinkage, firstSelected, secondSelected, 'anyThreeEvaluation');
            const allSources = dataSources({ firstSources, secondSources, threeSources: allThreeSources });
            const anySources = dataSources({ firstSources, secondSources, threeSources: anyThreeSources, firstNames: 'anyFirstColumnName', secondNames: 'anySecondCondition'});
            result.allCondition = yield call(createLinkageSources, allSources);
            result.anyCondition = yield call(createLinkageSources, anySources);
          }
        };
        // yield put({ type: 'getModalContentData', payload: { result, showCondition: true } });
        yield put({ type: 'all', payload: { result: result.allCondition, showCondition: true } });
        yield put({ type: 'any', payload: { result: result.anyCondition, showCondition: true } });
      }
    },
    /* 三级联动 first 下拉框 */
    *firstModalChange({ payload: { firstType, index, type } }, { call, put }){
      const secondOrderLinkage = yield call(HeaderModalSecondLinkage, firstType);
      const selected = (secondOrderLinkage.find(obj => obj.selected) || ((secondOrderLinkage[0]['selected'] = true) && secondOrderLinkage[0]))['key'];
      let threeOrderLinkage = yield call(HeaderModalThreeLinkage, firstType, selected, backProperty(type, 'ThreeEvaluation'));
      if (!(threeOrderLinkage instanceof Array)) {
        const atr = {
          attr: {
            names: threeOrderLinkage.attr.names + index
          }
        }
        threeOrderLinkage = Object.assign(threeOrderLinkage, atr)
      };
      yield put({ type: 'getSecondLinkageValue', payload: { secondOrderLinkage, index, type: backProperty(type) }});
      yield put({ type: 'getThreeLinkageValue', payload: { threeOrderLinkage, index, type: backProperty(type) }})
    },
    /* 三级联动 second 下拉框 */
    *secondModalChange({ payload: { firstType, firstCondition, index, type } }, { call, put }){
      let threeOrderLinkage = yield call(HeaderModalThreeLinkage, firstType, firstCondition, backProperty(type, 'ThreeEvaluation'));
      // console.log(threeOrderLinkage)
      if (!(threeOrderLinkage instanceof Array)) {
        const atr = {
          attr: {
            names: threeOrderLinkage.attr.names + index
          }
        }
        threeOrderLinkage = Object.assign(threeOrderLinkage, atr)
      };
      yield put({ type: 'getThreeLinkageValue', payload: { threeOrderLinkage, index, type: backProperty(type) } })
    },
    /* 添加条件 */
    *addAllCondition({ payload: { searchRange, type } }, { call, put, select }){
      let { code, data: firstSources } = yield call(HeaderModalFirstLinkage, searchRange);
      const allDataSources = yield select(state => state.headerAside.modalContentData[backProperty(type)])
      let result = [];
      if (code === 'success') {
        if (firstSources.length) {
          const secondSources = yield call(HeaderModalSecondLinkage, firstSelected);
          const firstSelected = (firstSources.find(ele => ele.selected) && firstSources.find(ele => ele.selected)['key']) || firstSources[0]['key'];
          const secondSelected = (secondSources.find(ele => ele.selected) && secondSources.find(ele => ele.selected)['key']) || secondSources[0]['key'];
          const threeSources = yield call(HeaderModalThreeLinkage, firstSelected, secondSelected, backProperty(type, 'ThreeEvaluation'));
          const sources = dataSources({ firstSources, secondSources, threeSources, firstNames: backProperty(type, 'FirstColumnName'), secondNames: backProperty(type, 'SecondCondition') });
          result = yield call(createLinkageSources, sources, allDataSources);
        }
      };
      yield put({ type: 'addModalContentData', payload: { result, type: backProperty(type) } })
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
    getModalContentData({ modalContentData, ...state }, { payload: { result, showCondition } }){
      return {
        ...state,
        modalContentData: {
          ...modalContentData,
          showCondition,
          ...result
        }
      }
    },
    getSecondLinkageValue({ modalContentData, ...state }, { payload: { index, secondOrderLinkage, type } }) {
      modalContentData[type][index][1]['sources'] = secondOrderLinkage;
      return {
        ...state,
        modalContentData
      }
    },
    getThreeLinkageValue({ modalContentData, ...state }, { payload: { index, threeOrderLinkage, type } }){
      modalContentData[type][index][2] = threeOrderLinkage;
      return {
        ...state,
        modalContentData
      }
    },
    delCondition({ modalContentData, ...state }, { payload: { index, type } }){
      return {
        ...state,
        modalContentData: {
          ...modalContentData,
          [type]: modalContentData[type].filter((e, i) => i !== index)
        }
      }
    },
    addModalContentData({ modalContentData, ...state }, { payload: { result, type } }){
      return {
        ...state,
        modalContentData: {
          ...modalContentData,
          [type]: modalContentData[type].concat(result)
        }
      }
    }
  },
  subscriptions: {}
};

