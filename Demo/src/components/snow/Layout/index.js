import { connect } from 'dva';
import leftSidebar from '../leftSidebar/index';
import { Layout } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = ({ children, location }) => (
  <Layout>
    <Sider><leftSidebar /></Sider>
    <Layout>
      {children}
    </Layout>
  </Layout>
)

export default connect()(MainLayout)
