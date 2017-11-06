import React, { Component } from 'react';
import { Select, DatePicker, Input } from 'antd';
import moment from 'moment';
import styled from './appMethod.less';
const { Option } = Select;
const { RangePicker } = DatePicker;


/* 去空 */
export const trim = (str) => {
  str = str.replace(/^(\s+)/, '').replace(/(\s)$/g, '');
  return str
}


/* 选择框->三级联动 */

export class Linkage extends Component{
  constructor(props){
    super(props);
    this.opts = this.opts.bind(this);
    this.multistageEle = this.multistageEle.bind(this);
    const { data = [] } = props;
    if (!(data instanceof Array)) {
      throw new Error('参数输入格式有误');
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
    return eleArr
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
    if (selector === 'select') {
      const selected = (prop.sources.find(obj => obj.selected) && prop.sources.find(obj => obj.selected)['key']) || (prop.sources[0] && prop.sources[0]['key']);
      return(
        <Select defaultValue={selected} {...attr} className={`${index === 0 ? styled.first : index === 1 ? styled.second : styled.three}`}>
          {this.opts(prop.sources)}
        </Select>
      );
    };
    if (selector === 'DatePicker') {
      const startDate = prop.startDate;
      const format = prop.format;
      if (!startDate || !format) {
        throw new Error('参数输入格式有误');
      }
      return(
        <DatePicker defaultValue={moment(startDate, format)} format={format} {...attr} className={`${index === 0 ? styled.first : index === 1 ? styled.second : styled.three}`} />
      );
    };
    if (selector === 'RangePicker') {
      const startDate = prop.startDate;
      const deadline = prop.deadline || startDate;
      const format = prop.format;
      if (!startDate || !format) {
        throw new Error('参数输入格式有误');
      }
      return(
        <RangePicker defaultValue={[moment(startDate, format), moment(deadline, format)]} format={format} {...attr} className={`${index === 0 ? styled.first : index === 1 ? styled.second : styled.three}`} />
      );
    };
    if(selector === 'Input' || selector === 'input'){
      const attr = prop.attr; 
      return (
        <Input {...attr} className={`${index === 0 ? styled.first : index === 1 ? styled.second : styled.three}`} />
      )
    }
    if(!selector){
      return '';
    }
  }
};