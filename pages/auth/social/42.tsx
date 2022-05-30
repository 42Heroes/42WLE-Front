import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { chatState, userState } from '../../../recoil/atoms';
import { CircularProgress } from '@mui/material';
import socket from '../../../library/socket';
import { SocketEvents } from '../../../library/socket.events.enum';

export default function FortyTwoAuth() {
  const setUser = useSetRecoilState(userState);
  const setChatData = useSetRecoilState(chatState);
  const router = useRouter();
  const code = router.query.code;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchToken = async () => {
      const {
        data: { accessToken, user },
      } = await axios.get(
        `http://10.19.233.133:8080/auth/social/42?code=${code}`,
      );
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      socket.emit(
        SocketEvents.Authorization,
        {
          token: `Bearer ${accessToken}`,
        },
        (res: { status: string; message: string }) => {
          if (res.status === 'ok') {
            socket.emit(SocketEvents.ReqInitialData, (res: any) => {
              setChatData(res);
            });
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
