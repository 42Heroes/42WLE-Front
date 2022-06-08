import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { User } from '../../interfaces/user.interface';
import { onSilentRefresh } from '../../library/api/login';
import { loginState, userState } from '../../recoil/atoms';

interface Props {
  children: React.ReactNode;
}

export default function Auth({ children }: Props) {
  // const setUserData = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(loginState);

  useEffect(() => {
    onSilentRefresh();
    setIsLoggedIn(true);
  }, []);

  return <>{children}</>;
}
