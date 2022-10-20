import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import useMe from '../../hooks/useMe';
import ProfileImage from '../common/ProfileImage';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '../common/Button';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { updatePost } from '../../library/api/board';
import { Post } from '../../interfaces/board.interface';
import Image from 'next/image';
import { encodeBase64ImageFile } from '../../library/ImageConverter';
import { AlertModal } from '../common/Modal';

interface Props {
  prevContent: Post;
  toggleModal: (
    event: React.MouseEvent<HTMLDivElement | SVGSVGElement>,
  ) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function EditPost({
  prevContent,
  toggleModal,
  setIsModalOpen,
}: Props) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['board']);
      setIsModalOpen(false);
    },
    onError: (error) => console.log(error),
  });

  const [content, setContent] = useState(prevContent.contents.text);
  const [isImageExist, setIsImageExist] = useState(
    prevContent.contents.img.length ? true : false,
  );
  const [images, setImages] = useState<string[]>(prevContent.contents.img);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleContentChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setContent(value);
  };

  const removeImage = (i: number) => {
    const newImages = [...images];
    newImages.splice(i, 1);
    setImages(newImages);
    if (newImages.length === 0) {
      setIsImageExist(false);
    }
  };

  const onChangeImage = async (
    e: React.ChangeEvent<HTMLInputElement> | any,
  ) => {
    if (images.length >= 3) {
      setIsAlertOpen(true);
      return;
    }

    const selectedImage = e.target.files[0];

    if (selectedImage && selectedImage.size <= 2000000) {
      setIsImageExist(true);
      const encodedImage = await encodeBase64ImageFile(selectedImage);
      setImages([...images, encodedImage]);
    }
  };

  const toggleAlert = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented) {
      return;
    }
    setIsAlertOpen(!isAlertOpen);
  };

  const { data: me, isError, isLoading } = useMe();
  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading</div>;

  const handleEditButtonClick = () => {
    const payload = {
      boardId: prevContent._id,
      contents: { text: content, img: images },
    };
    mutate(payload);
  };

  return (
    <Container isImageExist={isImageExist}>
      <TopLabel>
        <p>Edit</p>
        <ClearIcon fontSize="large" onClick={(e) => toggleModal(e)} />
      </TopLabel>
      <ProfileContainer>
        {me && <ProfileImage src={me.image_url} size="medium" />}
        <UserInfo>
          <h1>{me?.nickname}</h1>
          <p>
            {me?.campus} • {me?.country}
          </p>
        </UserInfo>
      </ProfileContainer>
      <ContentContainer>
        <textarea onChange={handleContentChange} value={content} />
      </ContentContainer>
      {isImageExist && (
        <ImageContainer>
          {images.map((image, i) => (
            <ImageWrapper key={i}>
              <Image src={image} width="100" height="100" alt="image" />
              <CancelIcon fontSize="large" onClick={() => removeImage(i)} />
            </ImageWrapper>
          ))}
        </ImageContainer>
      )}
      <ButtonContainer>
        <ImageIconWrapper as="label" htmlFor="image_upload">
          <ImageOutlinedIcon sx={{ fontSize: '3.5rem' }} />
        </ImageIconWrapper>
        <InputContainer>
          <input
            id="image_upload"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onChangeImage}
          />
        </InputContainer>
        <StyledPostButton
          type="button"
          size="medium"
          onClick={handleEditButtonClick}
        >
          Edit
        </StyledPostButton>
      </ButtonContainer>
      {isAlertOpen && (
        <AlertModal
          toggleModal={toggleAlert}
          mainText="You can upload 3 images maximum."
        />
      )}
    </Container>
  );
}

interface isImageExist {
  isImageExist: boolean;
}

const Container = styled.div<isImageExist>`
  width: 50rem;
  height: ${(props) => (props.isImageExist ? '54rem' : '40rem')};
  background-color: #242526;
  border-radius: 1rem;
  margin: 2rem;
`;

const TopLabel = styled.div`
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  p {
    color: ${({ theme }) => theme.fontColor.titleColor};
    font-size: 2.5rem;
    font-weight: 800;
  }
  svg {
    color: ${({ theme }) => theme.grayColor};
    cursor: pointer;
  }
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 8.8rem;
  display: flex;
  padding: 2rem;
`;

const UserInfo = styled.div`
  height: 100%;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    color: ${({ theme }) => theme.fontColor.titleColor};
    font-size: 1.7rem;
    margin-bottom: 0.7rem;
  }
  p {
    color: ${({ theme }) => theme.grayColor};
    font-size: 1.2rem;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 20rem;
  textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 2rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.fontColor.contentColor};
    background-color: transparent;
    resize: none;
  }
`;

const ImageContainer = styled.div`
  padding: 2rem;
  display: flex;
`;

const ImageWrapper = styled.div`
  width: 10rem;
  margin-right: 2rem;
  position: relative;
  img {
    object-fit: cover;
  }
  svg {
    border-radius: 50%;
    background-color: ${({ theme }) => theme.fontColor.titleColor};
    color: ${({ theme }) => theme.bgColor};
    position: absolute;
    top: -1rem;
    right: -1rem;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  svg {
    color: ${({ theme }) => theme.grayColor};
  }
`;

const ImageIconWrapper = styled.div`
  cursor: pointer;
`;

const InputContainer = styled.div`
  input {
    display: none;
  }
`;

const StyledPostButton = styled(Button)`
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 1.5rem;
`;
