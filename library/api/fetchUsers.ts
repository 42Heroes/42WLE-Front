import { axiosInstance } from './axios-instance';

export const getUsers = async () => {
  const { data } = await axiosInstance.get('/users');

  return data;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get('/users/me');

  return data;
};

export const addLikeUser = async (targetId: string) => {
  const { data } = await axiosInstance.patch(`users/me/like/${targetId}`);

  return data;
};

export const deleteLikeUser = async (targetId: string) => {
  const { data } = await axiosInstance.delete(`users/me/like/${targetId}`);

  return data;
};
