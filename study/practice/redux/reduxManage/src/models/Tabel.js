export default {
  namespace: 'products',
  state: {
    0: { name: 'dva', id: 1, key: 1 },
    1: { name: 'antd', id: 2, key: 2 },
  },
  reducers: {
    'delete'(state, { payload: id }) {
      return { 0: { name: 'dva', id: 1 }, 1: { name: 'dva', id: 1 } }
      return state.filter(item => item.id !== id);
    },
  },
};