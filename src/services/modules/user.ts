// 用户相关接口
import commonReq from '../commonReq';
import reqWithToken from '../reqWithToken';

export type LoginParams = {
  userName: string;
  password: string;
};
export type UserInfo = {
  id: string;
  token: string;
  username: string;
  nickname: string;
  sex: number;
  birthday: string;
};
// 登录请求
export const postLogin = (data: LoginParams) =>
  commonReq.post<UserInfo>({
    url: '/user/login',
    data,
  });

// 获取用户信息
export const getUserInfo = () =>
  reqWithToken.get<Omit<UserInfo, 'token'>>('/user/getUserInfo');
