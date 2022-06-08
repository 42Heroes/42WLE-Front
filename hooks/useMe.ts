import { useQuery } from 'react-query';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { User } from '../interfaces/user.interface';
import { getMe } from '../library/api';
import { loginState, userState } from '../recoil/atoms';

export default function useMe() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const setUser = useSetRecoilState(userState);

  return useQuery<User>(['user', 'me'], getMe, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onSuccess: (response) => {
      setIsLoggedIn(true);
      setUser(response);
    },
    onError: () => setIsLoggedIn(false),
    enabled: isLoggedIn,
  });
}
