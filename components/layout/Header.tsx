import styled from 'styled-components';

export default function Header() {
  return <Container></Container>;
}

const Container = styled.header`
  margin-left: -1px;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
`;
