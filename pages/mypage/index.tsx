import { ReactElement } from 'react';
import styled from 'styled-components';
import CommonLayout from '../../components/layout/CommonLayout';
import Profile from '../../components/profile/Profile';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import media from '../../styles/media';
import { useRouter } from 'next/router';
import useMe from '../../hooks/useMe';

export default function MyPage() {
  const router = useRouter();

  const { data: me, isLoading, isError, isIdle } = useMe();

  const handleEditButtonClick = () => {
    router.push('/mypage/edit');
  };

  if (isLoading || isIdle) return 'loading...';

  if (isError) return 'error';

  return (
    <>
      <Container>
        <div>
          <ProfileSection>
            <SectionTitle>
              <div>
                <h2>My Profile</h2>
                <ProfileEditButton onClick={handleEditButtonClick}>
                  <BorderColorRoundedIcon />
                </ProfileEditButton>
              </div>
            </SectionTitle>
            <Profile user={me} />
          </ProfileSection>
          <LikedUsersSection>
            <SectionTitle>
              <h2>Liked Users</h2>
            </SectionTitle>
            <LikedUsersContainer>
              {me?.liked_users.map((likedUser) => (
                <li key={likedUser._id}> {likedUser.nickname}</li>
              ))}
            </LikedUsersContainer>
          </LikedUsersSection>
        </div>
      </Container>

      <Container>
        <ProfileSection>
          <SectionTitle>
            <div>
              <h2>My Profile</h2>
              <BorderColorRoundedIcon />
            </div>
          </SectionTitle>
          <Profile user={me} />
        </ProfileSection>
        <LikedUsersSection></LikedUsersSection>
      </Container>
    </>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Board">{page}</CommonLayout>;
};

const Container = styled.div`
  display: flex;
  min-width: 100%;
  min-height: 100%;
  justify-content: center;
  align-items: center;
  & > div {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    padding: 10rem;
    justify-content: space-around;
    ${media.large} {
      flex-direction: row;
      align-items: flex-start;
    }
  }
`;

const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  align-items: center;
`;

const LikedUsersSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  ${media.large} {
    margin-top: 0;
  }
`;

const LikedUsersContainer = styled.ul`
  display: grid;
  /* grid-template-rows: repeat(3, 18rem); */
  /* gap: 2rem; */
  /* min-width: 40rem; */
  li {
    background-color: white;
  }
`;

const SectionTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4.5rem;
  width: 100%;
  ${({ theme }) => theme.font.subTitleBold};
  div {
    position: relative;
  }
  h2 {
    color: ${({ theme }) => theme.fontColor.titleColor};
    line-height: 3.6rem;
    ${({ theme }) => theme.font.subTitleBold};
  }
`;

const ProfileEditButton = styled.button`
  cursor: pointer;
  position: absolute;
  right: -6.6rem;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: fit-content;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  transition: background-color 0.2s ease-in-out;
  svg {
    font-size: 2.7rem;
    fill: ${({ theme }) => theme.pointColor};
  }
  &:hover {
    background-color: ${({ theme }) => `${theme.grayColor}50`};
  }
`;
