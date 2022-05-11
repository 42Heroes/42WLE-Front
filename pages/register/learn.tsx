import styled from 'styled-components';
import Title from '../../components/common/Title';
import Button from '../../components/common/Button';
import { ReactElement, useState, useEffect } from 'react';
import LanguageDropdown from '../../components/common/LanguageDropdown';
import LanguageSelected from '../../components/common/LanguageSelected';
import LoginLayout from '../../components/layout/LoginLayout';
import languagesBase from '../../library/languages';
import { useRouter } from 'next/router';

interface LanguageInfo {
  language: string;
  flag: string;
}

export default function Learn() {
  const router = useRouter();

  const [languages] = useState(languagesBase as LanguageInfo[]);
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageInfo[]>(
    [],
  );

  const handleLanguageClick = (clickedLanguage: LanguageInfo) => {
    const addSelectedLanguages = [...selectedLanguages, clickedLanguage];
    setSelectedLanguages(addSelectedLanguages);
    localStorage.setItem(
      'sign_up-learn-languages',
      JSON.stringify(addSelectedLanguages),
    );
  };

  const handleSelectedLanguageClick = (clickedLanguage: LanguageInfo) => {
    const filteredLanguages = selectedLanguages.filter(
      (item) => item !== clickedLanguage,
    );
    setSelectedLanguages(filteredLanguages);
    localStorage.setItem(
      'sign_up-learn-languages',
      JSON.stringify(filteredLanguages),
    );
  };

  const handleNextButtonClick = () => {
    if (selectedLanguages.length < 1) {
      return;
    }
    router.push('/register/native');
  };

  useEffect(() => {
    const persistSelectedLearnLanguages = JSON.parse(
      localStorage.getItem('sign_up-learn-languages') ?? 'null',
    );
    if (persistSelectedLearnLanguages && persistSelectedLearnLanguages.length) {
      setSelectedLanguages(persistSelectedLearnLanguages);
    }
  }, []);

  return (
    <Container>
      <Title>Which languages do you want to practice?</Title>
      <LanguageDropdown
        onClickLanguage={handleLanguageClick}
        languages={languages}
        selectedLanguages={selectedLanguages}
      />
      <LanguageSelected
        onClickLanguage={handleSelectedLanguageClick}
        selectedLanguages={selectedLanguages}
      />
      <StyledButton
        type="button"
        size="medium"
        color="blue"
        onClick={handleNextButtonClick}
        disabled={!selectedLanguages.length}
      >
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
