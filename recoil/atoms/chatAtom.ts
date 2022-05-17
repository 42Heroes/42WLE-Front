import { atom } from 'recoil';
import { Chat } from '../../interfaces/chat.interface';

export const chatState = atom<Chat[]>({
  key: 'chatState',
  default: []
});