import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Button, Card, Form, Input, Spin, Typography } from 'antd';
import { CSSProperties, useContext } from 'react';

import { AppContext } from '@/contexts';
import { postLogin, UserLoginParams } from '@/services';

const loginContent: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
};
const Login = () => {
  const appContext = useContext(AppContext);

  const { run: handleLogin, loading } = useRequest(postLogin, {
    manual: true,
    onSuccess: (res) => {
      console.log(res);
      // 登录成功
      appContext?.message.success('登录成功');
      // TODO: 保存token及用户信息
    },
    onError: (err) => {
      console.log(err);
      // 登录失败，显示错误提示
      appContext?.message.error(err.message);
    },
  });
  const onLogin = (values: UserLoginParams) => {
    if (values) {
      handleLogin(values);
    }
  };
  return (
    <div style={loginContent}>
      <Spin spinning={loading}>
        <Card style={{ width: 450 }}>
          <Form onFinish={onLogin}>
            <Typography.Title level={4}>登录</Typography.Title>
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="请输入用户名"
              ></Input>
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入登录密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入登录密码"
              ></Input.Password>
            </Form.Item>
            <Form.Item noStyle>
              <Button htmlType="submit" type="primary" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;
