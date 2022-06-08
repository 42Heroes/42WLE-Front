import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { axiosInstance } from '../../library/api/axios-instance';
import { chatState, loginState } from '../../recoil/atoms';
import { SocketEvents } from '../../library/socket.events.enum';
import socket from '../../library/socket';
import { Chat } from '../../interfaces/chat.interface';

export default function Social() {
  const router = useRouter();
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setChatData = useSetRecoilState(chatState);

  const { code } = router.query;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data: accessToken } = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/social/42?code=${code}`,
        );

        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;

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
        setIsLoggedIn(true);
        router.replace('/find');
      } catch (error) {
        console.log(error);
      }
    };
    if (code) {
      fetchToken();
    }
  }, [code]);

  return 'hi';
}
