import styled from 'styled-components';
import Title from '../../components/common/Title';
import LanguageDropdown from '../../components/common/LanguageDropdown';
import LanguageSelected from '../../components/common/LanguageSelected';
import Button from '../../components/common/Button';
import { ReactElement, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import languagesBase from '../../library/languages';
import { LanguageInfo } from '../../interfaces/user.interface';
import { useRegister } from '../../hooks/useRegister';
import RegisterLayout from '../../components/layout/RegisterLayout';

export default function Native() {
  const router = useRouter();
  const [languages, setLanguages] = useState(languagesBase);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [registerUser, setRegisterUser] = useRegister();

  const { n_language: selectedNativeLanguages } = registerUser;
  const { l_language: selectedLearnLanguages } = registerUser;

  const handleLanguageClick = (clickedLanguage: LanguageInfo) => {
    const newSelectedLanguages = [...selectedNativeLanguages, clickedLanguage];
    setRegisterUser({ ...registerUser, n_language: newSelectedLanguages });
    setIsDropdownOpened(false);
  };

  const handleSelectedLanguageClick = (clickedLanguage: LanguageInfo) => {
    const filteredLanguages = selectedNativeLanguages.filter(
      (language) => language !== clickedLanguage,
    );
    setRegisterUser({ ...registerUser, n_language: filteredLanguages });
  };

  const handleClickNextButton = () => {
    if (!selectedNativeLanguages.length) {
      return;
    }
    router.push('/register/nickname');
  };

  useEffect(() => {
    const filteredLanguages = languages
      .map((item) =>
        selectedLearnLanguages.some(
          (selectedLanguage) => selectedLanguage.name === item.name,
        )
          ? null
          : item,
      )
      .filter((language) => language !== null);
    setLanguages(filteredLanguages as LanguageInfo[]);
    if (selectedNativeLanguages.length) {
      const filteredSelectedNativeLanguages = selectedNativeLanguages
        .map((item) =>
          selectedLearnLanguages.some(
            (selectedLanguage) => selectedLanguage.name === item.name,
          )
            ? null
            : item,
        )
        .filter((language) => language !== null);
      setRegisterUser({
        ...registerUser,
        n_language: filteredSelectedNativeLanguages as LanguageInfo[],
      });
    }
  }, [selectedLearnLanguages]);

  return (
    <Container>
      <Title>Which languages can you speak fluently?</Title>
      <LanguageContainer>
        {selectedNativeLanguages.length < 3 && (
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
          selectedLanguages={selectedNativeLanguages}
          isOpened={isDropdownOpened}
        />
        <LanguageSelected
          onClickLanguage={handleSelectedLanguageClick}
          selectedLanguages={selectedNativeLanguages}
        />
      </LanguageContainer>
      <StyledNextButton
        type="button"
        size="medium"
        color="blue"
        onClick={handleClickNextButton}
        disabled={!selectedNativeLanguages.length}
      >
        NEXT
      </StyledNextButton>
    </Container>
  );
}

Native.getLayout = function getLayout(page: ReactElement) {
  return <RegisterLayout>{page}</RegisterLayout>;
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
