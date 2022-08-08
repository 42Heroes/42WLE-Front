import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { chatState, loginState } from '../../recoil/atoms';
import { SocketEvents } from '../../library/socket.events.enum';
import socket from '../../library/socket';
import { Chat } from '../../interfaces/chat.interface';
import { fetchAccessTokenWithApplyHeaders } from '../../library/api';
import LoadingIndicator from '../../components/common/LoadingIndicator';

export default function Social() {
  const router = useRouter();
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setChatData = useSetRecoilState(chatState);

  const { code } = router.query;

  useEffect(() => {
    const fetchToken = async (code: string) => {
      try {
        const accessToken = await fetchAccessTokenWithApplyHeaders(code);

        socket.connect();

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

    if (typeof code === 'string') {
      fetchToken(code);
    }
  }, [code]);

  return <LoadingIndicator />;
}
