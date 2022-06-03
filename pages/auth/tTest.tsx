import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Teeester() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await axios('http://localhost:3001/api/callback');
      document.cookie = 'namekdk=dkdk';
      router.replace('/find');
    })();
  }, []);
  return 'heel';
}
