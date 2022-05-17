import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import CommonLayout from '../components/layout/CommonLayout';
import { userState } from '../recoil/atoms';
import UserCard from '../components/common/UserCard';
import { User } from '../interfaces/user.interface';
export default function Find() {
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

  return (
    <>
      <UserCard userCardData={userData} />
    </>
  );
}

Find.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Find">{page}</CommonLayout>;
};
