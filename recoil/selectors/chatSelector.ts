import { selector } from 'recoil';
import { activeChatRoomIdState, chatState, userState } from '../atoms';

export const activeChatRoomState = selector({
  key: 'activeChatRoomState',
  get: ({ get }) => {
    const chatRooms = get(chatState);
    const activeChatRoomId = get(activeChatRoomIdState);

    if (activeChatRoomId) {
      return chatRooms.find((chatRoom) => chatRoom._id === activeChatRoomId);
    }
  },
});

export const activeChatPartnerState = selector({
  key: 'activeChatPartner',
  get: ({ get }) => {
    const activeChatRoom = get(activeChatRoomState);
    const me = get(userState);

    return activeChatRoom?.users.find((user) => user._id !== me?._id);
  },
});
