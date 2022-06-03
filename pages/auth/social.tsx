import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Social() {
  const router = useRouter();
  console.log('auth/social!!!!!!!!!!!!');
  const { code } = router.query;

  useEffect(() => {
    if (code) {
      (async () => {
        await axios(`http://localhost:3001/api/callback?code=${code}`);
        router.replace('/find');
        document.cookie = 'tester=myToken';
      })();
    }
  }, [code]);
  // useEffect에서 비동기를 하려면

  return 'hi';
}
