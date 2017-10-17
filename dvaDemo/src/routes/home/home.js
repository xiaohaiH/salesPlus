import { connect } from 'dva';
import React, { Component } from 'react';
import { Table, Icon, Popconfirm, Input, Button, Form, Radio, Modal, Row, Col, Checkbox } from 'antd';
import styled from './home.less';
const FormItem = Form.Item;

<<<<<<< HEAD
/* 深度拷贝,数组将其转成字符串在转回数组,对象用 Object.create 来进行深度拷贝 */
// const deepCopy = obj => obj instanceof Array ? JSON.parse(JSON.stringify(obj)) : Object.create(obj);
const deepCopy = obj => {
  if(obj instanceof Array){
    let arr = obj.concat();
    arr = arr.map((item, i) => {
      if(item instanceof Object){
        let store = Object.create(item);
        for(let key in store.__proto__){
          store[key] = store.__proto__[key].constructor === Object ? deepCopy(store.__proto__[key]) : store.__proto__[key];
        }
        return store
      };
      return item
    })
    return arr
  }
  if(obj instanceof Object){
    let store = Object.create(obj);
    for(let key in store.__proto__){
      store[key] = store.__proto__[key]
    }
    return store
  };
};
=======
/* 深度拷贝 */
const deepCopy = (obj, ...val) => {
  let copy = obj instanceof Array ? [] : {};
  /* 将多个数组或对象集合到一个对象并返回结果 */
  if(val.length){
    val.map((item, i) => {
      for(let key in item){
        if(item.hasOwnProperty(key)){
          if(item[key] === item)continue;
          copy[key] = item[key] instanceof Object ? deepCopy(item[key]) : item[key]
        }
      }
    });
  };
  /* 这块是深度拷贝 */
  for(let key in obj){
    if(obj[key].hasOwnProperty){
      if(obj[key] === obj) continue;
      copy[key] = obj[key] instanceof Object ? deepCopy(obj[key]) : obj[key]
    }
  }
  return copy
}
>>>>>>> 30e01a25f54c4e3036be5a72f0271de4a95a8bb8

