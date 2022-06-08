import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { axiosInstance } from '../../library/api/axios-instance';
import { loginState } from '../../recoil/atoms';

export default function Social() {
  const router = useRouter();
  const setIsLoggedIn = useSetRecoilState(loginState);

  const { code } = router.query;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data } = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/social/42?code=${code}`,
        );
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data}`;

        router.replace('/find');
        setIsLoggedIn(true);
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
//왜 useEffect를 썼었지? client에서 이뤄지는 일이여서
