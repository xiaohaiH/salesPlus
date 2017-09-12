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
      <p className={styled.navShrink} onClick={onClick}>
        <Icon type={type} />
      </p>
    </div>
  );
};

const ListBox = ({ api, inlineCollapsed }) => {
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
        }
      })
    };
    return (
      <Menu
        className={styled.list}
        defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        mode="vertical"
        theme="dark"
        inlineCollapsed={inlineCollapsed}
      >
      {api.content ? list(api.content) : ''}
      </Menu>
    )
}

class LeftAside extends React.Component {
  state = {
    collapsed: false,
    listWidth: styled.bigAside,
    leftListData: {}
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
        <ListBox api={this.state.leftListData} inlineCollapsed={this.state.collapsed} />
      </div>
    );
  }
  componentWillMount(){
    const _this = this;
    fetch('http://easy-mock.com/mock/59b624f5e0dc663341a520c6/reactDva/left-list',{method: 'POST'})
    .then(data => {
      if(data.statusText === 'OK'){
        return data.json();
      }else{
        console.log('服务器数据请求失败')
      }
    })
    .then(data => {
      if(data.success){
        _this.setState({leftListData: data});
      }else{
        console.log('数据请求失败')
      };
    })
    .catch(error => console.log('服务器请求失败',error));
  }
}

export default connect()(LeftAside);