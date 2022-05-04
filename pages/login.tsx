import styled from 'styled-components';
import Button from '../components/common/Button';
import { ReactElement } from 'react';
import LoginLayout from '../components/layout/LoginLayout';
import FTLogo from '../components/common/FTLogo';
export default function Login() {
  return (
    <Container>
      <MainMsg>
        <h1>Log in</h1>
        <h2>with just one click!</h2>
      </MainMsg>
      <StyledButton type="button" size="large" color="blue">
        <FTLogo width="40" />
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
  height: 100%;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const MainMsg = styled.div`
  h1 {
    font-size: ${({ theme }) => theme.font.headingBold};
  }
  h2 {
    font-size: ${({ theme }) => theme.font.subTitleBold};
  }
  color: ${({ theme }) => theme.fontColor.titleColor};
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  line-height: 9rem;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.pointColor};
  border-radius: 1rem;
  margin-top: 5rem;
  svg {
    margin-right: 1rem;
  }
  padding: 3rem;
`;
