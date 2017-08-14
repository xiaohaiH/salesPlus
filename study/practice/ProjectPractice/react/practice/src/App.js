import React, { Component } from 'react';

import Home from './View/Home/Home';
import UrlArguments from './View/UrlArguments/UrlArguments'
import Redirect from './View/Redirect/Redirect'

class App extends Component {
  render() {
    return (
      <div>
        <Home />
        <UrlArguments />
        {/* <Redirect /> */}
      </div>
    );
  }
}

export default App;
