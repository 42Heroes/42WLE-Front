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
import media from '../styles/media';
import LanguageDropdown from '../components/common/LanguageDropdown';
import languagesBase from '../library/languages';
import { useRegister } from '../hooks/useRegister';

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

  const [languages] = useState(languagesBase);
  const handleNLanguageClick = (clickedLanguage) => {
    setSelectedNLanguage(clickedLanguage);
    setIsNDropdownOpened(false);
  };

  const handleLLanguageClick = (clickedLanguage) => {
    setSelectedLLanguage(clickedLanguage);
    setIsLDropdownOpened(false);
  };

  const [isNDropdownOpened, setIsNDropdownOpened] = useState(false);
  const [isLDropdownOpened, setIsLDropdownOpened] = useState(false);
  const [selectedNLanguage, setSelectedNLanguage] = useState({ name: 'All' });
  const [selectedLLanguage, setSelectedLLanguage] = useState({ name: 'All' });
  return (
    <Container>
      <LanguageDropdownContainer>
        <LanguageDropdownWrapper>
          <p>Natvie in</p>
          <LanguageSelectBox onClick={() => setIsNDropdownOpened(true)}>
            <div className="selectedItem">
              {selectedNLanguage.name.toUpperCase()}
            </div>
          </LanguageSelectBox>
          <StyledLanguageDropdown
            onClickLanguage={handleNLanguageClick}
            languages={languages}
            selectedLanguages={[selectedLLanguage]}
            isOpened={isNDropdownOpened}
          />
        </LanguageDropdownWrapper>
        <LanguageDropdownWrapper>
          <p>Learning</p>
          <LanguageSelectBox onClick={() => setIsLDropdownOpened(true)}>
            <div className="selectedItem">
              {selectedLLanguage.name.toUpperCase()}
            </div>
          </LanguageSelectBox>
          <StyledLanguageDropdown
            onClickLanguage={handleLLanguageClick}
            languages={languages}
            selectedLanguages={[selectedNLanguage]}
            isOpened={isLDropdownOpened}
          />
        </LanguageDropdownWrapper>
      </LanguageDropdownContainer>
      <UserCardWrapper>
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
      </UserCardWrapper>
    </Container>
  );
}

const Container = styled.div``;

const LanguageDropdownContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const LanguageDropdownWrapper = styled.div`
  color: white;
  position: relative;
`;

const LanguageSelectBox = styled.div`
  background-color: tomato;
  color: white;
  font-size: 2rem;
  width: 20rem;
  height: 4rem;
`;

const StyledLanguageDropdown = styled(LanguageDropdown)`
  left: 0;
  position: relative;
`;

const UserCardWrapper = styled.div`
  margin: 5rem 3rem;
  display: grid;
  row-gap: 3rem;
  column-gap: 2rem;
  place-items: center;

  grid-template-columns: repeat(1, 1fr);

  ${media.medium} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${media.large} {
    grid-template-columns: repeat(auto-fill, minmax(39rem, auto));
  }
`;

Find.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Find">{page}</CommonLayout>;
};
