import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useRouter } from 'next/router';
import { ReactElement, useCallback, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import DragDrop from '../../components/common/DragDrop';
import Title from '../../components/common/Title';
import LoginLayout from '../../components/layout/LoginLayout';
import { useRegister } from '../../hooks/useRegister';
import {
  dataURLtoFile,
  encodeBase64ImageFile,
} from '../../library/ImageConverter';
import { uploadFileToS3 } from '../../library/api';

export default function ProfileImage() {
  const router = useRouter();
  const [isExceededSize, setIsExceededSize] = useState(false);
  const [registerUser, setRegisterUser] = useRegister();

  const { image_url: image } = registerUser;

  const handleNextButtonClick = async () => {
    if (!image) {
      return;
    }
    const name = uuid();
    const file = dataURLtoFile(image, name);

    const uploadUrl = await uploadFileToS3(file, '/profile-image');

    const res = await axios.patch('/me/profile', {
      image_url: uploadUrl,
    });

    console.log(res);

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
        setIsExceededSize(false);
        const image_url = await encodeBase64ImageFile(selectedImage as File);
        setRegisterUser({ ...registerUser, image_url });
      } else {
        setIsExceededSize(true);
      }
    },
    [registerUser],
  );

  return (
    <Container>
      <Title>Please register your profile picture</Title>
      {isExceededSize && <NotificationMessage>용량 초과함</NotificationMessage>}
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

const NotificationMessage = styled.span`
  font-size: 3rem;
  color: red;
`;
