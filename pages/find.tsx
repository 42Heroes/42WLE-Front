import React, { ReactElement, useState } from 'react';
import CommonLayout from '../components/layout/CommonLayout';
import UserCard from '../components/common/UserCard';
import { LanguageInfo, User } from '../interfaces/user.interface';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { ProfileModal } from '../components/common/Modal';
import media from '../styles/media';
import LanguageDropdown from '../components/common/LanguageDropdown';
import languagesBase from '../library/languages';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded';
import ClearIcon from '@mui/icons-material/Clear';
import useMe from '../hooks/useMe';
import { getUsers } from '../library/api';

export default function Find() {
  const usersData = useQuery<User[]>('users', getUsers);
  const meData = useMe();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUser, setModalUser] = useState<User | null>(null);

  const toggleModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented) {
      return;
    }
    setIsModalOpen(!isModalOpen);
  };

  const [languages] = useState(languagesBase);

  const handleNLanguageClick = (clickedLanguage: LanguageInfo) => {
    setSelectedNLanguage(clickedLanguage);
    setIsNDropdownOpened(false);
  };

  const handleLLanguageClick = (clickedLanguage: LanguageInfo) => {
    setSelectedLLanguage(clickedLanguage);
    setIsLDropdownOpened(false);
  };

  const [isNDropdownOpened, setIsNDropdownOpened] = useState(false);
  const [isLDropdownOpened, setIsLDropdownOpened] = useState(false);
  const [selectedNLanguage, setSelectedNLanguage] = useState({ name: 'All' });
  const [selectedLLanguage, setSelectedLLanguage] = useState({ name: 'All' });

  const filteredUsers =
    // 필터링 없을 때
    selectedNLanguage.name === 'All' && selectedLLanguage.name === 'All'
      ? usersData.data
      : // n_language에만 필터링
      selectedNLanguage.name !== 'All' && selectedLLanguage.name === 'All'
      ? usersData.data?.filter((user) =>
          user.n_language.some(
            (language) => language.name === selectedNLanguage.name,
          ),
        )
      : // l_language에만 필터링
      selectedNLanguage.name === 'All' && selectedLLanguage.name !== 'All'
      ? usersData.data?.filter((user) =>
          user.l_language.some(
            (language) => language.name === selectedLLanguage.name,
          ),
        )
      : // 양쪽 모두에 필터링
        usersData.data?.filter(
          (user) =>
            user.l_language.some(
              (language) => language.name === selectedLLanguage.name,
            ) &&
            user.n_language.some(
              (language) => language.name === selectedNLanguage.name,
            ),
        );

  return (
    <Container>
      <LanguageDropdownContainer>
        <LanguageDropdownWrapper>
          <p>Native in</p>
          <LanguageSelectBox>
            <SelectedLanguageBox
              className="selectedItem"
              onClick={() => setSelectedNLanguage({ name: 'All' })}
            >
              {selectedNLanguage.name.toUpperCase()}
              {selectedNLanguage.name === 'All' ? null : <ClearIcon />}
            </SelectedLanguageBox>
          </LanguageSelectBox>
          {isNDropdownOpened ? (
            <IndeterminateCheckBoxRoundedIcon
              sx={{ fontSize: 25 }}
              onClick={() => setIsNDropdownOpened(false)}
              className="plusMinusIcon"
            />
          ) : (
            <AddBoxRoundedIcon
              sx={{ fontSize: 25 }}
              onClick={() => setIsNDropdownOpened(true)}
              className="plusMinusIcon"
            />
          )}
          <DropdownWrapper>
            <StyledLanguageDropdown
              onClickLanguage={handleNLanguageClick}
              languages={languages}
              selectedLanguages={[selectedLLanguage]}
              isOpened={isNDropdownOpened}
            />
          </DropdownWrapper>
        </LanguageDropdownWrapper>

        {/* 배우고 싶은 언어 필터링 */}
        <LanguageDropdownWrapper>
          <p>Learning</p>
          <LanguageSelectBox>
            <SelectedLanguageBox
              className="selectedItem"
              onClick={() => setSelectedLLanguage({ name: 'All' })}
            >
              {selectedLLanguage.name.toUpperCase()}
              {selectedLLanguage.name === 'All' ? null : <ClearIcon />}
            </SelectedLanguageBox>
          </LanguageSelectBox>
          {isLDropdownOpened ? (
            <IndeterminateCheckBoxRoundedIcon
              sx={{ fontSize: 25 }}
              onClick={() => setIsLDropdownOpened(false)}
              className="plusMinusIcon"
            />
          ) : (
            <AddBoxRoundedIcon
              sx={{ fontSize: 25 }}
              onClick={() => setIsLDropdownOpened(true)}
              className="plusMinusIcon"
            />
          )}
          <DropdownWrapper>
            <StyledLanguageDropdown
              onClickLanguage={handleLLanguageClick}
              languages={languages}
              selectedLanguages={[selectedNLanguage]}
              isOpened={isLDropdownOpened}
            />
          </DropdownWrapper>
        </LanguageDropdownWrapper>
      </LanguageDropdownContainer>
      <UserCardWrapper>
        {filteredUsers?.map((user) => (
          <div
            key={user._id}
            onClick={() => {
              setModalUser(user);
              setIsModalOpen(true);
            }}
          >
            <UserCard userCardData={user} me={meData.data} />
          </div>
        ))}
        {isModalOpen && modalUser && (
          <ProfileModal user={modalUser} toggleModal={toggleModal} />
        )}
      </UserCardWrapper>
    </Container>
  );
}

Find.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Find">{page}</CommonLayout>;
};

const Container = styled.div``;

const LanguageDropdownContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  height: 15rem;
  flex-direction: column;
  ${media.medium} {
    flex-direction: row;
  }
`;

const LanguageDropdownWrapper = styled.div`
  color: white;
  position: relative;
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  margin-top: 2rem;
  .plusMinusIcon {
    fill: ${({ theme }) => theme.pointColor};
  }
`;

const LanguageSelectBox = styled.div`
  background-color: #242526;
  border-radius: 10rem;
  padding: 2rem;
  color: white;
  font-size: 2rem;
  width: 17rem;
  height: 4rem;
  margin: 0 2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.grayColor};
    color: ${({ theme }) => theme.fontColor.commentColor};
  }
`;

const StyledLanguageDropdown = styled(LanguageDropdown)``;

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

const DropdownWrapper = styled.div`
  z-index: 99;
  background-color: #000000;
  position: relative;
  bottom: 0;
`;

const SelectedLanguageBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
