import Image from 'next/image';
import { useCallback, useRef } from 'react';
import styled from 'styled-components';
import useDragDrop from '../../hooks/useDragDrop';
import { encodeBase64ImageFile } from '../../library/ImageConverter';
import CameraIcon from '../../public/icons/camera.svg';

interface Props {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function DragDrop({ image, setImage }: Props) {
  const dragRef = useRef<HTMLLabelElement | null>(null);
  const dragContainerRef = useRef<HTMLDivElement | null>(null);

  const onChangeImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement> | any) => {
      let selectedImage;
      if (e.type === 'change') {
        selectedImage = e.target.files[0];
      } else if (e.type === 'drop') {
        selectedImage = e.dataTransfer.files[0];
      }
      if (selectedImage && selectedImage.size <= 2000000) {
        const data = await encodeBase64ImageFile(selectedImage as File);
        localStorage.setItem('sign_up-photo', data);
        setImage(data);
      }
    },
    [],
  );

  const isDragging = useDragDrop(onChangeImage, dragRef);

  return (
    <Container ref={dragContainerRef}>
      <PreviewWrapper>
        <Image
          className="profile-image"
          alt="profile image preview"
          // TODO: default Image 설정해주기
          src={image ?? '/languages/korean.svg'}
          width={280}
          height={280}
        />
        <DragDropArea
          htmlFor="profile-image_upload"
          ref={dragRef}
          isDragging={isDragging}
        >
          {isDragging
            ? '사진을 올려주세용'
            : '사진을 드래그 드롭하여 추가해주세요'}
        </DragDropArea>
        <CameraWrapper as="label" htmlFor="profile-image_upload">
          <CameraIcon />
          {/* <Image alt="camera" src="/camera.svg" width={50} height={50} /> */}
        </CameraWrapper>
      </PreviewWrapper>
      <InputContainer>
        <input
          id="profile-image_upload"
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={onChangeImage}
        />
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 11rem;
  margin-bottom: 8rem;
`;

const InputContainer = styled.div`
  display: flex;
  width: 28rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
  input {
    display: none;
  }
`;

const PreviewWrapper = styled.div`
  display: block;
  position: relative;
  .profile-image {
    border-radius: 1rem;
    object-fit: cover;
  }
`;

const CameraWrapper = styled.div`
  display: flex;
  cursor: pointer;
  position: absolute;
  right: -1rem;
  bottom: -1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.grayColor};
  border: 2px solid ${({ theme }) => theme.fontColor.contentColor};
  svg {
    width: 5rem;
  }
`;

const DragDropArea = styled.label<{ isDragging: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
  color: ${({ theme }) => theme.fontColor.titleColor};
  background-color: ${({ isDragging }) =>
    isDragging ? 'rgba(0,0,0,0.3)' : 'inherit'};
`;
