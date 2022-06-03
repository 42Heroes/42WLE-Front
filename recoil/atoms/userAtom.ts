import { atom } from 'recoil';
import { RegisterUser, User } from '../../interfaces/user.interface';
import { recoilPersist } from 'recoil-persist';

// TODO: dummyUserData 추후 수정 필요

const { persistAtom } = recoilPersist({
  key: 'registerUserData',
});

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const registerState = atom<RegisterUser>({
  key: 'registerState',
  default: {
    n_language: [],
    l_language: [],
    nickname: '',
    image_url: '',
    introduction: '',
    hashtags: [],
    github_id: '',
    country: '',
    intra_id: '',
  },
  effects: [persistAtom],
});

export const loginState = atom<boolean>({
  key: 'loginState',
  default: false,
});
