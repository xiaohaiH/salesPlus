import React, { Component } from 'react';
import { trim, Linkage } from '../appMethod';
import { Row, Col, Input, Icon, Modal, Select, message, Form, DatePicker, Button } from 'antd';
import moment from 'moment';
import styled from './index.less';
const Search = Input.Search;
const Option = Select.Option;
const FormItem = Form.Item;


/* 高级搜索模态框的 title */
const ModalTitle = ({ data, onChange, form }) => {
  if(typeof data !== 'object' || !(data instanceof Array) || !data.length){
    console.error('搜索->高级搜索中传入的数据不是数组,请重新输入数据');
    data = [{ val: 'null', selected: true}];
  };
  let selected = (data.find(obj => obj.selected) && data.find(obj => obj.selected)['val']) || (data[0] && data[0]['val']);
  return (
    <div className={styled.advancedSearchSelectBox}>
      <span>搜索范围:</span>
      {
        form.getFieldDecorator('searchRange', {
          name: 'searchRange',
          initialValue: selected
        })(
          <Select
            className={styled.advancedSearchSelect}
            showSearch
            onChange={onChange}
          >
            {
              data.map(({ val, value }, key) => (
                <Option key={key} value={value}>{val}</Option>
              ))
            }
          </Select>
        )
      }
    </div>
  );
}
/**
*	一个完整的 linkage 联动搜索框
*	@show: 展示条件, @text: 展示的文字, @btnText: 按钮的文字, @onClick: 点击事件, @data: 三级联动的数据源(modalContentData), @form: form 表单事件
*/
const LinkageBox = ({ show = false, text = (<b>所有条件</b>), btnText= '添加条件', onChange, data, form }) => {
  return (
    <div className={styled.LinkageBox}>
      <div>{text}</div>
      <Linkage data={data} form={form} />
      <div><Button onClick={onChange}>{btnText}</Button></div>
    </div>
  )
};

