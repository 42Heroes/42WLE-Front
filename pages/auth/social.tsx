import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Social() {
  const router = useRouter();
  console.log('auth/social!!!!!!!!!!!!');
  const { code } = router.query;

  useEffect(() => {
    const fetchToken = async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/social/42?code=${code}`,
        { withCredentials: true },
      );
      axios.defaults.headers.common['Authorization'] = `Bearer ${data}`;
      console.log(data);
      router.replace('/find');
    };
    if (code) {
      fetchToken();
    }
  }, [code]);

  return 'hi';
}
//왜 useEffect를 썼었지? client에서 이뤄지는 일이여서
