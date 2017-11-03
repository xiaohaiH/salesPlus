import React, { Component } from 'react';
import { trim } from '../appMethod';
import { Row, Col, Input, Icon, Modal, Select, message, Form, DatePicker } from 'antd';
import styled from './index.less';
const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;
// import { Select, DatePicker } from 'antd';
import moment from 'moment';
// const { Option } = Select;
const { RangePicker } = DatePicker;
// const ABC = () => {
//   let result = [];
//   result.push(<div>aaaaa</div>);
//   result.push(<div>aaaaa</div>);
//   return result
// }

const aaabbbccc = [
  {
    eleOne: {
      selector: 'select',
      sources: [
        {
          key: 'aaa',
          value: '啊啊啊',
          'data-va': 'adf',
        },
        {
          key: 'bbb',
          value: '不不不',
          abcde: 's3t3f'
        }
      ],
      attr: {
        name: 'select1',
      }
    },
    eleTwo: {
      selector: 'DatePicker',
      format: 'yyyy/mm/dd',
      startDate: '2017/10/10',
      attr: {
        name: 'settingDate'
      }
    },
    eleThree: {
      selector: 'RangePicker',
      format: 'yyyy/mm/dd',
      startDate: '2017/10/10',
      deadline: '2017/10/20',
      attr: {
        name: 'rangePicker'
      }
    }
  },
  {
    eleOne: {
      selector: 'select',
      sources: [
        {
          key: 'aaa',
          value: '啊啊啊',
          'data-va': 'adf',
        },
        {
          key: 'bbb',
          value: '不不不',
          abcde: 's3t3f'
        }
      ],
      attr: {
        name: 'select1',
      }
    },
    eleTwo: {
      selector: 'DatePicker',
      format: 'yyyy/mm/dd',
      startDate: '2017/10/10',
      attr: {
        name: 'settingDate'
      }
    },
    eleThree: {
      selector: 'RangePicker',
      format: 'yyyy/mm/dd',
      startDate: '2017/10/10',
      deadline: '2017/10/20',
      attr: {
        name: 'rangePicker'
      }
    }
  }
];

const Linkages = ({ data = [] }) => {
  if(!(data instanceof Array)){
    throw new Error('参数输入格式有误');
  };
  let opts = (arr = []) => {
    if(!(arr instanceof Array)){
      throw new Error('参数输入格式有误');
    };
    let result = arr.map(({ key, value, ...attr }, i) => {
      console.log(key,value, i, 111)
      return (<Option key={key} {...attr}>{value}</Option>)
    });
    return result
  };
  let ele = data.map((item, i) => {
    let result = [];
    for(let key in item){
      if(item[key].selector === 'select'){
        result.push(
          <Select  {...item[key].attr}>
            {opts(item[key].sources)}
          </Select>
        );
      };
      if(item[key].selector === 'DatePicker'){
        const startDate = item[key].startDate;
        const format = item[key].format;
        const attr = item[key].attr;
        if(!startDate || !format){
          throw new Error('参数输入格式有误');
        }
        result.push(
          <DatePicker defaultValue={moment(startDate, format)} format={format} {...attr} />
        );
      };
      if(item[key].selector === 'RangePicker'){
        const startDate = item[key].startDate;
        const deadline = item[key].deadline || startDate;
        const format = item[key].format;
        const attr = item[key].attr;
        if(!startDate || !format){
          console.log(startDate, format)
          throw new Error('参数输入格式有误');
        }
        result.push(
          <RangePicker defaultValue={[ moment(startDate, format), moment(deadline, format) ]} format={format} {...attr} />
        );
      }
    }
    return result
  });
  return ele
}





/* 高级搜索模态框的 title */
const ModalTitle = ({ data, onChange }) => {
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
/**
*	联动
* @optList: select 的 option 选项,数组形式
*/
class Linkage extends Component{
  constructor(props){
    super(props);
    this.primaryChange = this.primaryChange.bind(this)
  }
  /**
  *	@primarySelectList: 第一个选择框的值
  * @conditionList: 第二个选择框的值
  */
  state = {
    primaryList: this.props.primaryList || '',
    conditionList: this.props.conditionList || ''
  }
  // 第一个选框值改变以后
  primaryChange(value,a,b){
    console.log(value,a,b)
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const options = (optList = []) => {
      if(!(optList instanceof Array)){
        console.trace('请输入数组');
        return null
      }
      return optList.map(({ value, val, ...attr }, key) => ( <Option isSelectOptGroup={true} value={value} key={value}>{val}</Option> ))
    }
    const ChildList = () => (
      <div>
        <FormItem labelCol={3}>
          {
            getFieldDecorator('primarySelect',{
              initialValue: 'b'
            })(
              <Select onChange={this.primaryChange}>
                { options(this.state.conditionList) }
              </Select>
            )
          }
        </FormItem>
        <FormItem labelCol={4}>
          {
            getFieldDecorator('conditionSelect',{
              initialValue: 'a'
            })(
              <Select>
                { options(this.state.conditionList) }
              </Select>
            )
          }
        </FormItem>
        <FormItem labelCol={4}>
          {
            getFieldDecorator('settingValue',{
              
            })(<Input style={{width: '90%'}} type='text' />)
          }
          <Icon type="delete" />
        </FormItem>
      </div>
    );
    console.log(1234567890)
    console.log(Linkages({ data: aaabbbccc }))
    return (
      <div>
        {Linkages({ data: aaabbbccc })}
      </div>
    )
    return (
      <Form layout='horizontal'>
        <ChildList />
      </Form>
    )
  }
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
  }
  render(){
    const { advancedSearchModal, modalSelectData, modalContentData } = this.props.headerAside;
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
                >
                  <div className={styled.modalContent}>
                    {
                      !modalContentData ? '请选择模块' : <Linkage primaryList={[{val: 'a', value: 'aa'},{val: 'b', value: 'bb'}]} conditionList={[{val: 'c', value: 'cc'},{val: 'd', value: 'dd'}]} form={this.props.form} />
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