class Header extends Component{
  constructor(props){
    super(props);
    this.pressEnter = this.pressEnter.bind(this);
    this.handleAdvancedSearch = this.handleAdvancedSearch.bind(this);
    this.advancedSearchModalManage = this.advancedSearchModalManage.bind(this);
    this.advancedSearchModalManageOk = this.advancedSearchModalManageOk.bind(this);
    this.advancedSearchSelectChange = this.advancedSearchSelectChange.bind(this);
    this.firstLinkageChange = this.firstLinkageChange.bind(this);
    this.delCondition = this.delCondition.bind(this);
    this.addAllCondition = this.addAllCondition.bind(this);
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
  /* 高级搜索模态框点击确认后 */
  advancedSearchModalManageOk(e){
    const { dispatch } = this.props;
    const result = this.props.form.getFieldsValue();
    let params = { allCondition: [], anyCondition: [] };
    let begin = {}
    let middle = {}
    let end = {}
    Object.keys(result).map(key => {
      if(/First/g.test(key)){
        begin[key] = result[key]
      }
      if(/Second/g.test(key)){
        middle[key] = result[key]
      }
      if(/Three/g.test(key)){
        end[key] = result[key]
      }
    });
    /* 收集搜索的参数 */
    const collectParams = (key, bigReg, begin, middle, end ) => {
      const index = key.match(/\d+$/);
      let reg = new RegExp(index + "$")
      let condition = middle[Object.keys(middle).find(key => bigReg.test(key) && reg.test(key))];
      let flag = end[Object.keys(end).find(key => bigReg.test(key) && reg.test(key))];
      // console.log(flag)
      let value = flag instanceof Array ? { start: flag[0].format('YYYY/MM/DD'), end: flag[1].format('YYYY/MM/DD') } : flag instanceof Object ? flag.format('YYYY/MM/DD') : flag;
      return {
        field: begin[key],
        condition,
        value
      };
    }
    Object.keys(begin).map(key => {
      if (/^all/.test(key)){
        let store = collectParams(key, /^all/, begin, middle, end);
        store && params['allCondition'].push(store)
      }
      if (/^any/.test(key)){
        let store = collectParams(key, /^any/, begin, middle, end);
        store && params['anyCondition'].push(store)
      }
    })
    console.log(params)
    dispatch({ type: 'headerAside/advancedSearchModalManage' })
  }
  /* 高级搜索 select 框 change 事件 */
  advancedSearchSelectChange(value){
    // console.log(value)
    const { dispatch } = this.props;
    dispatch({ type: 'headerAside/moduleChange', payload: value })
      // .then(() => {
      //   if (!Object.keys(this.props.headerAside.modalContentData).length) return ;
      //   const firstColumnSrouces = this.props.headerAside.modalContentData['allCondition'][0][0]['sources'];
      //   const firstColumnVal = (firstColumnSrouces.find(ele => ele.selected) || firstColumnSrouces[0])['key'];
      //   const secondConditionSrouces = this.props.headerAside.modalContentData['allCondition'][0][1]['sources'];
      //   const secondConditionVal = (secondConditionSrouces.find(ele => ele.selected) || secondConditionSrouces[0])['key'];
      //   this.props.form.setFieldsValue({
      //     'allFirstColumnName0': firstColumnVal,
      //     'allSecondCondition': secondConditionVal,
      //     'anyFirstColumnName0': firstColumnVal,
      //     'anySecondCondition': secondConditionVal
      //   })
      // })
  }
  /* 高级搜索三级联动 FirstLinkageChange 事件 @value: 改变的值, @index: 当前所在行, @type: 0代表所有条件-1代表任一条件 */
  firstLinkageChange(value, index, type){
    let types = this.backProperty(type);
    const { dispatch } = this.props;
    const firstType = this.props.headerAside.modalContentData[types][index][0]['sources'].find(ele => ele.key === value)['type'];
    dispatch({ type: 'headerAside/firstModalChange', payload: { firstType, index, type } })
      .then(() => {
        // console.log(this.props.form.getFieldsValue([this.backProperty(type, 'ThreeEvaluation0')]))
        const allSecondConditionSource = this.props.headerAside.modalContentData[types][index][1]['sources'];
        const allSecondConditionVal = (allSecondConditionSource.find(ele => ele.selected) || allSecondConditionSource[0])['key'];
        this.props.form.setFieldsValue({
          [this.backProperty(type, 'SecondCondition') + index]: allSecondConditionVal
        })
      })
  }
  /* 高级搜索三级联动 SecondLinkageChange 事件 @value: 改变的值, @index: 当前所在行, @type: 0代表所有条件-1代表任一条件 */
  secondLinkageChange(value, index, type){
    const { dispatch } = this.props;
    let types = this.backProperty(type);
    const columnNameVal = this.backProperty(type, 'FirstColumnName') + index;
    const firstColumnName = this.props.form.getFieldsValue([columnNameVal])[columnNameVal];
    const firstType = this.props.headerAside.modalContentData[types][index][0]['sources'].find(ele => ele.key === firstColumnName)['type'];
    dispatch({ type: 'headerAside/secondModalChange', payload: { firstType: firstType, firstCondition: value, index, type } })
  }
  /* 删除条件 @index: 当前所在行, @type: 0代表所有条件-1代表任一条件 */
  delCondition(index, type) {
    const { dispatch } = this.props;
    dispatch({ type: 'headerAside/delCondition', payload: {index, type} })
  }
  /* 所有条件 -> 添加条件 @type: 0代表所有条件-1代表任一条件 */
  addAllCondition(type) {
    const { dispatch, form: { getFieldsValue } } = this.props;
    const { searchRange } = getFieldsValue(['searchRange']);
    dispatch({ type: 'headerAside/addAllCondition', payload: { searchRange, type } })
  }
  /* 返回 model 数据属性名, @modelName: 数据源名字, eleName: 元素名称 */
  backProperty(modelName, eleName){
    if(eleName === 'model' || eleName === undefined){
      return modelName ? 'anyCondition' : 'allCondition'
    };
    return modelName ? 'any' + eleName : 'all' + eleName
  }
  render(){
    let { advancedSearchModal, modalSelectData, modalContentData: { showCondition, allCondition, anyCondition } } = this.props.headerAside;
    [allCondition, anyCondition] = [allCondition, anyCondition].map((itemArr, type) => {
      itemArr.map((item, index) => {
        Object.keys(item).map(key => {
          if (Number(key) === 0) {
            item[key]['attr']['onChange'] = (value) => this.firstLinkageChange(value, index, type)
          };
          if (Number(key) === 1) {
            item[key]['attr']['onChange'] = (value) => this.secondLinkageChange(value, index, type);
          }
          if (Number(key) === 3) {
            item[key]['attr']['onClick'] = () => this.delCondition(index, type);
          }
        })
        return item
      });
      return itemArr
    });
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
                  title={<ModalTitle data={modalSelectData} onChange={(value) => this.advancedSearchSelectChange(value)} form={this.props.form} />}
                  onCancel={this.advancedSearchModalManage}
                  onOk={this.advancedSearchModalManageOk}
                  maskClosable={true}
                  visible={advancedSearchModal}
                  className={styled.modalBox}
                >
                  <div className={styled.modalContent}>
                    {
                      showCondition ? 
                        <div>
                          <LinkageBox onChange={() => this.addAllCondition(0)} data={allCondition} form={this.props.form} />
                          <LinkageBox text={(<b>任一条件</b>)} onChange={() => this.addAllCondition(1)} data={anyCondition} form={this.props.form} />
                        </div>
                      :
                        <div style={{ textAlign: 'center' }}>请选择模块</div>
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

/* class Sss extends Component{
  aaa(e){
    // e.preventDefault();
    console.log(this.props.form.validateFields((err, value) => {
      console.log(value.aa.format('YYYY-MM-DD'))
    }));
  }
  render(){
    // console.log(this.props.form)
    return (
      <Form onSubmit={this.aaa.bind(this)}>
        <FormItem>
          {
            this.props.form.getFieldDecorator('aa', {
              name: 'aa',
              initialValue: moment('2017/10/9', 'YYYY/MM/DD')
            })(
              <DatePicker onOpenChange={this.aaa.bind(this)} onOk={this.aaa.bind(this)} />
            )
          }
          <button type="submit">提交</button>
        </FormItem>
      </Form>
    )
  }
}
Sss = Form.create()(Sss) */

Header = Form.create()(Header)
export default Header