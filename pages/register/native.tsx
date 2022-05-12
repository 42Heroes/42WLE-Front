import styled from 'styled-components';
import Title from '../../components/common/Title';
import LanguageDropdown from '../../components/common/LanguageDropdown';
import LanguageSelected from '../../components/common/LanguageSelected';
import Button from '../../components/common/Button';
import LoginLayout from '../../components/layout/LoginLayout';
import languagesBase from '../../library/languages';
import { ReactElement, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface LanguageInfo {
  language: string;
  flag: string;
}
export default function Native() {
  const router = useRouter();

  const [languages, setLanguages] = useState(languagesBase as LanguageInfo[]);
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageInfo[]>(
    [],
  );
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const handleLanguageClick = (clickedLanguage: LanguageInfo) => {
    const newSelectedLanguages = [...selectedLanguages, clickedLanguage];
    setSelectedLanguages(newSelectedLanguages);
    localStorage.setItem(
      'sign_up-native-languages',
      JSON.stringify(newSelectedLanguages),
    );
    setIsDropdownOpened(false);
  };

  const handleSelectedLanguageClick = (clickedLanguage: LanguageInfo) => {
    const filteredLanguages = selectedLanguages.filter(
      (language) => language !== clickedLanguage,
    );
    setSelectedLanguages(filteredLanguages);
    localStorage.setItem(
      'sign_up-native-languages',
      JSON.stringify(filteredLanguages),
    );
  };

  const handleClickNextButton = () => {
    if (!selectedLanguages.length) {
      return;
    }
    localStorage.setItem(
      'sign_up-native-languages',
      JSON.stringify(selectedLanguages),
    );
    router.push('/register/nickname');
  };

  useEffect(() => {
    const persistSelectedLearnLanguages: LanguageInfo[] = JSON.parse(
      localStorage.getItem('sign_up-learn-languages') ?? 'null',
    );
    const persistSelectedNativeLanguages: LanguageInfo[] = JSON.parse(
      localStorage.getItem('sign_up-native-languages') ?? 'null',
    );
    if (persistSelectedLearnLanguages && persistSelectedLearnLanguages.length) {
      const filteredLanguages = languages
        .map((item) =>
          persistSelectedLearnLanguages.some(
            (selectedLanguage) => selectedLanguage.language === item.language,
          )
            ? null
            : item,
        )
        .filter((element) => element !== null);
      setLanguages(filteredLanguages as LanguageInfo[]);
      if (
        persistSelectedNativeLanguages &&
        persistSelectedNativeLanguages.length
      ) {
        const filteredSelectedNativeLanguages = persistSelectedNativeLanguages
          .map((item) =>
            persistSelectedLearnLanguages.some(
              (selectedLanguage) => selectedLanguage.language === item.language,
            )
              ? null
              : item,
          )
          .filter((item) => item !== null);
        setSelectedLanguages(filteredSelectedNativeLanguages as LanguageInfo[]);
      }
    } else {
      router.replace('/register/learn');
    }
  }, []);

  return (
    <Container>
      <Title>Which languages can you speak fluently?</Title>
      <LanguageContainer>
        {selectedLanguages.length < 3 && (
          <StyledAddButton
            type="button"
            color="blue"
            size="medium"
            fullWidth
            onClick={() => setIsDropdownOpened(!isDropdownOpened)}
          >
            ADD LANGUAGE
          </StyledAddButton>
        )}
        <LanguageDropdown
          onClickLanguage={handleLanguageClick}
          languages={languages}
          selectedLanguages={selectedLanguages}
          isOpened={isDropdownOpened}
        />
        <LanguageSelected
          onClickLanguage={handleSelectedLanguageClick}
          selectedLanguages={selectedLanguages}
        />
      </LanguageContainer>
      <StyledNextButton
        type="button"
        size="medium"
        color="blue"
        onClick={handleClickNextButton}
        disabled={!selectedLanguages.length}
      >
        NEXT
      </StyledNextButton>
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

const StyledNextButton = styled(Button)`
  background-color: ${({ theme }) => theme.pointColor};
  border-radius: 1rem;
  padding: 0 10rem;
`;

const LanguageContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledAddButton = styled(Button)`
  height: 5rem;
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.grayColor};
  border: 0.1rem solid ${({ theme }) => theme.grayColor};
  background-color: inherit;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  width: 34rem;
`;
