import { ReactElement } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Title from '../../components/common/Title';
import LoginLayout from '../../components/layout/LoginLayout';
import Profile from '../../components/profile/Profile';

export default function Preview() {
  const dummyUserData = {
    nickname: 'seojunhwan',
    intra_id: 'junseo',
    image_url: '/languages/korean.svg',
    hashtags: ['react', 'hihi'],
    country: 'seoul',
    github_id: 'seojunhwan',
    n_language: [
      {
        language: 'arabic',
        flag: '/languages/arabic.svg',
      },
      {
        language: 'chinese',
        flag: '/languages/chinese.svg',
      },
      {
        language: 'german',
        flag: '/languages/german.svg',
      },
    ],
    l_language: [
      {
        language: 'korean',
        flag: '/languages/korean.svg',
      },
      {
        language: 'english',
        flag: '/languages/english.svg',
      },
      {
        language: 'finnish',
        flag: '/languages/finnish.svg',
      },
    ],
    introduction:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  };
  return (
    <Container>
      <Title>Now you are ready to explore 42WLE</Title>
      <Profile userData={dummyUserData} />
      <StyledButton type="button" size="medium" color="blue">
        START 42WLE
      </StyledButton>
    </Container>
  );
}

Preview.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.pointColor};
  border-radius: 1rem;
  padding: 0 10rem;
  margin-top: 7rem;
`;
