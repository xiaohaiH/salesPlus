import { connect } from 'dva';
import React, { Component } from 'react';
import { Table, Icon, Popconfirm, Input } from 'antd';

const tables = (props) => {
  return (<Table columns={columns} dataSource={data} />)
};

class Tables extends Component{
  constructor(props){
    super(props);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
  }
  edit(value){
    const { content } = this.props.home;
    this.props.dispatch({ type: 'home/resEdit', payload: { value, content } })
  }
  delete(name){
    this.props.dispatch({ type: 'home/resDelete', payload: { name } })
  }
  render(){
    let { header, content } = this.props.home;
    /* 处理 header 的数据 */
    header.map((val, index) => {
      const cellEditable = content[index].editable;
      if(val['dataIndex'] === 'name'){
        if(!val['editable']){
          val['render'] = (text) => <a>{text}</a>
        }
      };
      if(val['title'] === '操作'){
        val['render'] = (text, record) => {
          console.log(val)
          return (
            <p>
              {
                cellEditable ? <a style={{marginRight: '1rem'}}
                  onClick={() => this.edit(record)}>编辑</a> : <Popconfirm title="确定删除?" onConfirm={() => this.delete(record.name)} okText="确认" cancelText="取消">
                <a>Delete</a>
              </Popconfirm>
              }
              <Popconfirm title="确定删除?" onConfirm={() => this.delete(record.name)} okText="确认" cancelText="取消">
                <a>Delete</a>
              </Popconfirm>
            </p>
          )
        }
      };
      return val
    });
    /* 处理 content 的数据 */
    content = content.map((val, index) => {
      let dataSource = {};
      for(const k in val){
        if(typeof val[k] !== 'object'){
          dataSource[k] = val[k];
        }else if(val[k].editable){
          dataSource[k] = (<Input value={val[k].value} />);
        }else{
          dataSource[k] = val[k].value;
        }
      }
      return dataSource
    });
    return (
      <Table
        style={{ textAlign: 'center' }}
        title={() => '用户信息'}
        bordered
        rowKey={(record, index) => index}
        columns={header}
        dataSource={content}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

export default connect(mapStateToProps)(Tables);