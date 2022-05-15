import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { User } from '../../interfaces/user.interface';
import { loginState, userState } from '../../recoil/atoms';

interface Props {
  children: React.ReactNode;
}

export default function Auth({ children }: Props) {
  const setUserData = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(loginState);

  useEffect(() => {
    const userData: User = {
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
    setUserData(userData);
    setIsLoggedIn(true);
  }, []);
  return <>{children}</>;
}
