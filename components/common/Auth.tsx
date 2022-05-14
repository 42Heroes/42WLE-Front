import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { userData, userState } from '../../library/user_atom';

interface Props {
  children: React.ReactNode;
}

export default function Auth({ children }: Props) {
  const setUserData = useSetRecoilState(userState);

  useEffect(() => {
    setUserData(userData);
  }, []);
  return <>{children}</>;
}
