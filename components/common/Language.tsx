import Image from 'next/image';
import styled from 'styled-components';
import { LanguageInfo } from '../../interfaces/user.interface';
import { getFlagImage } from '../../library/utils';

interface Props {
  language: LanguageInfo;
}

export default function Language({ language }: Props) {
  return (
    <Container>
      <Image
        alt={language.name}
        src={getFlagImage(language.name)}
        width={23}
        height={14}
      />
      <LanguageName>{language.name.toUpperCase()}</LanguageName>
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
