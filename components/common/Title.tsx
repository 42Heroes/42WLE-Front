import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

export default function Title({ children }: Props) {
  return <Titlebox>{children}</Titlebox>;
}

const Titlebox = styled.h1`
  color: ${({ theme }) => theme.fontColor.titleColor};
  font-size: 4.8rem;
  margin-bottom: 3rem;
  line-height: 8rem;
  padding-right: 2rem;
  text-align: center;
`;
