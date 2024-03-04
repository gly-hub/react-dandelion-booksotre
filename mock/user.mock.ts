// mock/user.mock.ts
import Mock from 'mockjs';
import { defineMock } from 'vite-plugin-mock-dev-server';

export default defineMock({
  url: '/api/user/login',
  method: 'POST',
  response(req, res) {
    let data = {
      code: 0,
      message: '登录成功！',
      success: true,
      data: {
        id: Mock.mock('@id'),
        token: Mock.mock('@guid'),
        username: req.body.username,
        nickname: Mock.mock('@cname'),
        ...Mock.mock({
          'sex|1': [0, 1, 2],
        }),
        birthday: Mock.mock('@date("yyyy-MM-dd")'),
      },
    };
    if (req.body.username !== 'admin' || req.body.password !== '123456') {
      data = {
        code: 1,
        message: '用户名或密码错误！',
        success: false,
        data: {},
      };
    }
    res.write(JSON.stringify(data));
    res.end();
  },
});
