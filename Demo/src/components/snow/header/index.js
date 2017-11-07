import React, { Component } from 'react';
import { trim, Linkage } from '../appMethod';
import { Row, Col, Input, Icon, Modal, Select, message, Form, DatePicker } from 'antd';
import styled from './index.less';
const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;


/* 高级搜索模态框的 title */
const ModalTitle = ({ data, onChange }) => {
  if(typeof data !== 'object' || !(data instanceof Array) || !data.length){
    console.error('搜索->高级搜索中传入的数据不是数组,请重新输入数据');
    data = [{ val: 'null', selected: true}];
  };
  let selected = (data.find(obj => obj.selected) && data.find(obj => obj.selected)['val']) || (data[0] && data[0]['val']);
  return (
    <div className={styled.advancedSearchSelectBox}>
      <span>搜索范围:</span>
      <Select
        className={styled.advancedSearchSelect}
        showSearch
        defaultValue={selected}
        onChange={onChange}
      >
        {
          data.map(({val, value}, key) => (
            <Option key={key} value={value}>{val}</Option>
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
    this.advancedSearchSelectChange = this.advancedSearchSelectChange.bind(this);
    this.firstLinkageChange = this.firstLinkageChange.bind(this);
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
  /* 高级搜索 select 框 change 事件 */
  advancedSearchSelectChange(value){
    console.log(value)
    const { dispatch } = this.props;
    dispatch({ type: 'headerAside/moduleChange', payload: value })
  }
  /* 高级搜索三级联动 FirstLinkageChange 事件 */
  firstLinkageChange(value,index){
    console.log(value, index)
    const {firstColumnName, firstCondition} = this.props.form.getFieldsValue(['firstColumnName', 'firstCondition']);
    console.log(firstColumnName, firstCondition)
    const { dispatch } = this.props;
    const type = this.props.headerAside.modalContentData[index]['firstOrderLinkage']['sources'].find(ele => ele.key === value)['type'];
    // const type = this.refs.firstLinkage.props.children.find(ele => ele.key === value)['props']['type'];
    // console.log(this.refs.secondLinkage)
    dispatch({ type: 'headerAside/firstModalChange', payload: { type, firstCondition, index } })
  }
  render(){
    let { advancedSearchModal, modalSelectData, modalContentData } = this.props.headerAside;
    modalContentData = modalContentData.map((item, index) => {
      if(item['firstOrderLinkage']){
        if(item['firstOrderLinkage'].attr){
          item['firstOrderLinkage'].attr.onChange = (value) => this.firstLinkageChange(value, index);
          // item['firstOrderLinkage'].attr.ref = 'firstLinkage'
        } else {
          item['firstOrderLinkage'].attr = { onChange(value){this.firstLinkageChange(value, index)}}
        }
      };
      // if(item['secondOrderLinkage']){
      //   if(item['secondOrderLinkage'].attr){
      //     // item['secondOrderLinkage'].attr.onChange = (value) => this.secondLinkageChange(value, index);
      //     // item['secondOrderLinkage'].attr.ref = 'secondLinkage'
      //   } else {
      //     // item['secondOrderLinkage'].attr = { ref: 'secondLinkage' }
      //   }
      // };
      // if(item['threeOrderLinkage']){
      //   if(item['threeOrderLinkage'].attr){
      //     item['threeOrderLinkage'].attr.ref = 'threeLinkage'
      //   } else {
      //     item['threeOrderLinkage'].attr = { ref: 'threeLinkage' }
      //   }
      // };
      return item
    })
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
                  title={<ModalTitle data={modalSelectData} onChange={(value) => this.advancedSearchSelectChange(value)} />}
                  onCancel={this.advancedSearchModalManage}
                  maskClosable={true}
                  visible={advancedSearchModal}
                  className={styled.modalBox}
                >
                  <div className={styled.modalContent}>
                    {
                      modalContentData.length ? new Linkage({ data: modalContentData, form: this.props.form}) : '请选择模块'
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
Header = Form.create()(Header)
export default Header