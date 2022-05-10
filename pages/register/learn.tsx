import styled from 'styled-components';
import Title from '../../components/common/Title';
import Button from '../../components/common/Button';
import { ReactElement, useState } from 'react';
import LanguageDropdown from '../../components/common/LanguageDropdown';
import LanguageSelected from '../../components/common/LanguageSelected';
import LoginLayout from '../../components/layout/LoginLayout';
import languagesBase from '../../library/languages';

interface LanguageInfo {
  language: string;
  flag: string;
}

export default function Learn() {
  const [languages, setLanguages] = useState(languagesBase as LanguageInfo[]);
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageInfo[]>(
    [],
  );
  const handleSelectedLanguage = (clickedLanguage: LanguageInfo) => {
    setSelectedLanguages([...selectedLanguages, clickedLanguage]);
  };

  const handleDeletedLanguage = (clickedLanguage: LanguageInfo) => {
    setSelectedLanguages(
      selectedLanguages.filter((item) => item !== clickedLanguage),
    );
  };
  return (
    <Container>
      <Title>Which languages do you want to practice?</Title>
      <LanguageDropdown
        onClickLanguage={handleSelectedLanguage}
        languages={languages}
        selectedLanguages={selectedLanguages}
      />
      <LanguageSelected
        onClickDelete={handleDeletedLanguage}
        selectedLanguages={selectedLanguages}
      />
      <StyledButton type="button" size="medium" color="blue">
        NEXT
      </StyledButton>
    </Container>
  );
}

Learn.getLayout = function getLayout(page: ReactElement) {
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
