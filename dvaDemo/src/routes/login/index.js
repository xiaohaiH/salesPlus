import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Link } from 'dva/router';
import styled from './login.less';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('报错信息:', err);
        return false
      };
      this.props.dispatch({ type: 'login/loginRes', payload: { ...values } })
    });
  }

  tips = tips => {
    message.error(tips, 1.5);
  }
  
  componentDidUpdate(){
    let { hint } = this.props.login;
    hint && this.tips(hint)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let { loading } = this.props.login;
    const loginLoading = loading ? '登录中...' : '登录';
    return (
      <div className={styled.loginBox}>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" disabled={loading} style={{ width: '100%' }} htmlType="submit" className="login-form-button">{ loginLoading }</Button>
          </FormItem>
          <Link to='/table'>table</Link>
          <Link to='/fds'>fds</Link>
        </Form>

      </div>
    )
  }
}

const loginCom = Form.create()(NormalLoginForm);
const stateTo = ({ login }) => {
  return { login }
};
export default connect(stateTo)(loginCom)