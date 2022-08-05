import { useEffect, useState } from 'react';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { RegisterUser } from '../interfaces/user.interface';
import { registerState } from '../recoil/atoms';

export function useRegister(): [RegisterUser, SetterOrUpdater<RegisterUser>] {
  const [isInitial, setIsInitial] = useState(true);
  const [registerUser, setRegisterUser] = useRecoilState(registerState);

  const defaultRegisterUser: RegisterUser = {
    n_language: [],
    l_language: [],
    nickname: '',
    image_url: '',
    introduction: '',
    hashtags: [],
    github_id: '',
  };

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultRegisterUser : registerUser, setRegisterUser];
}
