import { useRouter } from 'next/router';
import { ReactElement, useCallback } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import DragDrop from '../../components/common/DragDrop';
import Title from '../../components/common/Title';
import LoginLayout from '../../components/layout/LoginLayout';
import { useRegister } from '../../hooks/useRegister';
import { encodeBase64ImageFile } from '../../library/ImageConverter';

export default function ProfileImage() {
  const router = useRouter();
  const [registerUser, setRegisterUser] = useRegister();

  const { image_url: image } = registerUser;

  const handleNextButtonClick = () => {
    if (!image) {
      return;
    }
    router.push('/register/introduction');
  };

  const onChangeImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement> | any) => {
      let selectedImage;
      if (e.type === 'change') {
        selectedImage = e.target.files[0];
      } else if (e.type === 'drop') {
        selectedImage = e.dataTransfer.files[0];
      }
      if (selectedImage && selectedImage.size <= 2000000) {
        const image_url = await encodeBase64ImageFile(selectedImage as File);
        setRegisterUser({ ...registerUser, image_url });
      }
    },
    [registerUser],
  );

  return (
    <Container>
      <Title>Please register your profile picture</Title>
      <DragDrop image={image} onChangeImage={onChangeImage} />
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
