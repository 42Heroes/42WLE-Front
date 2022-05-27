import React, { ReactElement, useState } from 'react';
import { useRecoilValue } from 'recoil';
import CommonLayout from '../components/layout/CommonLayout';
import { userState } from '../recoil/atoms';
import UserCard from '../components/common/UserCard';
import { User } from '../interfaces/user.interface';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { getUsers } from '../hooks/api/fetchUsers';
import Profile from '../components/profile/Profile';
import ModalPortal from '../components/common/Portal';
import { ProfileModal } from '../components/common/Modal';
import Portal from '../components/common/Portal';

export default function Find() {
  const me: User = {
    _id: 124352,
    nickname: 'junseo',
    intra_id: 'junseo',
    image_url: 'https://cdn.intra.42.fr/users/jojoo.jpg',
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
        n_language: [{ name: 'korean' }],
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
        n_language: [{ name: 'korean' }],
        l_language: [{ name: 'english' }, { name: 'japanese' }],
        join_data: new Date('2015-04-20T15:37:23'),
      },
    ],
    saved_posts: [],
    posts: [],
    n_language: [{ name: 'korean' }],
    l_language: [{ name: 'english' }, { name: 'japanese' }],
    join_data: new Date('2015-04-20T15:37:23'),
  };

  const { data } = useQuery<User[]>('users', getUsers, {
    keepPreviousData: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState({});

  const toggleModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented) {
      return;
    }
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container>
      {data?.map((user) => (
        <div
          key={user._id}
          onClick={() => {
            setModalUser(user);
            setIsModalOpen(true);
          }}
        >
          <UserCard userCardData={user} myData={me} />
        </div>
      ))}
      {isModalOpen && (
        <ProfileModal user={modalUser} toggleModal={toggleModal} />
      )}
    </Container>
  );
}
const Container = styled.div`
  margin: 5rem 3rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 3rem;
  column-gap: 2rem;
  place-items: center;
`;

Find.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Find">{page}</CommonLayout>;
};
