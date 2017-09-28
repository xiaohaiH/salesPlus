import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props){
    super(props);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleOk = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, value) => {
      if(err){
        return
      };
      this.props.dispatch({ type: 'app/login',payload: value })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} onPressEnter={ this.handleOk } placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} onPressEnter={ this.handleOk } type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const Login = Form.create()(NormalLoginForm);

export default connect(({ app }) => {
  return { app }
})(Login);