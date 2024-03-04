// 自定义 axios 要用到的基础类型
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 请求拦截器类型
export type AxiosResInterceptorType = (
  response: AxiosResponse<ResponseModel<unknown>>
) => Promise<AxiosResponse<ResponseModel<unknown>, unknown>>;
// 请求拦截器错误类型
export type AxiosResInterceptorErrType = (error: unknown) => Promise<never>;
// 响应拦截器类型

export type AxiosReqInterceptorType = (
  config: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
// 响应拦截器错误类型
export type AxiosReqInterceptorErrType = (error: AxiosError) => Promise<never>;

// axios 实例化配置参数类型
export type RequestInitType = {
  axiosConfig?: AxiosRequestConfig;
  reqInterceptor?: AxiosReqInterceptorType;
  reqInterceptorErr?: AxiosReqInterceptorErrType;
  resInterceptor?: AxiosResInterceptorType;
  resInterceptorErr?: AxiosResInterceptorErrType;
};

// 与后端约定的响应数据类型
export interface ResponseModel<T = unknown> {
  success: boolean;
  message: string | null;
  code: number | string;
  data: T;
}

// 与后端约定的列表分页数据类型
export interface Pagination<T = unknown> {
  pageNum: number;
  pageSize: number;
  total: number;
  data: T[];
}
