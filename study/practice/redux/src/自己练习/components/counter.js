import React,{ Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class Counter extends Component{
  render(){
    const { value, up, down } = this.props;
    return (
      <div>
        <span>当前值{` ${value} `}</span>
        <button onClick={ up }>增加</button>
        <button onClick={ down }>减少</button>
      </div>
    )
  }
}
/* 限定传值的类型 */
Counter.proptypes = {
  value: PropTypes.number.isRequired,
  up: PropTypes.func.isRequired,
  down: PropTypes.func.isRequired
}

/* actions */
const up = { type: 'upValue' };
const down = { type: 'downValue' };
/* 获取需要的 state 和 设置派发(dispatch)的函数 */
const mapStateToProps = state => ({ value: state.valueState });
const mapDispatchToProps = dispatch => ({ up: () => dispatch(up), down: () => dispatch(down) });

export default connect(mapStateToProps, mapDispatchToProps)(Counter)