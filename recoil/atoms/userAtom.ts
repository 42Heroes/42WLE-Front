import { atom } from 'recoil';
import { LanguageInfo, User } from '../../interfaces/user.interface';
import { recoilPersist } from 'recoil-persist';

// TODO: dummyUserData 추후 수정 필요

const { persistAtom } = recoilPersist({
  key: 'register',
});

export const userData: User = {
  _id: 124352,
  nickname: 'junseo',
  intra_id: 'junseo',
  image_url: '/languages/korean.svg',
  campus: '42seoul',
  createdAt: new Date('2015-04-20T15:37:23'),
  hashtags: ['react', 'food'],
  country: 'korea',
  github_id: 'Seojunhwan',
  introduction: 'Interested in optimizaion',
  chatRooms: [123, 456, 789],
  liked_users: [
    {
      _id: 1323,
      nickname: 'sjo',
      intra_id: 'sjo',
      image_url: 'goodday',
      campus: '42seoul',
      createdAt: new Date('2015-04-20T15:37:23'),
      hashtags: ['react', 'food'],
      country: 'korea',
      github_id: 'Seojunhwan',
      introduction: 'Interested in optimizaion',
      chatRooms: [123, 456, 789],
      liked_users: [],
      saved_posts: [],
      posts: [],
      n_language: [{ name: 'korea' }],
      l_language: [{ name: 'english' }, { name: 'japanese' }],
      join_data: new Date('2015-04-20T15:37:23'),
    },
    {
      _id: 352,
      nickname: 'jojoo',
      intra_id: 'jojoo',
      image_url: 'goodday',
      campus: '42seoul',
      createdAt: new Date('2015-04-20T15:37:23'),
      hashtags: ['react', 'food'],
      country: 'korea',
      github_id: 'joo',
      introduction: 'Interested in optimizaion',
      chatRooms: [123, 456, 789],
      liked_users: [],
      saved_posts: [],
      posts: [],
      n_language: [{ name: 'korea' }],
      l_language: [{ name: 'english' }, { name: 'japanese' }],
      join_data: new Date('2015-04-20T15:37:23'),
    },
  ],
  saved_posts: [],
  posts: [],
  n_language: [{ name: 'korea' }],
  l_language: [{ name: 'english' }, { name: 'japanese' }],
  join_data: new Date('2015-04-20T15:37:23'),
};

interface IRegister {
  n_language: LanguageInfo[];
  l_language: LanguageInfo[];
  nickname: string;
  image_url: string;
  introduction: string;
  hashtags: string[];
  github_id: string;
}

export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

export const registerState = atom<IRegister | null>({
  key: 'register',
  default: null,
  effects: [persistAtom],
});
