import Image from 'next/image';
import styled from 'styled-components';

interface Props {
  src: string;
  size: 'small' | 'medium' | 'large';
}

export default function ProfileImage({ src, size }: Props) {
  const imageSize =
    size === 'small' ? 40 : size === 'medium' ? 50 : size === 'large' ? 60 : 0;
  return (
    <Container>
      <Image
        className="profile-image"
        alt="pic"
        src={src}
        width={imageSize}
        height={imageSize}
        objectFit="cover"
      />
    </Container>
  );
}

const Container = styled.div`
  .profile-image {
    border-radius: 50%;
  }
`;
