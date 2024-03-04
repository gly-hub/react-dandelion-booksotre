import { Navigate } from 'react-router-dom';

import { lazyLoad } from '@/utils';

import { DataRouteObject } from '../types';

const exceptionRoutes: DataRouteObject[] = [
  {
    path: '/403',
    id: 'permissionDenied',
    meta: {
      auth: true,
      title: '无权访问',
    },
    element: lazyLoad(() => import('@/pages/front/exceptions/Index')),
  },
  {
    path: '/404',
    id: 'notFound',
    meta: {
      auth: true,
      title: '页面不存在',
    },
    element: lazyLoad(() => import('@/pages/front/exceptions/Index')),
  },
  {
    path: '/500',
    id: 'serverError',
    meta: {
      auth: true,
      title: '服务器错误',
    },
    element: lazyLoad(() => import('@/pages/front/exceptions/Index')),
  },
  {
    path: '*',
    element: <Navigate to="/404" replace />,
  },
];

export default exceptionRoutes;
