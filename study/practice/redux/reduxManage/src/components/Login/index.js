import React, { Component } from 'react';
import { connect } from 'dva';
import styled from './index.css';
import { Form, Input, Button, Icon, Checkbox, Spin, Alert } from 'antd';
const FormItem = Form.Item;

/* 刷新 */
const Refresh = ({ show }) => {
  if(!show)return false;
  return (
    <div className={styled.refreshBox}>
      <Spin className={styled.refresh} tip="Loading..." />
    </div>
  )
}
/* 验证 */
const loginVerify = (validateFields, dispatch, e) => {
  e.preventDefault();
  validateFields((err, value) => {
    if(err){
      console.log("登陆错误,缺少必填项: ", err)
    }
    dispatch({ type: 'userInfo/login', payload: { value } })
  })
}
  /* 表单 */
const LoginForm = ({ form, userInfo, dispatch }) => {
  const { getFieldDecorator, validateFields } = form;
  let { show, msg } = userInfo;
  msg = msg === 0 ? '密码错误' : msg === 1 ?  '用户名错误' : '';
  return (
      <div className={styled.loginBox}>
        { (<Refresh show={show} />) }
        <p className={styled.logoBox}><img src='./logo.png' /></p>
        <Form onSubmit={(e) => loginVerify(validateFields, dispatch, e)} className="login-form">
        {
          <div className={styled.hint}>
            <span>{ msg }</span>
          </div>
        }
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入用户名" />
          )}
        </FormItem>
        <FormItem>
          <div className={styled.state}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>保存登录信息</Checkbox>
            )}
            <a className="login-form-forgot" href="">忘记密码</a>
          </div>
          <div className={styled.btn}>
            <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
            <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
          </div>
        </FormItem>
      </Form>
    </div>
  )
}
const LoginBox = Form.create()(LoginForm);
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    loading: state.loading.models.userInfo
  } 
};
export default connect(mapStateToProps)(LoginBox);