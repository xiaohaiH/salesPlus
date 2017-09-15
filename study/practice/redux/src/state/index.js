export default (state = { value: 0, valueState: 0}, action = {}) => {
  const value = state.value;
  const valueState = state.valueState;
  switch(action.type){
    case 'up' :
      return Object.assign({}, state, { value: value + 1 })
    case 'down' : 
      return Object.assign({}, state, { value: value - 1 })
    case 'upValue':
      return Object.assign({}, state, { valueState: valueState + 1})
    case 'downValue':
      return Object.assign({}, state, { valueState: valueState - 1 })
    default :
      return state
  }
}

