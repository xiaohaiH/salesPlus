import React, { Component } from  'react';
import { connect } from 'dva';
import styled from './index.less';
import { Form, Input, Button, Icon, message } from 'antd';
const FormItem = Form.Item;

/* 提示警告 */
const hintBox = (text = '密码错误') => {message.error(text);};


class Login extends Component{
  constructor(props){
    super(props);
    this.loginVerify = this.loginVerify.bind(this);
  }
  loginVerify(e){
    e.preventDefault();
    let { dispatch, form: { validateFields } } = this.props;
    validateFields((err, val) => {
      if(err){
        console.log('请输入:', err);
        return false
      };
      dispatch({ type: 'login/handleLogin', payload: val })
    })
  }
  render(){
    let { form: { getFieldDecorator }, login: { loading, hint } } = this.props;
    return (
      <div className={styled.loginBox}>
        <p className={styled.loginTitle}>用户登录</p>
        {
          hint ? hintBox('用户名或密码错误') : ''
        }
        <Form onSubmit={this.loginVerify}>
          <FormItem>
            {
              getFieldDecorator('username', {
                rules: [ { required: true, whitespace: true, message: '请输入用户名' } ]
              })(<Input prefix={<Icon type='user' />} type='text' name='username' placeholder='请输入用户名' />)
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password', {
                rules: [ { required: true, whitespace: true, message: '请输入密码' } ]
              })(<Input prefix={<Icon type='lock' />} type='password' name='password' placeholder='请输入密码' />)
            }
          </FormItem>
          <FormItem className={styled.loginBtn}>
            <Button type='primary' htmlType='submit' loading={loading}>登录</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

let Logins = Form.create()(Login);
export default connect(({ login }) => ({ login }))(Logins)