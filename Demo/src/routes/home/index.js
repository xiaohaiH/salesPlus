import React, { Component } from 'react';
import { connect } from 'dva';
import MainLayout from '../../components/snow/Layout/index';


class Home extends Component{
  render(){
    const { location } = this.props;
    return (
      <MainLayout location={location} >
        <div>11aabbdd</div>
      </MainLayout>
    )
  }
}
export default connect(({ home }) => ({ home}))(Home)