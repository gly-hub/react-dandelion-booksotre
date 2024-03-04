import { Card } from 'antd';
import { CSSProperties } from 'react';

const CardStyle: CSSProperties = {
  width: '100%',
  height: '100%',
};
const AdminIndex = () => {
  return (
    <Card style={CardStyle}>
      欢迎登录{import.meta.env.VITE_APP_WEB_TITLE}管理后台
    </Card>
  );
};

export default AdminIndex;
