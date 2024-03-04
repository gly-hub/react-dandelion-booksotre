import './App.css';

import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from '@ant-design/cssinjs';
import { ConfigProvider, message, Modal, notification } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';

import { AppContext } from '@/contexts';

import { Router } from './routes';

dayjs.locale('zh-cn');

function App() {
  // 初始化 message
  const [messageApi, messageContextHolder] = message.useMessage();
  // 初始化 Modal
  const [modalApi, modalContextHolder] = Modal.useModal();
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();

  return (
    <StyleProvider
      // `hashPriority` 默认为 `low`，配置为 `high` 后，
      // 会移除 `:where` 选择器封装
      hashPriority="high"
      // `transformers` 提供预处理功能将样式进行转换
      // 为了统一 LTR 和 RTL 样式，Ant Design 使用了 CSS 逻辑属性
      // 需要兼容旧版浏览器使用transformers 将其进行转换
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ee3f4d',
          },
        }}
        locale={zhCN}
      >
        <AppContext.Provider
          value={{
            message: messageApi,
            modal: modalApi,
            notification: notificationApi,
          }}
        >
          <Router></Router>
          {messageContextHolder}
          {modalContextHolder}
          {notificationContextHolder}
        </AppContext.Provider>
      </ConfigProvider>
    </StyleProvider>
  );
}

export default App;
