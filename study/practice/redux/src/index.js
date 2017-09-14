import React from 'react';
/* 引入 react 将元素挂载到 dom 中 */
import ReactDom from 'react-dom'
/* 引入 redux 管理状态 */
import { createStore } from 'redux';
/* 引入初始化状态值 */
import reducer from './state/index'
/* 引入组件 */
import Counter from './components/index'

/* 使用初始化状态 */
const store = createStore(reducer);

const render = () => {
  ReactDom.render(
    <Counter value={store.getState()} up={() => store.dispatch({ type: 'up' })} down={() => store.dispatch({ type: 'down' })} />,
    document.getElementById('root')
  )
}
render()
store.subscribe(render)