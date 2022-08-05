import { UpdateUserInfo } from '../../interfaces/user.interface';
import { axiosInstance } from './axios-instance';

export const getUsers = async () => {
  const { data } = await axiosInstance.get('/users');

  return data;
};

export const getUserById = async (userId: string) => {
  const { data } = await axiosInstance.get(`/users/${userId}`);

  return data;
};

export const getMe = async () => {
  const { data } = await axiosInstance.get(`/users/me`);

  return data;
};

export const updateMe = async (newInfo: UpdateUserInfo) => {
  const { data } = await axiosInstance.put('/users/me', newInfo);

  return data;
};

export const updateImage = async (newImageUrl: string) => {
  const { data } = await axiosInstance.patch('/users/me/profile', newImageUrl);

  return data;
};

export const changeLikeUser = async ({
  targetId,
  like,
}: {
  targetId: string;
  like: boolean;
}) => {
  const { data } = await axiosInstance.patch(`/users/me/like/${targetId}`, {
    like,
  });

  return data;
};

export const logoutUser = async () => {
  const { status } = await axiosInstance.post('/users/me/logout');
  axiosInstance.defaults.headers.common['Authorization'] = '';

  return status;
};
