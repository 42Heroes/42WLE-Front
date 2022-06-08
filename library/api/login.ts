import axios from 'axios';
import { axiosInstance } from './axios-instance';

export const onSilentRefresh = () => {
  axios
    .get('http://localhost:8080/auth/refresh', { withCredentials: true })
    .then(onLoginSuccess)
    .catch((error) => {
      console.log('실패함');
    });
};

const onLoginSuccess = (response: any) => {
  const accessToken = response.data;
  console.log('useEffect AT', accessToken);

  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${accessToken}`;

  setTimeout(onSilentRefresh, 60 * 15 * 1000 - 60000);
};
