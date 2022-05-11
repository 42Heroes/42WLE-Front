import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Title from '../../components/common/Title';
import LoginLayout from '../../components/layout/LoginLayout';
import Profile from '../../components/profile/Profile';

const dummyUserData = {
  nickname: 'seojunhwan',
  intra_id: 'junseo',
  image_url: '/languages/korean.svg',
  hashtags: [],
  country: 'seoul',
  github_id: '',
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

export default function Preview() {
  const [userData, setUserData] = useState(dummyUserData);

  useEffect(() => {
    const nickname = localStorage.getItem('sign_up-nickname');
    const nativeLanguages = JSON.parse(
      localStorage.getItem('sign_up-native-languages') ?? 'null',
    );
    const learnLanguages =
      JSON.parse(localStorage.getItem('sign_up-learn-languages') ?? 'null') ??
      [];
    const photo = localStorage.getItem('sign_up-photo') ?? '';
    const introduction = localStorage.getItem('sign_up-introduction');
    const hashtags =
      JSON.parse(localStorage.getItem('sign_up-hashTag') ?? 'null') ?? [];
    const github_id = localStorage.getItem('sign_up-github') || '';
    if (!nickname || !introduction || !photo) {
      return;
    } else {
      // TODO: language 불러오기, 데이터 유무 및 검증하기
      setUserData({
        ...userData,
        nickname,
        github_id,
        hashtags,
        introduction,
        image_url: photo,
        l_language: nativeLanguages,
        n_language: learnLanguages,
      });
    }
  }, []);

  const handleStartButtonClick = async () => {
    const res = await axios.get('/user/123');
  };

  return (
    <Container>
      <Title>
        Great! <br />
        Now you are ready to explore 42WLE
      </Title>
      <Profile userData={userData} />
      <StyledButton
        type="button"
        size="medium"
        color="blue"
        onClick={handleStartButtonClick}
      >
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
