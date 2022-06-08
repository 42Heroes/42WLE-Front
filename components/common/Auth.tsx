import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Chat } from '../../interfaces/chat.interface';
import { onSilentRefresh } from '../../library/api';
import socket from '../../library/socket';
import { SocketEvents } from '../../library/socket.events.enum';
import { chatState, loginState } from '../../recoil/atoms';

interface Props {
  children: React.ReactNode;
}

export default function Auth({ children }: Props) {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setChatData = useSetRecoilState(chatState);

  useEffect(() => {
    onSilentRefresh()
      .then((data) => {
        setIsLoggedIn(true);

        const payload = { token: `Bearer ${data}` };
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
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
      });
  }, []);

  return <>{children}</>;
}
