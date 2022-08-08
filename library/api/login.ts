import axios from 'axios';
import { axiosInstance } from './axios-instance';

export const onSilentRefresh = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh` as string, {
        withCredentials: true,
      })
      .then((response) => {
        onLoginSuccess(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        reject('can not get a accessToken');
      });
  });
};

const onLoginSuccess = (accessToken: string) => {
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${accessToken}`;

  setTimeout(onSilentRefresh, 60 * 15 * 1000 - 60000);
};

export const fetchAccessTokenWithApplyHeaders = async (code: string) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/social/42?code=${code}`)
      .then((response) => {
        const { data: accessToken } = response;
        onLoginSuccess(accessToken);
        resolve(accessToken);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
