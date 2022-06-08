import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { loginState, userState } from '../../recoil/atoms';

interface Props {
  children: React.ReactNode;
}

export default function Auth({ children }: Props) {
  const setIsLoggedIn = useSetRecoilState(loginState);

  useEffect(() => {
    setIsLoggedIn(true);
  }, []);
  return <>{children}</>;
}
