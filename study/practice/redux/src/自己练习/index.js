import React from 'react';
/* 引入 react 将元素挂载到 dom 中 */
import ReactDom from 'react-dom'
/* 引入 redux 管理状态 */
import { createStore } from 'redux'
/*  */
import { Provider } from 'react-redux'
/* 引入初始化状态值 */
import reducer from './state/index'
/* 引入组件(父子组件的属性传递 store) */
import Counter from './components/index'
/* 引入组件(Provider 和 connect 传递 store) */
import CounterTwo from './components/counter'
/* 使用初始化状态 */
const store = createStore(reducer);

// const render = () => {
//   ReactDom.render(
//     <Provider store={ store }>
//       <div>
//         <div>
//           通过 react-redux -> Provider 和 connect 传递 store
//           <CounterTwo />
//         </div>
//       </div>
//     </Provider>,
//     document.getElementById('root')
//   )
// }
// render()
// // store.subscribe(render)
const render = () => {
  ReactDom.render(
    <div>
      通过父子组件的属性传递 store
      <Counter value={store.getState().value} up={() => store.dispatch({ type: 'up' })} down={() => store.dispatch({ type: 'down' })} />
    </div>,
    document.getElementById('root')
  )
}
render()
store.subscribe(render)


ReactDom.render(
  <Provider store={ store }>
    <div>
        通过 react-redux -> Provider 和 connect 传递 store
        <CounterTwo />
    </div>
  </Provider>,
  document.getElementById('example')
)