import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import UsersCom from '../components/Users/Users';
import MainLayout from '../components/MainLayout/MainLayout';

function Users({ location  }) {
  return (
    <MainLayout location={location}>
      <div className={styles.normal}>
        <UsersCom />
      </div>
    </MainLayout>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Users);
