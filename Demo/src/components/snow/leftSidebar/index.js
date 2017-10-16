import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu, Icon, Button, Switch } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

let List = (leftlist) => {
  if(leftlist && !leftlist.length) return;
  return leftlist.map(({val, icon, children, jump}, key) => {
    if(children && children.constructor === Array){
      let child = List(children);
      return (
        <SubMenu key={key} title={<p><Icon type={icon} /><span>{val}</span></p>}>
          {child}
        </SubMenu>
      )
    };
    return <MenuItem key={key}><Icon type={icon} /><span><Link to={jump}>{val}</Link></span></MenuItem>
  })
};
class LeftSidebar extends Component{
  render(){
    let { leftSidebar: { data } } = this.props;
    return (
      <div>
        <Menu>
          <MenuItem>
            {
              List(data)
            }
          </MenuItem>
        </Menu>
      </div>
    )
  }
}
export default connect()(LeftSidebar)