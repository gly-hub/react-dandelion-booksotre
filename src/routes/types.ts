import { ReactNode } from 'react';
import { RouteObject } from 'react-router-dom';
// 对原生路由信息进行扩展
export type DataRouteObject = RouteObject & {
  // 路由唯一id
  id?: string;
  // 路由扩展信息
  meta?: {
    // 路由是否需要登录
    auth?: boolean;
    // 是否是菜单,一般菜单都是和路由绑定的，通常都直接和路由信息配置在一起，再通过接口获取菜单信息，生成实际菜单
    menu?: boolean;
    // 路由名称
    title: string;
    // 菜单图标
    icon?: ReactNode;
  };
  //嵌套子路由
  children?: DataRouteObject[];
};
