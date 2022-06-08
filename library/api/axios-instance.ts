import axios, { AxiosError } from 'axios';
import { onSilentRefresh } from './login';

const MAX_RETRY_COUNT = 2;

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },

  async function (error: AxiosError) {
    if (error.response?.status === 401) {
      const config = error.config;

      config.retryCount = config.retryCount ?? 0;
      const shouldRetry = config.retryCount < MAX_RETRY_COUNT;

      if (shouldRetry) {
        config.retryCount += 1;
        const res = await onSilentRefresh();
        console.log(res);

        return axiosInstance.request(config);
      }
    }
    return Promise.reject(error);
  },
);
