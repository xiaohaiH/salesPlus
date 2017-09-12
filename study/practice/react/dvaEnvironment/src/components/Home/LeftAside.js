import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Menu, Icon, Button } from 'antd';
import styled from '@/assets/Home/LeftAside.less';

const SubMenu = Menu.SubMenu;

const userInfo = () => {
  return (
    <ul>
      <li><Link to="/userOption">个人选项</Link></li>
      <li>注销</li>
    </ul>
  );
}

const AsideTop = ({onClick,type}) => {
  return (
    <div>
      <figure className={styled.asideTop} >
        <Icon type="smile" style={{color: '#58A3D2', fontSize: '54px'}} />
        <figcaption>
          这里是个变量 <Icon type="caret-down" style={{color: '#8095A8'}} />
        </figcaption>
      </figure>
      {/* <Button className={styled.navShrink} type="primary" onClick={onClick} > */}
      <p className={styled.navShrink} onClick={onClick}>
        <Icon type={type} />
      </p>
      {/* </Button> */}
    </div>
  );
};


const ListBox = ({api}) => {
    const list = (listData) => {
      return listData.map((val,i) => {
        if(val.val === 'cutOff'){
          return (<Menu.Divider key={val.val} className={styled.dividingLine} />);
        };
        let c = '';
        if(val.children){
          c = list(val.children);
        };
        if(c){
          return (<SubMenu key={val.val} title={(<span><Icon type={val.icon} /><span>{val.val}</span></span>)} >{c}</SubMenu>);
        }else{
          return (<Menu.Item key={val.val}><Icon type={val.icon}/> <span>{val.val}</span></Menu.Item>);
        };
      });
    }
    return (
    <Menu
      className={styled.list}
      defaultSelectedKeys={['1']}
      // defaultOpenKeys={['sub1']}
      mode="vertical"
      theme="dark"
      // inlineCollapsed={this.state.collapsed}
    >
    {list(listApi.content)}
    </Menu>
  );
}

class LeftAside extends React.Component {
  state = {
    collapsed: false,
    listWidth: styled.bigAside
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      listWidth: this.state.collapsed ? styled.bigAside : styled.smallAside
    });
  }
  render() {
    return (
      <div className={`${styled.leftAside} ${this.state.listWidth}`} >
        <AsideTop type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggleCollapsed} />
        <ListBox />
      </div>
    );
  }
}

/*
class LeftAside extends React.Component {
  state = {
    collapsed: false,
    listWidth: styled.bigAside
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      listWidth: this.state.collapsed ? styled.bigAside : styled.smallAside
    });
  }
  render() {
    return (
      <div className={`${this.state.listWidth} ${styled.leftAside}`} >
        <AsideTop type={this.state.collapsed ? 'double-right' : 'double-left'} onClick={this.toggleCollapsed} />
        <Menu
          className={styled.list}
          defaultSelectedKeys={['1']}
          // defaultOpenKeys={['sub1']}
          mode="vertical"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>Option 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>Option 3</span>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
          <Menu.Divider className={styled.dividingLine} ></Menu.Divider>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="11">Option 11</Menu.Item>
              <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
*/

export default connect()(LeftAside);