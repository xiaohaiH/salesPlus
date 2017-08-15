import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
class Test extends Component{
  render(){
    return (
      <Router>
        <div>
          <h3><Link to='/afda'>aaaaaaaaa</Link></h3>
          <Route path='/afda' render={() => (<h3>111111</h3>)} />
        </div>
      </Router>
    )
  }
};

// const Test = () => (<h3>aaaaaaaaaa</h3>);

export default Test;