import React, { Component } from 'react';
import MainLayout from '../../components/snow/Layout/index';

class Home extends Component{
  render(){
    const { location } = this.props;
    <MainLayout location={location}>
      <div>11aabbdd</div>
    </MainLayout>
  }
}
export default (({ home }) => ({ home }))(Home)