import { Request } from '@/utils';

const commonReq = new Request({
  axiosConfig: {
    baseURL: import.meta.env.VITE_APP_API_PREFIX,
    timeout: 5 * 1000,
  },
});

export default commonReq;
