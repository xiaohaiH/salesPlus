import React, { Component } from  'react';
import styled from './index.less';
import { Form, Input, Button, Icon } from 'antd';
const FormItem = Form.Item;
class Login extends Component{
  render(){
    let {  } = this.props.form;
    return (
      <div className={styled.loginBox}>
        <Form>
          <FormItem>
            {
              getFieldDecorator('username', {
                rules: [ { require: true, whitespace: true, message: '请输入用户名' } ]
              })(<Input prefix={<Icon type='user' />} type='text' name='username' placeholder='请输入用户名' />)
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password', {
                rules: [ { require: true, whitespace: true, message: '请输入密码' } ]
              })(<Input prefix={<Icon type='lock' />} type='password' name='password' placeholder='请输入密码' />)
            }
          </FormItem>
          <FormItem>
            <Button type='primary'>登录</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default () => <h1>login</h1>