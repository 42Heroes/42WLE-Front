import { User } from './user.interface';

export interface PostContent {
  text: string;
  img: string[];
}
export interface Post {
  _id: string;
  author: User;
  contents: PostContent;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
  likes: User[];
  category: string;
}

export interface Comment {
  _id: string;
  author: User;
  createdAt: Date;
  content: string;
  likes: User[];
  is_deleted: boolean;
}

export interface boardContents {
  text: string;
  img: string[];
}

export interface CreatePost {
  contents: boardContents;
}

export interface UpdatePost {
  boardId: string;
  contents: boardContents;
}

export interface CreateComment {
  boardId: string;
  content: string;
}

export interface UpdateComment {
  boardId: string;
  content: string;
  commentId: string;
}

export interface DeleteComment {
  commentId: string;
  boardId: string;
}
