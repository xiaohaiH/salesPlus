import React from 'react';
import { connect } from 'dva';
import LeftAside from '@/components/Home/LeftAside'

const Home = () => {
  return (
    <div>
      <LeftAside />
    </div>
  )
}

export default connect()(Home);