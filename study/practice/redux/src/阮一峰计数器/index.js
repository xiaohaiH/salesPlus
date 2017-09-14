import React from 'react'
import ReactDOM from 'react-dom'
/* 引入 redux */
import { createStore } from 'redux'
/* 引入页面组件 */
import Counter from './components/Counter'
/* 引入定义的状态 */
import counter from './reducers'
/* 使用 redux,将初始状态放入到 createStore 中 */
const store = createStore(counter)
const rootEl = document.getElementById('root')

const render = () => ReactDOM.render(
  /**
   * store.getState(): 获取现有的状态值
   * store.dispatch({ type: 'INCREMENT' }): 派发事件
   */
  <Counter value={store.getState()} onIncrement={() => store.dispatch({ type: 'INCREMENT' })} onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
  />,
  rootEl
)
/* 将元素挂载到页面中 */
render()
/* 监听 render 函数,state 发生改变时,自动执行这个函数,在 react 中,将更新函数(render 或者 setState)放入 store.subscribe() 中即可  */
store.subscribe(render)