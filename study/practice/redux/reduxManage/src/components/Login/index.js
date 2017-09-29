import React,{ Component } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class LoginForms extends Component{
  constructor(props){
    console.log(11)
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    console.log(this.props)
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if(err){
        console.log('报错了:', err);
        return false
      };
      this.props.dispatch && this.props.dispatch({ type: 'userLogin/login', payload: value })
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const { sss } = this.props.userLogin;
    console.log(sss)
    const { show, msg } = this.props.userLogin.userLoginHint;
    const hint = msg ? '用户名错误' : '密码错误';
    if(sss == 10 || sss == 11){
      return (
        <Form onSubmit={ this.handleSubmit } className='login-form'>
          {
            show ? (<div><span>{ hint }</span></div>) : ''
            // show ? '' : (<div><span>{ hint }</span></div>)
          }
          <FormItem>
            {
              getFieldDecorator('username',{
                rules: [{ required: true, message: '请输入用户名' }]
              })(<Input prefix={ <Icon type='user' style={{ fontSize: 13 }} /> } placeholder='用户名' />)
            }
          </FormItem>
          <FormItem>
            {
              getFieldDecorator('password',{
                rules: [{ required: true, message: '请输入密码' }]
              })(
                <Input type='password' prefix={ <Icon type='lock' style={{ fontSize: 13 }} /> } placeholder='密码' />
              )
            }
          </FormItem>
          <FormItem>
            <Button type='primary' htmlType='submit' className='login-form-button'>登录</Button>
          </FormItem>
        </Form>
      )
    }
  }
};

const LoginForm = Form.create()(LoginForms);
const mapStateToProps = ({ userLogin }) => {
  return { userLogin }
}
export default connect(mapStateToProps)(LoginForm)