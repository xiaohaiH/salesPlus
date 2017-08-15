import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'

const About = () => {
  return (
    <Router>
      <Link to='/'>
        返回首页
      </Link>
    </Router>
  )
}
export default About;