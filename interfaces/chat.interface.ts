import { User } from './user.interface';

export interface Chat {
  _id: string;
  createdAt: string;
  updatedAt: string;
  users: User[];
  messages: Message[];
}

export interface Message {
  _id: string;
  chatRoom_id: string;
  user_id: string;
  type: 'text' | 'image';
  content: string;
  createdAt: Date;
}
