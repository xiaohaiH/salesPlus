import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';


class UrlArguments extends Component{
  constructor(){
    super()
  }
  render(){
    return (
      <Router>
        <div>
          <ul>
            <li><Link to='/a'>A</Link></li>
            <li><Link to='/b'>B</Link></li>
            <li><Link to='/c'>C</Link></li>
          </ul>

          <Route path='/:id' component={Child} />
        </div>
      </Router>
    )
  }
};

const Child = (route) => {
  console.log(route)
  return (
    <div>
      ID: {route.match.params.id}
    </div>
  );
}

export default UrlArguments;