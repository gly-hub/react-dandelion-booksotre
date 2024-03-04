import { lazyLoad } from '@/utils';

import { DataRouteObject } from '../types';

const indexRoutes: DataRouteObject[] = [
  {
    path: 'index',
    id: 'adminIndex',
    meta: {
      auth: true,
      menu: true,
      title: '首页',
    },
    element: lazyLoad(() => import('@/pages/admin/index/Index')),
  },
];

export default indexRoutes;
