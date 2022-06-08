import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { chatState, userState } from '../../../recoil/atoms';
import { CircularProgress } from '@mui/material';
import socket from '../../../library/socket';
import { SocketEvents } from '../../../library/socket.events.enum';
import { Chat } from '../../../interfaces/chat.interface';

export default function FortyTwoAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const setUser = useSetRecoilState(userState);
  const setChatData = useSetRecoilState(chatState);
  const router = useRouter();
  const code = router.query.code;

  useEffect(() => {
    setIsLoading(true);
    const fetchToken = async () => {
      const {
        data: { accessToken, user },
      } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/social/42?code=${code}`,
      );
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      const payload = { token: `Bearer ${accessToken}` };
      // socket 유저 인증
      socket.emit(
        SocketEvents.Authorization,
        payload,
        (res: { status: string; message: string }) => {
          if (res.status === 'ok') {
            socket.emit(SocketEvents.ReqInitialData, (res: Chat[]) => {
              setChatData(res);
            });
          } else {
            console.log('ReqInitialData 실패했습니다.');
          }
        },
      );
      setIsLoading(false);
      setUser(user);
      if (!user.isRegisterDone) {
        return router.replace('/register/learn');
      }
      router.replace('/find');
    };
    if (code) {
      fetchToken();
    }
  }, [code]);

  return <>{isLoading && <CircularProgress />}</>;
}
