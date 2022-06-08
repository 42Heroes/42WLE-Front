import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { onSilentRefresh } from '../../library/api/login';
import { loginState } from '../../recoil/atoms';

interface Props {
  children: React.ReactNode;
}

export default function Auth({ children }: Props) {
  const setIsLoggedIn = useSetRecoilState(loginState);

  useEffect(() => {
    onSilentRefresh()
      .then(() => setIsLoggedIn(true))
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
      });
  }, []);

  return <>{children}</>;
}
