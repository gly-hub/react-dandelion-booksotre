// 管理后台布局
import { Layout } from 'antd';
import { CSSProperties } from 'react';

import PageLayout from './PageLayout';

const { Header, Sider, Content, Footer } = Layout;

const LayoutStyle: CSSProperties = {
  minHeight: '100%',
};
const ContentStyle: CSSProperties = {
  overflow: 'auto',
  height: 'calc(100vh - 64px)',
};
const MainStyle: CSSProperties = {
  minHeight: 'calc(100vh - 64px - 67px)',
  padding: '20px',
};
const AdminLayout = () => {
  return (
    <Layout style={LayoutStyle}>
      <Header>页头</Header>
      <Layout>
        <Sider>侧边栏</Sider>
        <Content style={ContentStyle}>
          <div style={MainStyle}>
            <PageLayout />
          </div>
          <Footer>页尾</Footer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
