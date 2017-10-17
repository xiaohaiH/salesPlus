import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { deleteLocalStorage } from '../../snow/localStorage';
import { routerRedux } from 'dva/router';
import { Menu, Icon, Button, Switch, Dropdown } from 'antd';
import styled from './index.less';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;
const MenuDivider = Menu.Divider;

/* 个人选项 */
let Option = (jump, handleOption) => (
  <Menu onClick={handleOption}>
    <MenuItem key={1}><Link to={jump}>个人选项</Link></MenuItem>
    <MenuItem key={2}>注销</MenuItem>
  </Menu>
);
/* 列表 */
let List = (leftlist) => {
  if(leftlist && !leftlist.length) return;
  return leftlist.map(({val, icon, children, jump}, key) => {
    if(children && children.constructor === Array){
      let child = List(children);
      return (
        <SubMenu key={key} title={<p className={styled.leftList}><Icon type={icon} /><span>{val}</span></p>}>
          {child}
        </SubMenu>
      )
    };
    const menu = val === 'cutOff' ? <MenuDivider key={key} className='divisionLine' /> : <MenuItem key={key}><Icon type={icon} /><span><Link to={jump}>{val}</Link></span></MenuItem>
    return menu
  })
};
class LeftSidebar extends Component{
  constructor(props){
    super(props);
    this.shink = this.shink.bind(this);
    this.userOptions = this.userOptions.bind(this);
  }
  /* 菜单伸缩 */
  shink(){
    const { dispatch } = this.props;
    dispatch({ type: 'leftSidebar/handleClickShrink' })
  }
  /* 个人选项 */
  userOptions({ key }){
    const { dispatch } = this.props;
    if(key === '2'){
      deleteLocalStorage(['permission', 'username', 'token']);
      dispatch(routerRedux.push('/'));
    }
  }
  render(){
    let { leftSidebar: { data, menuShink } } = this.props;
    let userName = localStorage.getItem('username');
    let MenuProps = menuShink ? { inlineCollapsed: menuShink } : {};
    return (
      <div className={`${styled.box} ${menuShink ? styled.boxShink : styled.boxStretch}`}>
        <div className={styled.title}>
          {
            menuShink ? 
              <div>
                <Dropdown trigger={['click']} overlay={Option('#', this.userOptions)}>
                  <Icon  className={styled.cursor} type="man" />
                </Dropdown>
              </div>
            : 
              <div>
                <Icon type="man" />
                <Dropdown trigger={['click']} overlay={Option('#', this.userOptions)}>
                  <p className={styled.cursor}><span>个人选项</span><Icon type="down" /></p>
                </Dropdown>
              </div>
          }
          <Icon onClick={this.shink} className={styled.cursor} type={menuShink ? 'menu-unfold' : "menu-fold" } />
        </div>
        <Menu
          className={styled.list}
          {...MenuProps}
          theme='dark'
          mode={menuShink ? 'inline' : 'vertical'}
        >
          {
            List(data)
          }
        </Menu>
      </div>
    )
  }
}
export default connect(({ leftSidebar }) => ({ leftSidebar }))(LeftSidebar)