import React, { Component } from 'react';
import { connect } from 'dva';
import { Select, DatePicker, Input, Icon } from 'antd';
import moment from 'moment';
import styled from './appMethod.less';
const { Option } = Select;
const { RangePicker, MonthPicker } = DatePicker;

/* 去空 */
export const trim = (str) => {
  str = str.replace(/^(\s+)/, '').replace(/(\s)$/g, '');
  return str
}

/* 判断是否是空对象 */
export const isEmptyObj = (obj) => {
  for(let key in obj) return false;
  return true;
}

/**
*	选择框->三级联动
* @selector: 代表元素类型, @attr: 属性, sources: selecte 的数据, @startDate: 起始日期(格式: 2017/10/20), @deadline: 结束日期(双日期时需要), @format: 日期格式大写(YYYY/MM/DD)
**/

export class Linkage extends Component{
  constructor(props){
    super(props);
    this.opts = this.opts.bind(this);
    this.multistageEle = this.multistageEle.bind(this);
    this.error = this.error.bind(this);
  }
  /* 报错 */
  error(text = '参数错误'){
    console.trace(text);
    throw new Error(text)
  }
  /* 生成 select 列表 */
  opts(arr = []){
    if (!(arr instanceof Array)) {
      throw new Error('参数输入格式有误');
    };
    let result = arr.map(({ key, value, ...attr }, i) => {
      return (<Option key={key} {...attr}>{value}</Option>)
    });
    return result
  }
  /* 多级列表 -> select */
  multistageEle({ selector, attr, ...prop}, index){
    if(typeof attr === 'object'){
      var { names = this.error('58行names参数错误'), ...attrVal } = attr;
    }
    if (selector === 'select') {
      const selected = ((prop.sources.find(obj => obj.selected) && prop.sources.find(obj => obj.selected)) || (prop.sources[0] && prop.sources[0]))['key'];
      const { getFieldDecorator } =  this.props.form;
      return(
        getFieldDecorator(names, {
          name: names,
          initialValue: selected
        })(
          <Select 
            key={names}
            {...attrVal}
            className={`${index === 0 ? styled.first : index === 1 ? styled.second : styled.three}`}
          >
            {this.opts(prop.sources)}
          </Select>
        )
      )
    };
    if (selector === 'DatePicker') {
      const { getFieldDecorator } =  this.props.form;
      const startDate = prop.startDate;
      const format = prop.format;
      if (!startDate || !format) {
        this.error('79行参数输入格式有误')
      };
      return(
        getFieldDecorator(names, {
          name: names,
          initialValue: moment(startDate, format),
        })(
          <DatePicker
            key={names}
            format={format}
            {...attrVal}
            className={`${index === 0 ? styled.first : index === 1 ? styled.second : styled.three}`}
            placeholder="请选择日期"
          />
        )
      )
    };
    if (selector === 'MonthPicker') {
      const { getFieldDecorator } =  this.props.form;
      const startDate = prop.startDate;
      const format = prop.format;
      if (!startDate || !format) {
        this.error('101行参数输入格式有误');
      };
      return(
        getFieldDecorator(names, {
          name: names,
          initialValue: moment(startDate, format),
        })(
          <MonthPicker
            key={names}
            format={format}
            {...attrVal}
            className={`${index === 0 ? styled.first : index === 1 ? styled.second : styled.three}`}
            placeholder="请选择月份"
           />
        )
      )
    };
    if (selector === 'RangePicker') {
      const { getFieldDecorator } =  this.props.form;
      const startDate = prop.startDate;
      const deadline = prop.deadline || startDate;
      const format = prop.format;
      if (!startDate || !format) {
        this.error('118行参数输入格式有误');
      }
      return(
        getFieldDecorator(names, {
          name: names,
          initialValue: [moment(startDate, format), moment(deadline, format)],
        })(
          <RangePicker
            key={names}
            format={format}
            {...attrVal}
            className={`${index === 0 ? styled.first : index === 1 ? styled.second : styled.three}`}
            placeholder={['请选择开始日期','请选择结束日期']}
          />
        )
      )
    };
    if (selector === 'Input' || selector === 'input') {
      const { getFieldDecorator } = this.props.form;
      return (
        getFieldDecorator(names, {
          name: names
        })(
          <Input
            key={names}
            {...attrVal}
            className={`${index === 0 ? styled.first : index === 1 ? styled.second : styled.three}`}
          />
        )
      )
    };
    if(selector === 'Icon'){
      const { getFieldDecorator } = this.props.form;
      return (
        getFieldDecorator(names, {
          name: names,
        })(
          <Icon
            key={names}
            { ...attrVal }
            type="delete"
            title="删除该条件"
            className={styled.del}
          />
        )
      )
    }
    if(!selector){
      return ''
    }
  }
  render(){
    const { data = [] } = this.props;
    if (!(data instanceof Array)) {
      this.error('参数输入格式有误');
    };
    let eleArr = data.map((item) => {
      let result = [];
      let index = 0;
      for (let key in item) {
        result.push(this.multistageEle(item[key], index))
        ++index;
      }
      return result
    });
    return (
      <div>
        { 
          eleArr.map((ele, key) => <div key={key} className={styled.linkageBox}>{ele}</div>)
        }
      </div>
    )
    return eleArr
  }
};

/**
*	渲染 selected 菜单列表
*/
 export const SelectOptions = (arr = []) => {
     if (!(arr instanceof Array)) {
       throw new Error('参数输入格式有误');
     };
     let result = arr.map(({ key, value, ...attr }, i) => {
       return (<Option key={key} {...attr}>{value}</Option>)
     });
     return result
 }