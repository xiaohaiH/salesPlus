import React,{ Component } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class LoginForms extends Component{
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if(err){
        console.log('报错了:', err);
        return false
      };
      console.log(this.props.dispatch)
      this.props.dispatch && this.props.dispatch({ type: 'app/login', payload: value })
    })
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={ this.handleSubmit } className='login-form'>
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
};

const LoginForm = Form.create()(LoginForms);
const mapStateToProps = ({ app }) => {
  return { app }
}
export default connect(mapStateToProps)(LoginForm)