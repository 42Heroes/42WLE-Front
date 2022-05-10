import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import DragDrop from '../../components/common/DragDrop';
import Title from '../../components/common/Title';
import LoginLayout from '../../components/layout/LoginLayout';

export default function ProfileImage() {
  const [image, setImage] = useState<string | null>(null);

  const handleClickButton = () => {
    if (!image) {
      return;
    }
  };

  return (
    <Container>
      <Title>Please register your profile picture</Title>
      <DragDrop image={image} setImage={setImage} />
      <StyledButton
        type="button"
        size="medium"
        color="blue"
        disabled={!image?.length}
        onClick={handleClickButton}
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
