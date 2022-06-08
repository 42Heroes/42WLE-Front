import { atom } from 'recoil';
import { Chat } from '../../interfaces/chat.interface';

export const activeChatRoomIdState = atom<string>({
  key: 'activeChatRoom',
  default: '',
});

export const chatState = atom<Chat[]>({
  key: 'chatState',
  default: [],
});
