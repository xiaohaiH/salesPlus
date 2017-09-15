import React,{ Component } from 'react';
import PropTypes from 'prop-types';


class Counter extends Component{
  // constructor(props){
  //   super(props)
  // }

  /* 将按钮返回给页面 */
  render(){
    const { value, up, down } = this.props;
    return (
      <div>
        <span>当前值 { value }</span>
        <button onClick={ up }>增值</button>
        <button onClick={ down }>减值</button>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  down: PropTypes.func.isRequired,
  up: PropTypes.func.isRequired
}

export default Counter;