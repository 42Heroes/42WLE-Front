import { ReactElement } from 'react';
import styled from 'styled-components';
import Title from '../../components/common/Title';
import LanguageDropdown from '../../components/common/LanguageDropdown';
import Button from '../../components/common/Button';
import LoginLayout from '../../components/layout/LoginLayout';

export default function Native() {
  return (
    <Container>
      <Title>Which languages can you speak fluently?</Title>
      <LanguageDropdown />
      <StyledButton type="button" size="medium" color="blue">
        NEXT
      </StyledButton>
    </Container>
  );
}

Native.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.pointColor};
  border-radius: 1rem;
  padding: 0 10rem 0 10rem;
`;
