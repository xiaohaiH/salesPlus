import React, { Component } from 'react';

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
        <div style={{padding: '40px 50px',background: 'dark'}}>
          <SideBar />
        </div>
      </div>
    );
  }
}

export default App;
