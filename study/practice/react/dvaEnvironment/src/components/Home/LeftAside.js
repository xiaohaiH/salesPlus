import React from 'react';
import dva, { connect } from 'dva';
import { Link } from 'dva/router';
import { Menu, Icon, Button } from 'antd';
import styled from '@/assets/Home/LeftAside.less';

const app = dva();

app.model({
  namespace: 'count',
  state: {
    record: 0,
    current: 0,
  }
});


const SubMenu = Menu.SubMenu;

const UserOptions = ({ className }) => {
  return (
    <ul className={ className }>
      <li><Link to="/userOption">个人选项</Link></li>
      <li>注销</li>
    </ul>
  );
}

const AsideTop = ({onClick, type, userName, onClickUser, state, userState}) => {
  const userStateStorage = userState ? styled.asideTopShrink : styled.asideTopExtend;
  return (
    <div>
      <figure className={styled.asideTop + ' ' + userStateStorage} >
        <Icon type="smile" className={styled.userImg} />
        <figcaption className={styled.userName}>
          <span>{userName}</span>
          <Icon onClick={ onClickUser } type="caret-down" style={{color: '#8095A8'}} />
          <UserOptions className={ state ? styled.userOptions : styled.userOptions + ' ' + styled.hide } />
        </figcaption>
      </figure>
      <p className={styled.navShrink} onClick={ onClick }>
        <Icon type={type} />
      </p>
    </div>
  );
};

const ListBox = ({ api, inlineCollapsed, listState }) => {
  const listStateStorage = inlineCollapsed ? styled.listShrink : '';
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
        return (<SubMenu key={i} title={(<span><Icon type={val.icon} /><span>{val.val}</span></span>)} >{c}</SubMenu>);
      }else{
        return (<Menu.Item key={val.val}><span><Icon type={val.icon}/>{ val.jump ? <span><Link to={val.jump}>{val.val}</Link></span> : <span>{val.val}</span> }</span></Menu.Item>);
      }
    })
  };
  return (
    <Menu
      className={ styled.list + ' ' + listStateStorage }
      // defaultSelectedKeys={['首页']}
      mode="vertical"
      theme="dark"
      selectable={true}
      inlineCollapsed={inlineCollapsed}
    >
    {api.content ? list(api.content) : ''}
    </Menu>
  )
}

class LeftAside extends React.Component {
  constructor( props ){
    console.log(props)
    super(props);
    this.toggleCollapsed = this.toggleCollapsed.bind(this);
    this.userOptions = this.userOptions.bind(this);
  }
  state = {
    collapsed: false,
    listWidth: styled.bigAside,
    userName: '管理员',
    userOption: false,
    leftListData: {}
  }
  /* 菜单伸缩 */
  toggleCollapsed = (test) => {
    this.setState({
      collapsed: !this.state.collapsed,
      listWidth: this.state.collapsed ? styled.bigAside : styled.smallAside
    });
  }
  /* 个人信息 */
  userOptions = () => {
    this.setState({userOption: !this.state.userOption})
  }
  render() {
    return (
      <div className={`${styled.leftAside} ${this.state.listWidth}`} >
        <AsideTop userName={this.state.userName} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} userState={ this.state.collapsed } state={this.state.userOption} onClick={this.toggleCollapsed} onClickUser={this.userOptions} />
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

// LeftAside.propTypes = {
//   users: PropTypes.object,
// };

function mapStateToProps({ users }) {
  return {users};
}
export default connect( mapStateToProps )(LeftAside,{ss: 12});