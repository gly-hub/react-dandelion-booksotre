// src/routes/BeforeRouterEach.tsx
import { FC, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DataRouteObject } from './types';

const BeforeRouterEach: FC<{
  route: DataRouteObject;
  children: ReactNode;
}> = ({ route, children }) => {
  const navigate = useNavigate();
  const appContext = useEffect(() => {
    const { meta, path } = route;
    // 判断当前页面是否需要登录才能访问
    const isAuth = meta && meta?.auth;
    // 判断是否进入的是登录页，因为已经登录就不应该再去登录页了
    const isToLogin = ['/login'].includes(path as string);
    // 判断用户是已经登录
    const isLogin = false;
    if (isLogin && isToLogin) {
      // 已经登录且还要进入登录页，则自动重定向到网站首页
      appContext?.message.error('您已经登录系统，无需重复登录！');
      navigate('/');
    } else if (isAuth && !isLogin) {
      // 需要登录才能进入的页面，但是又没有登录，重定向到登录页
      appContext?.message.error(
        '对不起，您还未登录或登录已失效，请登录后访问！'
      );
      navigate('/login');
    }
    if (route.meta?.title) {
      // 有标题信息，更新浏览器标题
      document.title = route.meta?.title;
    } else {
      document.title = import.meta.env.VITE_APP_WEB_TITLE;
    }
  }, [route, navigate, appContext]);

  return children;
};

export default BeforeRouterEach;
