import { HomeFilterList } from '../../components/verify/AllData'

export default {
  namespace: 'home',
  state: {
    richTextState: {
      /* 富文本是否处于编辑中 */
      richTextEditing: false,
      /* 富文本的值 */
      richTextValue: '',
      /* 富文本提交时的组别 */
      group: [
        {
          key: 'public',
          selected: 'true',
          value: '公共组'
        },
        {
          key: 'dev',
          value: '前端组'
        },
        {
          key: 'market',
          value: '销售组'
        },
      ]
    },
    /* 筛选框列表 */
    filterList: {}
  },
  effects: {
    /* 改变富文本提交的类别 */
    *groupChange({ payload }, { put, select }){
      let getGroup = yield select(_ => _.home.richTextState.group);
      getGroup = getGroup.map(item => {
        item.key === payload ? (item.selected = true) : (item.selected = false);
        return item;
      })
      yield put({ type: 'changeRichTextValue', payload: { key: 'group', value: getGroup } })
    },
    /* 添加筛选列表 */
    *addFilterList(action, { put, call }){
      const { code, data } = yield call(HomeFilterList);
      if(code === 'success'){
        yield put({ type: 'getFilterList', payload: data })
      }
    }
  },
  reducers: {
    /* 改变富文本值 */
    changeRichTextValue({ richTextState: { ...val }, ...state }, { payload: { key, value } }){
      return {
        ...state,
        richTextState: {
          ...val,
          [key]: value,
        }
      }
    },
    getFilterList({ filterList, ...state }, { payload }){
      return {
        ...state,
        filterList: payload
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }){
      return history.listen(({ pathname }) => {
        if(pathname === '/home'){
          dispatch({ type: 'addFilterList'})
        }
      })
    }
  }
}