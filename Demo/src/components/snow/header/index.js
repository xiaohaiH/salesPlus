import React, { Component } from 'react';
import { trim, Linkage } from '../appMethod';
import { Row, Col, Input, Icon, Modal, Select, message, Form, DatePicker } from 'antd';
import styled from './index.less';
const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;

// const dataSources = [
//   {
//     eleOne: {
//       selector: 'select',
//       sources: [
//         {
//           key: 'aaa',
//           value: '啊啊啊',
//           'data-va': 'adf',
//           selected: true
//         },
//         {
//           key: 'bbb',
//           value: '不不不',
//           'data-va': 'adf',
//         },
//         {
//           key: 'ccc',
//           value: '吃串串',
//           'data-va': 'adf',
//           selected: false
//         }
//       ],
//       attr: {
//         name: 'select1',
//       }
//     },
//     eleTwo: {
//       selector: 'DatePicker',
//       format: 'YYYY/MM/DD',
//       startDate: '2017/10/10',
//       attr: {
//         name: 'settingDate'
//       }
//     },
//     eleThree: {
//       selector: 'RangePicker',
//       format: 'YYYY/MM/DD',
//       startDate: '2017/10/10',
//       deadline: '2017/10/20',
//       attr: {
//       }
//     }
//   }
// ];



/* 高级搜索模态框的 title */
const ModalTitle = ({ data, onChange }) => {
  if(typeof data !== 'object' || !(data instanceof Array) || !data.length){
    console.error('搜索->高级搜索中传入的数据不是数组,请重新输入数据')
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
  render(){
    const { advancedSearchModal, modalSelectData, modalContentData } = this.props.headerAside;
    console.log(this.props.headerAside)
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
                      modalContentData.length ? new Linkage({ data: modalContentData }) : '请选择模块'
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