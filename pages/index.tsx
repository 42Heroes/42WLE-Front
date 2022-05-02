import type { NextPage } from 'next';
import styled from 'styled-components';
import Button from '../components/common/Button';
import Image from 'next/image';
import media from '../styles/media';
import Logo from '../components/common/FTLogo';

const Home: NextPage = () => {
  return (
    <Container>
      <LeftSide>
        <TextContainer>
          <h1>
            Master your language <br /> with
            <StyledLogo width="60" />
          </h1>
          <p>
            Communicate with 42 cadets worldwide. <br />
            Develop your language skills <br />
            and be a global software developer.
          </p>
        </TextContainer>
        <ButtonContainer>
          <StyledButton type="button" size="large" color="blue">
            START LEARNING
          </StyledButton>
        </ButtonContainer>
      </LeftSide>
      <ImageWrapper>
        <Image
          alt="World Map"
          src="/worldMap.svg"
          width={3000}
          height={2000}
          objectFit="cover"
        />
      </ImageWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: space-between;
`;

const LeftSide = styled.div`
  margin-left: 15rem;
  min-width: 60rem;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  h1 {
    color: ${({ theme }) => theme.fontColor.titleColor};
    font-size: 7rem;
    margin-bottom: 3rem;
    line-height: 8rem;
    padding-right: 2rem;
  }
  p {
    color: ${({ theme }) => theme.fontColor.contentColor};
    font-size: 2rem;
    line-height: 2.5rem;
  }
`;

const ImageWrapper = styled.div`
  display: none;
  width: 100%;
  ${media.large} {
    display: block;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 6rem;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.pointColor};
  border-radius: 1rem;
`;

const StyledLogo = styled(Logo)`
  margin-left: 1rem;
`;

export default Home;
