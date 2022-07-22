import { axiosInstance } from './axios-instance';

export const getPosts = async () => {
  const { data } = await axiosInstance.get('/board');

  return data;
};

export const getPostById = async (postId: string) => {
  const { data } = await axiosInstance.get(`/posts/${postId}`);

  return data;
};

export const deletePost = async (targetId: string) => {
  const { data } = await axiosInstance.delete(`/posts/${targetId}`);

  return data;
};
