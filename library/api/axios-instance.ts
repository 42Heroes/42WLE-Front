import axios, { AxiosError } from 'axios';
import { onSilentRefresh } from './login';

// axios 인스턴스를 생성합니다.
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 1000,
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

      onSilentRefresh();

      return axiosInstance.request(config);
    }
    return Promise.reject(error);
  },
);
