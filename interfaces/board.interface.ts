import { User } from "./user.interface";

export interface Post {
    _id: string;
    author: User;
    content: string;
    images: string[];
    comments: Comment[];
    createdAt: Date;
    updatedAt: Date;
    likes: User[];
    category: string;
  }

export interface Comment {
    _id: string;
    user_id: User;
    createdAt: Date;
    content: string;
    likes: User[];
    is_deleted: boolean;
}