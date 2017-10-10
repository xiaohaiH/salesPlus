import { connect } from 'dva';
import React, { Component } from 'react';
import { Table, Icon, Popconfirm, Input, Button, Form, Radio, Modal } from 'antd';
import styled from './home.less';
const FormItem = Form.Item;

const tables = (props) => {
  return (<Table columns={columns} dataSource={data} />)
};

/* 点击添加后出现的表单 start */
class Forms extends Component{
  constructor(props) {
    super(props);
    this.state = {
      formLayout: 'horizontal',
    };
  }
  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 4 },
    } : null;
    return (
      <div>
        <Form layout={formLayout}>
          <FormItem
            label="姓名"
            {...formItemLayout}
          >
            <Input placeholder="姓名" />
          </FormItem>
          <FormItem
            label="年龄"
            {...formItemLayout}
          >
            <Input placeholder="年龄" />
          </FormItem>
          <FormItem
            label="地址"
            {...formItemLayout}
          >
            <Input placeholder="地址" />
          </FormItem>
        </Form>
      </div>
    );
  }
}
/* 点击添加后出现的表单 end */
/* 点击添加后弹出的模态框 start */
// const ModalBox = ({ visible,  }) => {
//   return (
//     <Modal
//       title='添加用户'
//       onOk={() => this.handleOk()}
//       onCancel={() => this.handleCancel()}
//       okText='添加'
//       cancelText='取消'
//       visible={visible}
//       maskClosable={true}
//     >
//       <Forms />
//     </Modal>
//   )
// }
class ModalBox extends Component{
  constructor(props){
    super(props)
    this.handleOk = this.handleOk.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }
  handleOk(){

  }
  handleCancel(){
    console.log(this.state)
    this.setState({ visible: false })
  }
  render(){
    let { visible } = this.state;
    return (
      <Modal
        title='添加用户'
        onOk={() => this.handleOk()}
        onCancel={() => this.handleCancel()}
        okText='添加'
        cancelText='取消'
        visible={visible}
        maskClosable={true}
      >
        <Forms />
      </Modal>
    )
  }
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
  }
  state = { addModalStatus: false }
  editStatusManage(value){
    const { content } = this.props.home;
    this.props.dispatch({ type: 'home/resEditStatusManage', payload: { value, content } })
  }
  /* 删除用户 */
  delete(id){
    this.props.dispatch({ type: 'home/resDelete', payload: { id } })
  }
  /* 用户编辑后保存或取消编辑 */
  save(value){
    const { content } = this.props.home;
    this.props.dispatch({ type: 'home/resEditStatusManage', payload: { value, content, type: 'save' } })
  }
  /* 用户编辑后的事件 */
  valueChange(e, key, index){
    const alterValue = e.target.value;
    const { content } = this.props.home;
    content[index][key]['value'] = alterValue;
  }
  handleAdd(){
    const { addModalStatus } = this.state;
    this.setState({ addModalStatus: !addModalStatus })
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
  render(){
    let { header, content } = this.props.home;
    const eleFlag = (flag, record) => {
      if(!flag){
        return (
          <span>
            <a style={{marginRight: '1rem'}} onClick={() => this.editStatusManage(record)}>编辑</a>
            <Popconfirm title="确定删除?" onConfirm={() => this.delete(record.id)} okText="确认" cancelText="取消">
              <a>Delete</a>
            </Popconfirm>
          </span>
        )
      };
      let dataDispose = {};
      Object.keys(record).map(key => {
        if(typeof record[key] === 'object'){
          return dataDispose[key] = record[key].props.defaultValue
        }
        return dataDispose[key] = record[key]
      });
      return (
        <span>
          <a style={{marginRight: '1rem'}} onClick={() => this.save(dataDispose)}>保存</a>
          <Popconfirm title="放弃更改?" onConfirm={() => this.editStatusManage(dataDispose)} okText="确认" cancelText="取消">
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
    
    let { addModalStatus } = this.state;

    return (
      <div>
        {
          addModalStatus ? <ModalBox visible={ addModalStatus } /> : ''
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

export default connect(mapStateToProps)(Tables);