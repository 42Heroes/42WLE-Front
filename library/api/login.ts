import axios from 'axios';
import { axiosInstance } from './axios-instance';

export const onSilentRefresh = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('http://localhost:8080/auth/refresh', { withCredentials: true })
      .then((response) => {
        onLoginSuccess(response);
        resolve(response.data);
      })
      .catch((error) => {
        reject('can not get a accessToken');
      });
  });
};

const onLoginSuccess = (response: any) => {
  const accessToken = response.data;

  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${accessToken}`;

  setTimeout(onSilentRefresh, 60 * 15 * 1000 - 60000);
};
