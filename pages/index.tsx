import styled from 'styled-components';
import Button from '../components/common/Button';
import Image from 'next/image';
import Link from 'next/link';
import media from '../styles/media';
import FTLogo from '../public/assets/icons/42Logo.svg';
import { ReactElement } from 'react';
import { useRecoilState } from 'recoil';
import { loginState } from '../recoil/atoms';
import { logoutUser } from '../library/api';
import { useQueryClient } from 'react-query';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const queryClient = useQueryClient();

  // Todo: localStorage에 언어 정보 있으면 find 페이지로 이동
  const startPage = isLoggedIn ? '/find' : 'learn';

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    logoutUser();
    queryClient.removeQueries('me');
  };

  return (
    <Container>
      <TopContainer>
        {isLoggedIn ? (
          <LogOutButton type="button" size="medium" onClick={handleLogoutClick}>
            Logout
          </LogOutButton>
        ) : (
          // Todo: 로그인 url env로 빼기
          <a href={process.env.NEXT_PUBLIC_42_LOGIN_URL}>
            <LogInButton type="button" size="medium">
              Login
            </LogInButton>
          </a>
        )}
      </TopContainer>
      <ContentContainer>
        <LeftSide>
          <TextContainer>
            <h1>
              Master your language <br /> with
              <FTLogo />
            </h1>
            <p>
              Communicate with 42 cadets worldwide. <br />
              Develop your language skills <br />
              and be a global software developer.
            </p>
          </TextContainer>
          <Link href={startPage} passHref>
            <StyledButton type="button" size="large" color="blue">
              START LEARNING
            </StyledButton>
          </Link>
        </LeftSide>
        <ImageWrapper>
          <Image
            alt="World Map"
            src="/assets/worldMap.svg"
            width={3000}
            height={2000}
            objectFit="cover"
          />
        </ImageWrapper>
      </ContentContainer>
    </Container>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  padding: 3rem 3rem 0 0;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogInButton = styled(Button)`
  color: ${({ theme }) => theme.fontColor.contentColor};
`;

const LogOutButton = styled(Button)`
  color: ${({ theme }) => theme.fontColor.contentColor};
`;

const LeftSide = styled.div`
  ${media.medium} {
    margin-left: 15rem;
  }
  margin: 0 auto;
  max-width: 60rem;
  width: 100%;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  margin-bottom: 6rem;
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
  svg {
    width: 6rem;
    fill: white;
    margin-left: 1rem;
  }
`;

const ImageWrapper = styled.div`
  display: none;
  width: 100%;
  ${media.large} {
    display: block;
  }
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.pointColor};
  border-radius: 1rem;
`;

const StyledLogo = styled(FTLogo)`
  margin-left: 1rem;
`;
