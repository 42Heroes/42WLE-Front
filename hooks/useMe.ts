import { useQuery } from 'react-query';
import { User } from '../interfaces/user.interface';
import { getMe } from '../library/api';

export default function useMe() {
  return useQuery<User>(['user', 'me'], getMe);
}
