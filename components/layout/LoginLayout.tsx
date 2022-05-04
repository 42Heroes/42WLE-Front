import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: Props) {
  return <Contaniner>{children}</Contaniner>;
}

const Contaniner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 100vh;
`;
