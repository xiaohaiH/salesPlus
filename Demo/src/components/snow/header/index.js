import React, { Component } from 'react';
import { trim } from '../appMethod';
import { Row, Col, Input, Icon, Modal, Select, message } from 'antd';
import styled from './index.less';
const Search = Input.Search;
const Option = Select.Option;

/* 高级搜索模态框的 title */
const ModalTitle = ({ data }) => {
  if(typeof data !== 'object' || !(data instanceof Array) || !data.length){
    console.error('搜索->高级搜索中传入的数据不是数组,请重新输入数据')
    data = [{ val: 'null', selected: true}];
  };
  let selected = (data.find(obj => obj.selected) && data.find(obj => obj.selected)['val']) || data[0]['val'];
  return (
    <div className={styled.advancedSearchSelectBox}>
      <span>搜索范围:</span>
      <Select
        className={styled.advancedSearchSelect}
        showSearch
        defaultValue={selected}
      >
        {
          data.map(({val}) => (
            <Option key={val} value={val}>{val}</Option>
          ))
        }
      </Select>
    </div>
  );
}
class Header extends Component{
  constructor(props){
    super(props);
    this.pressEnter = this.pressEnter.bind(this);
    this.handleAdvancedSearch = this.handleAdvancedSearch.bind(this);
    this.advancedSearchModalManage = this.advancedSearchModalManage.bind(this);
  }
  pressEnter(str){
    const { dispatch } = this.props;
    str = trim(str);
    if(!str) message.error('请输入正确的搜索内容');
    dispatch({ type: 'headerAside/pressEnter', payload: str })
  }
  /* 点击高级搜索 */
  handleAdvancedSearch(){
    const { dispatch } = this.props;
    dispatch({ type: 'headerAside/resModalData' });
    dispatch({ type: 'headerAside/advancedSearchModalManage' });
  }
  /* 高级搜索模态框的状态 */
  advancedSearchModalManage(e){
    const { dispatch } = this.props;
    dispatch({ type: 'headerAside/advancedSearchModalManage' })
  }
  render(){
    const { advancedSearchModal, modalSelectData } = this.props.headerAside;
    return (
      <header className={styled.box}>
        <Row
          type='flex'
          align='middle'
        >
          <Col className={styled.logo} xs={7} sm={7} md={11} lg={14} xl={17}>
            <img src='./logo.jpg' />
          </Col>
          <Col className={styled.rightBox} xs={17} sm={17} md={13} lg={10} xl={7}>
            <div className={styled.searchBox}>
              <p className={styled.search}>
                <Search onSearch={value => this.pressEnter(value)} placeholder='请输入关键字,按回车键搜索' />
              </p>
              <p className={styled.advancedSearch}>
                <span onClick={this.handleAdvancedSearch} className={styled.cursor}>高级检索</span>
                <Modal
                  title={<ModalTitle data={modalSelectData} />}
                  onCancel={this.advancedSearchModalManage}
                  maskClosable={true}
                  visible={advancedSearchModal}
                >
                  <div className={styled.modalContent}>
                    {
                      '请选择模块'
                    }
                  </div>
                </Modal>
              </p>
            </div>
            <div className={styled.rightBtn}>
              <Icon title='闹铃' type="bell" />
              <Icon title='快速建表' type="plus-circle" />
              <Icon title='日历' type="calendar" />
              <Icon title='报表' type="area-chart" />
              <Icon title='设置' type="setting" />
            </div>
          </Col>
        </Row>
      </header>
    )
  }
}
export default Header