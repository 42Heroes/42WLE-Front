import { CreateComment, CreatePost, Post, UpdatePost } from '../../interfaces/board.interface';
import { axiosInstance } from './axios-instance';

export const getPosts = async () => {
  const { data } = await axiosInstance.get('/board');

  return data;
};

export const getPostById = async (postId: string) => {
  const { data } = await axiosInstance.get(`/posts/${postId}`);

  return data;
};

export const createPost = async (newPost: CreatePost) => {
  const { data } = await axiosInstance.post('/board', newPost, {withCredentials: true});

  return data;
};

export const updatePost = async ({boardId, contents}: UpdatePost) => {
  const { data } = await axiosInstance.put('/board', {boardId, contents});

  return data;
};

export const deletePost = async (targetId: string) => {
  const { data } = await axiosInstance.delete(`/posts/${targetId}`);

  return data;
};

export const createComment = async ({boardId, content}: CreateComment) => {
  const { data } = await axiosInstance.post('/board/comment', {boardId, content}, {withCredentials: true});

  return data;
};