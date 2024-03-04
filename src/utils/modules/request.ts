// 封装基础 axios
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { RequestInitType, ResponseModel } from '@/services/types';

// 默认请求拦截方法
const defaultResInterceptor = (config: InternalAxiosRequestConfig) => {
  return config;
};
// 默认请求错误拦截方法
const defaultResInterceptorErr = (error: AxiosError) => {
  return Promise.reject(error);
};
// 默认响应拦截方法
const defaultReqInterceptor = (
  response: AxiosResponse<ResponseModel<unknown>>
) => {
  if (response.status === 200 && response.data.code !== 0) {
    return Promise.reject(new Error(response.data.message as string));
  }
  return Promise.resolve(response);
};
// 默认响应错误拦截方法
const defaultReqInterceptorErr = (error: unknown) => {
  return Promise.reject(error);
};
class Request {
  private instance: AxiosInstance;

  constructor({
    // axios 基础配置
    axiosConfig = {
      baseURL: import.meta.env.VITE_APP_API_PREFIX,
      timeout: 5 * 1000,
    },
    // 请求拦截器
    reqInterceptor = defaultReqInterceptor,
    // 请求异常拦截器
    reqInterceptorErr = defaultReqInterceptorErr,
    // 响应拦截器
    resInterceptor = defaultResInterceptor,
    // 响应异常拦截器
    resInterceptorErr = defaultResInterceptorErr,
  }: RequestInitType) {
    // 初始化配置
    this.instance = axios.create(axiosConfig);
    // 初始化请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => reqInterceptor(config),
      (error: AxiosError) => reqInterceptorErr(error)
    );
    // 初始化响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ResponseModel<unknown>>) =>
        resInterceptor(response),
      (error: unknown) => resInterceptorErr(error)
    );
  }

  // 导出全量axios方法
  request<T = unknown>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    return this.instance.request<T>(config) as unknown as Promise<
      AxiosResponse<ResponseModel<T>>
    >;
  }

  // 自定义 get 方法
  get<T = unknown>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<ResponseModel<T>> {
    return this.request<T>({
      url,
      method: 'GET',
      params,
      ...(config || {}),
    });
  }

  // 自定义 post 方法
  post<T = unknown>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseModel<T>>> {
    return this.request<T>({
      method: 'POST',
      ...(config || {}),
    });
  }

  // 自定义 put 方法
  put<T = unknown>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseModel<T>>> {
    return this.request<T>({
      method: 'PUT',
      ...(config || {}),
    });
  }

  // 自定义 delete 方法
  delete<T>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseModel<T>>> {
    return this.request<T>({
      method: 'DELETE',
      ...(config || {}),
    });
  }

  // 自定义上传方法
  upload<T = unknown>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseModel<T>>> {
    return this.request<T>({
      method: 'POST',
      ...config,
      headers: {
        ...config?.headers,
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  // 自定义 get 下载方法
  downloadGet<T = unknown>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseModel<T>>> {
    return this.request<T>({
      method: 'GET',
      ...config,
      responseType: 'blob',
    });
  }

  // 自定义 post 下载方法
  downloadPost<T = unknown>(
    config: AxiosRequestConfig
  ): Promise<AxiosResponse<ResponseModel<T>>> {
    return this.request<T>({
      method: 'POST',
      ...config,
      responseType: 'blob',
    });
  }
}

export default Request;
