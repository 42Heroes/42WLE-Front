import { useResetRecoilState } from 'recoil';
import {
  activeChatRoomIdState,
  callListState,
  chatState,
  connectedUserListState,
  isCallingState,
  localStreamState,
  loginState,
  peerConnectionState,
  roomNoState,
  unreadMessageState,
} from '../recoil/atoms';
import { useCallback } from 'react';

export const useResetRecoil = () => {
  const resetLoginState = useResetRecoilState(loginState);
  const resetChatState = useResetRecoilState(chatState);
  const resetCallListState = useResetRecoilState(callListState);
  const resetPeerConnectionState = useResetRecoilState(peerConnectionState);
  const resetConnectedUserListState = useResetRecoilState(
    connectedUserListState,
  );
  const resetIsCallingState = useResetRecoilState(isCallingState);
  const resetRoomNoState = useResetRecoilState(roomNoState);
  const resetLocalStreamState = useResetRecoilState(localStreamState);
  const resetActiveChatRoomIdState = useResetRecoilState(activeChatRoomIdState);
  const resetUnreadMessageState = useResetRecoilState(unreadMessageState);

  const resetAllState = useCallback(() => {
    resetLoginState();
    resetChatState();
    resetCallListState();
    resetPeerConnectionState();
    resetConnectedUserListState();
    resetIsCallingState();
    resetRoomNoState();
    resetLocalStreamState();
    resetActiveChatRoomIdState();
    resetUnreadMessageState();
  }, []);

  return { resetAllState };
};
