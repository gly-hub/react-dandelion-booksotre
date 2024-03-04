import { Navigate } from 'react-router-dom';

import PageLayout from '@/layouts/PageLayout';
import { lazyLoad } from '@/utils';

import { DataRouteObject } from '../types';

const goodsRoutes: DataRouteObject[] = [
  {
    path: 'goods',
    id: 'adminGoods',
    meta: {
      auth: true,
      title: '商品管理',
      menu: true,
    },
    element: <PageLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/admin/goods/list" replace />,
      },
      {
        path: 'list',
        id: 'adminGoodsList',
        meta: {
          auth: true,
          title: '商品列表',
        },
        element: lazyLoad(() => import('@/pages/admin/goods/List')),
      },
      {
        path: 'create',
        id: 'adminGoodsCreate',
        meta: {
          auth: true,
          title: '添加商品',
        },
        element: lazyLoad(() => import('@/pages/admin/goods/Edit')),
      },
      {
        path: 'edit',
        id: 'adminGoodsEdit',
        meta: {
          auth: true,
          title: '修改商品',
        },
        element: lazyLoad(() => import('@/pages/admin/goods/Edit')),
      },
      {
        path: 'detail',
        id: 'adminGoodsDetail',
        meta: {
          auth: true,
          title: '商品详情',
        },
        element: lazyLoad(() => import('@/pages/admin/goods/Detail')),
      },
    ] as DataRouteObject[],
  },
];

export default goodsRoutes;
