import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: Props) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
