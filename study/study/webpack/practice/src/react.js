import styled from './index.css';
import React,{Component} from 'react';
import { render } from 'react-dom';

// import { render } from 'react-router-dom';

class Example extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (<h3 className={styled.testh3}>样式只对这个 fdsh3 起作用</h3>)
  }
}
console.log(styled)
render(<Example />,document.getElementById('root'))
// export default Example;