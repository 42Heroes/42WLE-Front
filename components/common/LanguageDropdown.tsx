import styled from 'styled-components';
import languages from '../../library/languages';
import Image from 'next/image';

export default function LanguageDropdown() {
  return (
    <Container>
      <Input type="text" placeholder="Enter your language" />
      <ul>
        {languages.map((language) => (
          <LanguageBox key={language.language}>
            <Image
              alt={language.language}
              src={language.flag}
              width={18}
              height={11}
            />
            <List>{language.language}</List>
          </LanguageBox>
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  width: 17rem;
  height: 14rem;
  background-color: ${({ theme }) => theme.grayColor + '20'};
`;

const Input = styled.input`
  background-color: inherit;
  color: ${({ theme }) => theme.fontColor.titleColor};
  border: 1px solid ${({ theme }) => theme.grayColor};
  font-size: 0.9rem;
`;

const List = styled.li`
  color: ${({ theme }) => theme.fontColor.titleColor};
  margin-left: 0.7rem;
  text-transform: uppercase;
`;

const LanguageBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;
