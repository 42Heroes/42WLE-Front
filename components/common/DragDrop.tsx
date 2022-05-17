import Image from 'next/image';
import { useRef } from 'react';
import styled from 'styled-components';
import useDragDrop from '../../hooks/useDragDrop';
import CameraIcon from '../../public/assets/icons/camera.svg';
import UserIcon from '../../public/assets/icons/user.svg';

interface Props {
  image: string | null;
  onChangeImage: (
    e: React.ChangeEvent<HTMLInputElement> | any,
  ) => Promise<void>;
}

export default function DragDrop({ image, onChangeImage }: Props) {
  const dragRef = useRef<HTMLLabelElement | null>(null);
  const dragContainerRef = useRef<HTMLDivElement | null>(null);

  const isDragging = useDragDrop(onChangeImage, dragRef);

  return (
    <Container ref={dragContainerRef}>
      <PreviewWrapper>
        <ImageWrapper isEmpty={!image}>
          {image ? (
            <Image
              className="profile-image"
              alt="profile image preview"
              src={image}
              width={280}
              height={280}
            />
          ) : (
            <UserIcon />
          )}
          <DragDropArea
            htmlFor="profile-image_upload"
            ref={dragRef}
            isDragging={isDragging}
          >
            {image
              ? isDragging && 'Drag your file here'
              : isDragging
              ? 'Drop your file here'
              : 'Drag your file here'}
          </DragDropArea>
        </ImageWrapper>
        <CameraWrapper as="label" htmlFor="profile-image_upload">
          <CameraIcon />
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

const ImageWrapper = styled.div<{ isEmpty: boolean }>`
  border: 8px solid;
  border-radius: 1rem;
  border-color: ${({ theme, isEmpty }) =>
    isEmpty ? theme.fontColor.contentColor : theme.bgColor};
  svg {
    width: 28rem;
    fill: ${({ theme }) => theme.fontColor.contentColor};
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
  font-size: 2rem;
  transition: background-color 0.2s ease-in-out;
  color: ${({ theme }) => theme.fontColor.titleColor};
  background-color: ${({ isDragging }) =>
    isDragging ? 'rgba(0,0,0,0.3)' : 'inherit'};
`;
