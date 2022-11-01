import { useRecoilValue } from 'recoil';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

import usePeerConnection from './usePeerConnection';
import { useResetRecoil } from './useResetRecoil';
import { isCallingState } from '../recoil/atoms';
import { logoutUser } from '../library/api';
import socket from '../library/socket';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { handleEndCall } = usePeerConnection();
  const { resetAllState } = useResetRecoil();
  const isCalling = useRecoilValue(isCallingState);

  async function logout(afterToRoute?: string) {
    await logoutUser();
    if (isCalling) {
      await handleEndCall();
    }
    socket.disconnect();
    resetAllState();
    queryClient.removeQueries(['user', 'me']);
    router.replace(afterToRoute ?? '/');
  }

  return { logout };
};
