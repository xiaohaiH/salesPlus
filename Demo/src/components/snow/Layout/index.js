import { connect } from 'dva';
import HeaderAside from '../header/index';
import LeftSidebar from '../leftSidebar/index';
import { Layout } from 'antd';
import styled from './index.less';
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = ({ children, location, ...val }) => {
  window.dispatch = val.dispatch;
  const { menuShink } = val['leftSidebar'];
  return (
    <Layout className={styled.box}>
      <LeftSidebar {...val} />
      <Layout>
        <Header className={styled.header}><HeaderAside {...val} /></Header>
        {children}  
      </Layout>
    </Layout>
  )
}

export default connect(({ leftSidebar, headerAside }) => ({ leftSidebar, headerAside }))(MainLayout)