/* 点击添加后出现的表单 start */
const Forms = ({ forms }) => {
  const { getFieldDecorator } = forms;
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 16 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
  };
  return (
    <Form>
      <FormItem
        label="姓名"
        {...formItemLayout}
      >
        <Row gutter={8}>
          <Col span={18}>
            {
              getFieldDecorator('name',{
                rules: [{ required: true, message: '请输入姓名' }]
              })(<Input name='name' placeholder='姓名' />)
            }
          </Col>
          <Col span={6}>
            {
              getFieldDecorator('nameEditable',{
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox disabled >可编辑</Checkbox>)
            }
          </Col>
        </Row>
      </FormItem>
      <FormItem
        label="年龄"
        {...formItemLayout}
      >
        <Row gutter={8}>
          <Col span={18}>
            {
              getFieldDecorator('age')(<Input  name='age' placeholder="年龄" />)
            }
          </Col>
          <Col span={6}>
            {
              getFieldDecorator('ageEditable',{
                valuePropName: 'checked',
                initialValue: false
              })(<Checkbox>可编辑</Checkbox>)
            }
          </Col>
        </Row>
      </FormItem>
      <FormItem
        label="地址"
        {...formItemLayout}
      >
        <Row gutter={8}>
          <Col span={18}>
            {
              getFieldDecorator('address',{
                rules: [{ required: true, message: '请输入地址' }]
              })(<Input name='address' placeholder="地址" />)
            }
          </Col>
          <Col span={6}>
            {
              getFieldDecorator('addressEditable',{
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>可编辑</Checkbox>)
            }
          </Col>
        </Row>
      </FormItem>
    </Form>
  )
}
/* 点击添加后出现的表单 end */
/* 点击添加后弹出的模态框 start */
const ModalBox = ({ visible, onOk, onCancel, forms }) => {
  return (
    <Modal
      title='添加用户'
      onOk={onOk}
      onCancel={onCancel}
      okText='添加'
      cancelText='取消'
      visible={visible}
      maskClosable={true}
    >
      <Forms forms={forms} />
    </Modal>
  )
}
/* 点击添加后弹出的模态框 end */

class Tables extends Component{
  constructor(props){
    super(props);
    this.editStatusManage = this.editStatusManage.bind(this);
    this.delete = this.delete.bind(this);
    this.save = this.save.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.addHandleOk = this.addHandleOk.bind(this);
    this.addHandleCancel = this.addHandleCancel.bind(this);
    this.headerTitle = this.headerTitle.bind(this);
    this.filterValue = this.filterValue.bind(this);
  }
  /* 删除用户 */
  delete(id){
    this.props.dispatch({ type: 'home/resDelete', payload: { id } })
  }
  /* 编辑时状态管理 */
  editStatusManage(id){
    let { contentBack } = this.props.home;
    let content = deepCopy(contentBack);
    this.props.dispatch({ type: 'home/resEditStatusManage', payload: { id, content } })
  }
  /* 用户改变 input 框的值的事件 */
  valueChange(e, key, index){
    let inputEditChangeValue = e.target.value;
    let { home: { editValue }, dispatch } = this.props;
    let obj = {
      [key]: {
        value: inputEditChangeValue
      }
    };
    dispatch({ type: 'home/editChangeValue', payload: { editValue: obj } })
  }
  /* 用户编辑后保存 */
  save(id){
    let { contentBack, editValue } = this.props.home;
    let content = deepCopy(contentBack);
    editValue = deepCopy(editValue);
    this.props.dispatch({ type: 'home/resSave', payload: { id, content, editValue } })
  }
  /* 点击添加按钮 */
  handleAdd(){
    const { home: { addModalStatus }, dispatch } = this.props;
    dispatch({ type: 'home/modalStatus', payload: { addModalStatus: !addModalStatus } })
  }
  /* 点击添加按钮后的保存按钮 */
  addHandleOk(){
    let { home: { addModalStatus, contentBack }, dispatch } = this.props;
    let content = deepCopy(contentBack);
    this.props.form.validateFields((err, val) => {
      if (err) {
        console.error('请填写:',err);
        return false
      };
      /* 将未填写的值改成空格 */
      for(let key in val){
        val[key] === undefined && (val[key] = '');
      }
      dispatch({ type: 'home/resAdd', payload: { content, val } })
    });
  }
  /* 点击添加按钮后的取消按钮 */
  addHandleCancel(){
    const { home: { addModalStatus }, dispatch } = this.props;
    dispatch({ type: 'home/modalStatus', payload: { addModalStatus: !addModalStatus } })
  }
  /* 这个 table 顶部的添加按钮文字 */
  headerTitle(text){
    return (
      <div className={styled.clearfix}>
        <p className={styled.left}><Button onClick={() => this.handleAdd()}>添加</Button></p>
        <span className={styled.middle}>{text}</span>
      </div>
    )
  }
  /* 筛选按钮状态 */
  handleFilterStatus(visible){
    const { dispatch } = this.props;
    dispatch({ type: 'home/filterVisible', payload: { visible } })
  }
  /* 筛选事件 */
  filterValue(e){
    const searchValue = e.target.value;
    let { home: { contentBack }, dispatch } = this.props;
    let content = deepCopy(contentBack);
    const reg = new RegExp((searchValue), 'g');
    let filterResult = content.map(val => {
      const result = val.name.value.match(reg);
      if(!result){
        return null
      }
      const obj = { ...val };
      obj.name.value = (
        <span>
          {
            val.name.value.split(reg).map((value, i) => (i > 0 ? [ <span className={styled.highlight}>{result[0]}</span>, value ] : value))
          }
        </span>
      )
      return obj
    }).filter(val => val);
    dispatch({ type: 'home/filterResult', payload: { filterResult } })
  }
  render(){
    let { home: { header, content, addModalStatus, filterStatus }, form } = this.props;
    header = deepCopy(header);
    content = deepCopy(content);
    const eleFlag = (flag, record) => {
      if(!flag){
        return (
          <span>
            <a style={{marginRight: '1rem'}} onClick={() => this.editStatusManage(record.id)}>编辑</a>
            <Popconfirm title="确定删除?" onConfirm={() => this.delete(record.id)} okText="确认" cancelText="取消">
              <a>Delete</a>
            </Popconfirm>
          </span>
        )
      };
      return (
        <span>
          <a style={{marginRight: '1rem'}} onClick={() => this.save(record.id)}>保存</a>
          <Popconfirm title="放弃更改?" onConfirm={() => this.editStatusManage(record.id)} okText="确认" cancelText="取消">
            <a style={{marginRight: '1rem'}}>取消</a>
          </Popconfirm>
        </span>
      )
    }
    /* 处理 header 的数据 */
    header.map((val, index) => {
      if(val['dataIndex'] === 'name'){
        if(!val['editable']){
          val['render'] = (text) => <a>{text}</a>
        }
        val['filterDropdown'] = (<div><Input onChange={this.filterValue} type='text' /></div>);
        val['filterIcon'] = (<Button style={{ width: 'auto' }}>筛选</Button>);
        val['filtered'] = true;
        val['filterDropdownVisible'] = filterStatus;
        val['onFilterDropdownVisibleChange'] = (visible) => this.handleFilterStatus(visible)
      };
      if(val['title'] === '操作'){
        val['render'] = (text, record, i) => {
          let cellEditable = content.length && content[i]['name'].editable;
          return (
            <p>
              {
                cellEditable ? eleFlag(true, record) : eleFlag(false, record)
              }
            </p>
          )
        }
      }else{
        val['sorter'] = (a, b) => {
          if(typeof a[val['dataIndex']] === 'number'){
            return a[val['dataIndex']] - b[val['dataIndex']]
          }
          return a[val['dataIndex']].length - b[val['dataIndex']].length
        }
      };
      return val
    });
    /* 处理 content 的数据 */
    let dataSource = content.map((val, index) => {
      let obj = {};
      for(const k in val){
        if(typeof val[k] !== 'object'){
          obj[k] = val[k];
        }else if(val[k].editable){
          obj[k] = (<Input onChange={(e) => this.valueChange(e, k, index)} type='text' defaultValue={val[k].value} />);
        }else{
          obj[k] = val[k].value;
        }
      }
      return obj
    });
    return (
      <div>
        {
          addModalStatus ? <ModalBox visible={ addModalStatus } onOk={() => this.addHandleOk()} onCancel={() => this.addHandleCancel()} forms={form} /> : ''
        }
        <Table
          style={{ textAlign: 'center' }}
          title={() => this.headerTitle('用户信息')}
          bordered
          rowSelection={{
            type: 'checkbox',
            onSelect(){
            },
            onSelectInvert(a,b,c){
              console.log(123,a,b,c)
            },
            hideDefaultSelections: true,
          }}
          rowKey={(record, index) => index}
          columns={header}
          pagination={false}
          dataSource={dataSource}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}
const Tabless = Form.create()(Tables);

export default connect(mapStateToProps)(Tabless);