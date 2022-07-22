import { selector } from 'recoil';
import { connectedUserListState, isCallingState, roomNoState } from '../atoms';

export const callInfoState = selector({
  key: 'callInfoState',
  get: ({ get }) => {
    const connectedUserList = get(connectedUserListState);
    const isCalling = get(isCallingState);
    const roomNo = get(roomNoState);
    return { isCalling, roomNo, users: connectedUserList };
  },
});
