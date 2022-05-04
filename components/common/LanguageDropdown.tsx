import styled from 'styled-components';
import languages from '../../library/languages';

export default function LanguageDropdown() {
  return (
    <Container>
      <Input type="text" placeholder="Enter your language" />
      <ul>
        {languages.map((language) => (
          <List key={language.language}>{language.language}</List>
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
`;
