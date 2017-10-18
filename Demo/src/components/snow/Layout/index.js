import { connect } from 'dva';
import HeaderAside from '../header/index';
import LeftSidebar from '../leftSidebar/index';
import { Layout } from 'antd';
import styled from './index.less';
const { Header, Content, Footer, Sider } = Layout;

const MainLayout = ({ children, location, ...val }) => {
  const { menuShink } = val['leftSidebar'];
  return (
    <Layout className={styled.box}>
      <Sider collapsed={menuShink} className={styled.leftAside} ><LeftSidebar {...val} /></Sider>
      <Layout>
        <Header className={styled.header}><HeaderAside {...val} /></Header>
        {children}  
      </Layout>
    </Layout>
  )
}

export default connect(({ leftSidebar, headerAside }) => ({ leftSidebar, headerAside }))(MainLayout)
