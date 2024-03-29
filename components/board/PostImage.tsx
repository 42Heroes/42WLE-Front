import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { ImageModal } from '../common/Modal';

interface Props {
  imgUrl: string;
  key: number;
}

export default function PostImage({ imgUrl }: Props) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const toggleImageModal = (
    e: React.MouseEvent<HTMLDivElement | SVGSVGElement>,
  ) => {
    if (e.currentTarget !== e.target) {
      return;
    }
    setIsImageModalOpen(!isImageModalOpen);
  };

  return (
    <>
      <Container onClick={() => setIsImageModalOpen(true)}>
        <Image src={imgUrl} width="200" height="200" alt="image" />
      </Container>
      {isImageModalOpen && (
        <ImageModal imgUrl={imgUrl} toggleModal={toggleImageModal} />
      )}
    </>
  );
}

const Container = styled.div`
  margin-right: 0.8rem;
  cursor: pointer;
  img {
    object-fit: cover;
    border-radius: 0.8rem;
  }
`;
