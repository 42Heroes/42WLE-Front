import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import useMessage from '../../hooks/useMessage';
import { onSilentRefresh } from '../../library/api';
import socket from '../../library/socket';
import { loginState } from '../../recoil/atoms';

interface Props {
  children: React.ReactNode;
}

export default function Auth({ children }: Props) {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const { requestAuthorization, requestInitialData } = useMessage();

  useEffect(() => {
    onSilentRefresh()
      .then(async (accessToken) => {
        socket.connect();

        const payload = { token: `Bearer ${accessToken}` };

        requestAuthorization(payload).then(() => {
          requestInitialData();
        });

        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
      });
  }, []);

  return <>{children}</>;
}
