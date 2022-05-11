import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import DragDrop from '../../components/common/DragDrop';
import Title from '../../components/common/Title';
import LoginLayout from '../../components/layout/LoginLayout';

export default function ProfileImage() {
  const router = useRouter();
  const [image, setImage] = useState('');

  const handleNextButtonClick = () => {
    if (!image) {
      return;
    }
    router.push('/register/introduction');
  };

  useEffect(() => {
    const persistNickname = localStorage.getItem('sign_up-nickname');
    const persistImage = localStorage.getItem('sign_up-photo');
    if (!persistNickname) {
      router.replace('/register/nickname');
    } else {
      if (persistImage) {
        setImage(persistImage);
      }
    }
  }, []);

  return (
    <Container>
      <Title>Please register your profile picture</Title>
      <DragDrop image={image} setImage={setImage} />
      <StyledButton
        type="button"
        size="medium"
        color="blue"
        disabled={!image.length}
        onClick={handleNextButtonClick}
      >
        NEXT
      </StyledButton>
    </Container>
  );
}

ProfileImage.getLayout = function getLayout(page: ReactElement) {
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
`;
