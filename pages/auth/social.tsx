import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../recoil/atoms';
import socket from '../../library/socket';
import { fetchAccessTokenWithApplyHeaders } from '../../library/api';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import useMessage from '../../hooks/useMessage';

export default function Social() {
  const router = useRouter();
  const setIsLoggedIn = useSetRecoilState(loginState);
  const { requestAuthorization, requestInitialData } = useMessage();

  const { code } = router.query;

  useEffect(() => {
    const fetchToken = async (code: string) => {
      try {
        const accessToken = await fetchAccessTokenWithApplyHeaders(code);

        socket.connect();

        const payload = { token: `Bearer ${accessToken}` };

        requestAuthorization(payload).then(() => {
          requestInitialData();
        });

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
