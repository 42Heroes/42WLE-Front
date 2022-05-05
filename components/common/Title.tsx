import styled from 'styled-components';

interface Props {
  question: string;
}

export default function Title({ question }: Props) {
  return <Titlebox>{question}</Titlebox>;
}

const Titlebox = styled.h1`
  color: ${({ theme }) => theme.fontColor.titleColor};
  font-size: 4.8rem;
  margin-bottom: 3rem;
  line-height: 8rem;
  padding-right: 2rem;
  text-align: center;
`;
