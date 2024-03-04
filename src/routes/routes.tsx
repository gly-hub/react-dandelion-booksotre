// src/routes/routes.tsx
import { Navigate } from 'react-router-dom';

import AdminLayout from '@/layouts/AdminLayout';
import PageLayout from '@/layouts/PageLayout';

import goodsRoutes from './admin/goods';
import indexRoutes from './admin/index';
import BeforeRouterEach from './BeforeRouterEach';
import commonRoutes from './common/common';
import exceptionRoutes from './common/exceptions';
import { DataRouteObject } from './types';

export const adminRoutes: DataRouteObject[] = [
  {
    path: '/admin',
    id: 'admin',
    meta: {
      auth: true,
      title: '管理后台',
    },
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/admin/index" replace />,
      },
      ...indexRoutes,
      ...goodsRoutes,
    ] as DataRouteObject[],
  },
];
export const frontRoutes: DataRouteObject[] = [
  {
    path: '/',
    id: 'home',
    meta: {
      title: '首页',
    },
    element: <PageLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/index" replace />,
      },
      ...commonRoutes,
    ],
  },
];

const getFullRoutes = (routes: DataRouteObject[]) => {
  return routes.map((route) => {
    const newRoute: DataRouteObject = {
      ...route,
    };
    if (route.meta?.title || route.meta?.auth) {
      newRoute.element = (
        <BeforeRouterEach route={route}>{route.element}</BeforeRouterEach>
      );
    }
    if (route.children) {
      newRoute.children = getFullRoutes(route.children);
    }
    return newRoute;
  });
};
export const fullRoutes: DataRouteObject[] = getFullRoutes([
  ...frontRoutes,
  ...adminRoutes,
  ...exceptionRoutes,
]);
