import styled from 'styled-components';
import Title from '../../components/common/Title';
import LanguageDropdown from '../../components/common/LanguageDropdown';
import LanguageSelected from '../../components/common/LanguageSelected';
import Button from '../../components/common/Button';
import LoginLayout from '../../components/layout/LoginLayout';
import languagesBase from '../../library/languages';
import { ReactElement, useState, useEffect } from 'react';

interface LanguageInfo {
  language: string;
  flag: string;
}
export default function Native() {
  const [languages, setLanguages] = useState(languagesBase as LanguageInfo[]);
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageInfo[]>(
    [],
  );

  useEffect(() => {
    const persistSelected = localStorage.getItem('nativeLanguages');
    console.log(persistSelected);
    if (persistSelected) {
      setSelectedLanguages(JSON.parse(persistSelected));
    }
  }, []);
  const handleSelectedLanguage = (clickedLanguage: LanguageInfo) => {
    const addSelectedLanguages = [...selectedLanguages, clickedLanguage];
    setSelectedLanguages(addSelectedLanguages);
    localStorage.setItem(
      'nativeLanguages',
      JSON.stringify(addSelectedLanguages),
    );
  };

  const handleDeletedLanguage = (clickedLanguage: LanguageInfo) => {
    const filteredLanguages = selectedLanguages.filter(
      (item) => item !== clickedLanguage,
    );
    setSelectedLanguages(filteredLanguages);
    localStorage.setItem('nativeLanguages', JSON.stringify(filteredLanguages));
  };
  return (
    <Container>
      <Title>Which languages can you speak fluently?</Title>
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

Native.getLayout = function getLayout(page: ReactElement) {
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
