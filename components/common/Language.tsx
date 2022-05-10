import Image from 'next/image';
import styled from 'styled-components';

interface Props {
  language: {
    language: string;
    flag: string;
  };
}

export default function Language({ language }: Props) {
  return (
    <Container>
      <Image
        alt={language.language}
        src={language.flag}
        width={23}
        height={14}
      />
      <LanguageName>{language.language.toUpperCase()}</LanguageName>
    </Container>
  );
}
const LanguageName = styled.span`
  margin-left: 0.7rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.grayColor};
`;

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem 0.8rem;
  border: 0.1rem solid ${({ theme }) => theme.grayColor};
  border-radius: 0.5rem;
  min-width: 9rem;
`;
