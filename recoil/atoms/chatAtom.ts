import { atom } from 'recoil';
import { Chat, Message } from '../../interfaces/chat.interface';

export const activeChatRoomIdState = atom<string>({
  key: 'activeChatRoom',
  default: '',
});

export const chatState = atom<Chat[]>({
  key: 'chatState',
  default: [],
});

export const unreadMessageState = atom<Message[]>({
  key: 'unreadMessageState',
  default: [],
});