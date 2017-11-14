export default {
  namespace: 'home',
  state: {
    richTextEditing: false,
  },
  effects: {

  },
  reducers: {
    changeRichTextState({ richTextEditing, ...state }){
      return {
        ...state,
        richTextEditing: !richTextEditing
      }
    }
  },
  subscriptions: {

  }
}