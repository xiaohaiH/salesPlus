import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { deleteLocalStorage } from '../../snow/localStorage';
import { routerRedux } from 'dva/router';
import { Menu, Icon, Button, Switch, Dropdown, Badge, Avatar } from 'antd';
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
    const menu = val === 'cutOff' ? <MenuDivider key={key} className='divisionLine' /> : <MenuItem key={key}><Link to={jump}><Icon type={icon} /><span>{val}</span></Link></MenuItem>
    return menu
  })
};

class LeftSidebar extends Component{
  constructor(props){
    super(props);
    this.shink = this.shink.bind(this);
    this.userOptions = this.userOptions.bind(this);
    this.handleOutsideMuneBtn = this.handleOutsideMuneBtn.bind(this);
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
  /* 点击菜单外部的收缩按钮 */
  handleOutsideMuneBtn(){
    const { dispatch } = this.props;
    dispatch({ type: 'leftSidebar/handleBtnShowMenu' })
  }
  render(){
    let { leftSidebar: { data, menuShink, showMenu, showOutsideBtn } } = this.props;
    let userName = localStorage.getItem('username');
    let MenuProps = menuShink ? { inlineCollapsed: menuShink } : {};
    let zeroWidth = { width: '0!important' };
    return (
      <div className={styled.aside}>
        <div className={`${styled.box} ${menuShink ? styled.boxShink : styled.boxStretch} ${showMenu ? styled.noTtransition : styled.zeroWidth }`}>
          <div className={styled.title}>
            {
              menuShink ?
                <div>
                  <Dropdown trigger={['click']} overlay={Option('#', this.userOptions)}>
                    <Badge><Avatar className={`${styled.userPortrait} ${styled.cursor}`} icon='user' /></Badge>
                  </Dropdown>
                </div>
                :
                <div>
                  <Badge count={1}><Avatar className={`${styled.userPortrait}`} style={{ marginBottom: '.8rem' }} icon='user' /></Badge>
                  <Dropdown trigger={['click']} overlay={Option('#', this.userOptions)}>
                    <p className={styled.cursor}><span>个人选项</span><Icon type="down" /></p>
                  </Dropdown>
                </div>
            }
            {
              <Icon onClick={this.shink} className={`${styled.cursor} ${showOutsideBtn || styled.hide}`} type={menuShink ? 'menu-unfold' : "menu-fold"} />
            }
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
        {
          showOutsideBtn || <p onClick={this.handleOutsideMuneBtn} className={`${styled.outsideBtn} ${styled.cursor}`}><Icon type={ showMenu ? "double-left" : "double-right"} /></p>
        }
      </div>
    )
  }
}
export default LeftSidebar
// export default connect(({ leftSidebar }) => ({ leftSidebar }))(LeftSidebar)