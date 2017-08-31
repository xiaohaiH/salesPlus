import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Menu, Icon, Button } from 'antd';
import style from '@/assets/Home/LeftAside.css';

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
      <figure className={style.asideTop} >
        <Icon type="smile" style={{color: '#58A3D2', fontSize: '54px'}} />
        <figcaption>
          这里是个变量 <Icon type="caret-down" style={{color: '#8095A8'}} />
        </figcaption>
      </figure>
      <Button className={style.navShrink} type="primary" onClick={onClick} >
        <Icon type={type} />
      </Button>
    </div>
  );
};
const listApi = {
  success: true,
  content: [
    {
      val: '首页',
      icon: 'ss'
    },
    {
      val: '销售',
      icon: 'ss',
      children: [
        {
          val: '销售一',
          icon: 'ss'
        },
        {
          val: '销售二',
          icon: 'ss'
        },
        {
          val: '销售三',
          icon: 'ss'
        },
      ]
    },
    {
      val: '服务支持',
      icon: 'ss',
      children: [
        {
          val: '服务支持一',
          icon: 'dd',
          children: [
            {
              val: '服务支持一一',
              icon: 'qq'
            },
            {
              val: '服务支持二二',
              icon: 'qq'
            },
            {
              val: '服务支持三三',
              icon: 'qq'
            },
          ]
        },
        {
          val: '服务支持二',
          icon: 'dd'
        },
        {
          val: '服务支持三',
          icon: 'dd'
        },
        {
          val: '服务支持四',
          icon: 'dd'
        },
      ]
    },
    {
      val: '分析',
      icon: 'ss'
    },
    {
      val: '市场营销',
      icon: 'ss'
    },
    {
      val: '运营',
      icon: 'ss'
    },
    {
      val: '工具',
      icon: 'ss'
    },
    {
      val: 'cutOff',
      icon: 'ss'
    },
    {
      val: '企业协同',
      icon: 'ss'
    },
    {
      val: '回收站',
      icon: 'ss'
    }
  ]
};
const ListBox = ({api}) => {
  // const recursion = (val) => {
  //   if(val.children){
  //     val.children.map(val => recursion(val));
  //   }else{
  //     return (<Menu.Item key={val.val}>{`<Icon type=${val.icon}/> <span>${val.val}</span>`}</Menu.Item>);
  //   };
  // };
    const list = (listData) => {
        return listData.map((val,i) => {
          if(val.children){
            const c = list(val.children);
            return (<SubMenu key='val.val' title={`<span><Icon type=${val.icon} /><span>${val.val}</span></span>`} >{c}</SubMenu>);
          };
          return (<Menu.Item key={val.val}><Icon type={val.icon}/> <span>{val.val}</span></Menu.Item>);
        });

    }
    return (
    <Menu
      className={style.list}
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
    listWidth: 'bigAside___3NOt1'
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      listWidth: this.state.collapsed ? 'bigAside___3NOt1' : 'smallAside___3NOt1'
    });
  }
  render() {
    return (
      <div className={style.leftAside + ' ' + this.state.listWidth} >
        <AsideTop type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggleCollapsed} />
        <ListBox />
      </div>
    );
  }
}

export default connect()(LeftAside);