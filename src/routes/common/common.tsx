import { lazyLoad } from '@/utils';

import { DataRouteObject } from '../types';

const commonRoutes: DataRouteObject[] = [
  {
    path: '/index',
    id: 'index',
    meta: {
      title: '首页',
    },
    element: lazyLoad(() => import('@/pages/front/index/Index')),
  },
  {
    path: '/login',
    id: 'login',
    meta: {
      title: '登录',
    },
    element: lazyLoad(() => import('@/pages/front/login/Login')),
  },
];

export default commonRoutes;
