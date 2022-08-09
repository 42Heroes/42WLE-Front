import Image from 'next/image';
import styled from 'styled-components';

interface Props {
  toggleModal: (
    event: React.MouseEvent<HTMLDivElement | SVGSVGElement>,
  ) => void;
  imgUrl: string;
}

export default function OriginalImage({ toggleModal, imgUrl }: Props) {
  return (
    <Container className="unset-img">
      <Image
        alt="image"
        objectFit="contain"
        width="100%"
        height="100%"
        className="autoImage"
        src={imgUrl}
        // onClick={toggleModal}
      />
    </Container>
  );
}

const Container = styled.div``;
