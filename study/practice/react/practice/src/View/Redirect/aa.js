import React from 'react';
import {BrowserRouter as Router,Route,Link,Redirect} from 'react-router-dom';

const Aa = () => (
  <Router>
    <div>
      <ul>
        <li><Link to='/aabbcc'>aabbcc</Link></li>
        <li><Link to='/ddggee'>ddggee</Link></li>
      </ul>

      <Route path='/aabbcc' render={() => <Redirect render={() => <button onClick={() => history.push('/ddggee')}></button>} />}></Route>
      <Route path='/ddggee' component={Ddggee} />
    </div>
  </Router>
);

const Aabbcc = () => <Redirect to='/ddggee' />;
const Ddggee = () => <h3>这个第二个</h3>;

export default Aa;