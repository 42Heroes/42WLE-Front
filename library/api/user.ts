import axios from 'axios';
import { User } from '../../interfaces/user.interface';

export const getUsers = async () => {
  const { data } = await axios.get('/users');

  return data;
};

export const getUserById = async (userId: string) => {
  const { data } = await axios.get(`/users/${userId}`);

  return data;
};

export const getMe = async () => {
  const { data } = await axios.get(`/users/628f187f06702819dfd6b81b`);

  return data;
};

export const updateMe = async (newInfo: User) => {
  const { data } = await axios.put('/users/me', newInfo);

  return data;
};
