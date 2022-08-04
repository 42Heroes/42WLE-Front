import styled from 'styled-components';
import Button from '../components/common/Button';
import { ReactElement } from 'react';
import LoginLayout from '../components/layout/LoginLayout';
import FTLogo from '../public/assets/icons/42Logo.svg';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const handleLoginButtonClick = () => {
    router.push(
      'https://api.intra.42.fr/oauth/authorize?client_id=71352ab465a87dd80775022d80e3e9af2f5a221de5a4eade94aaca475ea595e1&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fauth%2Fsocial&response_type=code',
    );
  };

  return (
    <Container>
      <MainMsg>
        <h1>Log in</h1>
        <h2>with just one click!</h2>
      </MainMsg>
      <StyledButton
        type="button"
        size="large"
        color="blue"
        onClick={handleLoginButtonClick}
      >
        <FTLogo />
        Sign In with 42 Intra
      </StyledButton>
    </Container>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainMsg = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 9rem;
  line-height: 9rem;
  text-align: center;
  color: ${({ theme }) => theme.fontColor.titleColor};
  h1 {
    font-size: ${({ theme }) => theme.font.headingBold};
  }
  h2 {
    font-size: ${({ theme }) => theme.font.subTitleBold};
  }
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.pointColor};
  border-radius: 1rem;
  padding: 3rem;
  svg {
    margin-right: 1rem;
    width: 4rem;
    fill: white;
  }
`;
