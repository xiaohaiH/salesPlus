import React, { Component } from 'react';

// import ReactDOM from "react-dom";
// import Home from './View/Home/Home';
// import UrlArguments from './View/UrlArguments/UrlArguments';
// import Redirect from './View/Redirect/Redirect';

import Redirect from './View/Redirect/Redirect';
import Indexa from './View/Redirect/index';
import Test from './View/Redirect/test';
import LastRedirect from './View/Redirect/lastRedirect';

/* 组件跳转弹出提示框 */
import IsBlocking from './View/IsBlocking/IsBlocking';

/* Switch 重定向和404页面 */
import Lost from './View/SwitchAndNotMatch/index';

/* 递归路径 */
import RecursionPath from './View/RecursionPath/RecursionPath';
/* 递归路径第二遍练习 */
import RecursionPathParctice from './View/RecursionPath/parcticeAndFormSubmit';

/* 侧边栏 */
import SideBar from './View/SideBar/sidebar';

class App extends Component {
  render() {
    return (
      <div onClickCapture={this.handleClick}>
        {/* <Home /> */}
        {/* <UrlArguments /> */}

        <div style={{overflow: 'hidden',background: 'purple'}}>
          {/* 抄官网做的 */}
          <div style={{padding: '40px 5%',background: 'orange',float: 'left',width: '40%'}}>
            <p style={{color:'white'}}>抄官网做的</p>
            <Redirect />
          </div>
          {/* 模仿官网做的 */}
          <div style={{padding: '40px 5%',background: 'darkviolet',float: 'right',width: '40%'}}>
            <p style={{color:'white'}}>模仿官网做的</p>
            <Indexa />
          </div>
        </div>
        <div style={{overflow: 'hidden',background: 'purple'}}>
          {/* 呃,简化版,没官网写的好 */}
          <div style={{padding: '40px 5%',background: 'violet',float: 'left',width: '40%'}}>
            <p style={{color:'white'}}>呃,简化版,没官网写的好</p>
            <Test />
          </div>
          {/* 利用原型写的,跟test类似 */}
          <div style={{padding: '40px 5%',background: 'yellowgreen',float: 'right',width: '40%'}}>
            <p style={{color:'white'}}>利用原型写的,跟test类似</p>
            <LastRedirect />
          </div>
        </div>
        
        {/* 组件跳转弹出提示框 */}
        <IsBlocking />
        
        {/* Switch 重定向和404页面 */}
        <div style={{padding: '40px 50px',background: 'greenyellow'}}>
          <Lost />
        </div>
        <div style={{overflow: 'hidden',background: 'purple'}}>
          {/* 递归路径 */}
          <div style={{padding: '40px 5%',background: 'darkorange',float: 'left',width: '40%'}}>
            <RecursionPath />
          </div>
          {/* 递归路径第二遍练习 */}
          <div style={{padding: '40px 5%',background: 'violet',float: 'right',width: '40%'}}>
            <RecursionPathParctice />
          </div>
        </div>
        <div style={{padding: '40px 50px',background: 'dark',overflow: 'hidden'}}>
          <SideBar />
        </div>
      </div>
    );
  }
};



//实现css动画
// class App extends Component {
  
//   render() {
//     const items = this.state.items.map((item, i) => (
//       <div key={item} onClick={() => this.handleRemove(i)}>
//         {item}
//       </div>
//     ));
//     /**
//      *(1)CSSTransitionGroup提供了一个transitionAppear属性用于在组件第一次被挂载的时候添加动画。
//     *默认情况下，在组件第一次被挂载的时候我们的transitionAppear被设置为false。
//     *如果要为首次挂载添加动画你要使用该属性。它会自动添加 example-appear和example-appear-active.
//     *(2)在首次挂载的时候，CSSTransitionGroup的所有子元素被添加appear相关的类，但是没有添加enter相关的类
//     * 所有后面添加到CSSTransitionGroup中的子元素都会添加enter相关的类，不会添加appear相关的类。
//     *(3)transitionAppear是在0.13后添加的，为了向后兼容默认设置为false。但是默认的transitionEnter和
//     * transitionLeave被设置为true，所以你必须指定transitionEnterTimeout和transitionLeaveTimeout。
//     * 如果你不需要enter和leave相关的动画，请设置transitionEnter={false}或者transitionLeave={false}
//     */
//     return (
//       <Router>
//       <div>
//         <style dangerouslySetInnerHTML={{ __html: this.getCssClss() }} />
//         <button onClick={this.handleAdd}>Add Item</button>
//         <CSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300} transitionAppear={true} transitionAppearTimeout={500}>
//           {items}
//         </CSSTransitionGroup>
//         <Link to=''>123</Link>
//         <Route path='/' render={() => <h3>123</h3>} />
//       </div>
//       </Router>
//     );
//   }
// };


export default App;
