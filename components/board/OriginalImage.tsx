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
        layout="fill"
        objectFit="contain"
        className="autoImage"
        src={imgUrl}
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 50rem;
  height: 50rem;
`;
