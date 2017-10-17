import { connect } from 'dva';
import LeftSidebar from '../leftSidebar/index';
import { Layout } from 'antd';
import styled from './index.less';
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = ({ children, location }) => (
  <Layout className={styled.box}>
    <Sider className={styled.leftAside}><LeftSidebar /></Sider>
    <Layout>
      {children}
    </Layout>
  </Layout>
)

export default MainLayout
