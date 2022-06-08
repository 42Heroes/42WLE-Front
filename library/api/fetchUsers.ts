import { axiosInstance } from './axios-instance';

export const getUsers = async () => {
  const { data } = await axiosInstance.get('/users');
  return data;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get('/users/me');
  return data;
};

export const silentRT = async () => {
  const { data } = await axiosInstance.get('/users/me');
  return data;
};
