import { InternalAxiosRequestConfig } from 'axios';
import localforage from 'localforage';

import { Request } from '@/utils';

const reqWithToken = new Request({
  axiosConfig: {
    baseURL: import.meta.env.VITE_APP_API_PREFIX,
    timeout: 5 * 1000,
  },
  resInterceptor: async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await localforage.getItem('token');
      if (!token) {
        return Promise.reject(new Error('401'));
      }
      config.headers.set('Authorization', `Bearer ${token}`);
      return config;
    } catch (error) {
      return Promise.reject(new Error('401'));
    }
  },
});

export default reqWithToken;
