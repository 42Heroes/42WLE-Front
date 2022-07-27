import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { User } from '../interfaces/user.interface';
import { getMe } from '../library/api';
import { loginState, userState } from '../recoil/atoms';

export default function useMe() {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setUser = useSetRecoilState(userState);

  return useQuery<User>(['user', 'me'], getMe, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    onSuccess: (response) => {
      setIsLoggedIn(true);
      setUser(response);
    },
    onError: () => setIsLoggedIn(false),
    retry: false,
  });
}
