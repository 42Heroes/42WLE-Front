import styled from 'styled-components';
import Title from '../../components/common/Title';
import Button from '../../components/common/Button';
import { ReactElement, useState } from 'react';
import LanguageDropdown from '../../components/common/LanguageDropdown';
import LanguageSelected from '../../components/common/LanguageSelected';
import languagesBase from '../../library/languages';
import { useRouter } from 'next/router';
import { LanguageInfo } from '../../interfaces/user.interface';
import { useRegister } from '../../hooks/useRegister';
import RegisterLayout from '../../components/layout/RegisterLayout';

export default function Learn() {
  const router = useRouter();
  const [languages] = useState(languagesBase);
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [registerUser, setRegisterUser] = useRegister();

  const { l_language: selectedLanguages } = registerUser;

  const handleLanguageClick = (clickedLanguage: LanguageInfo) => {
    const newSelectedLanguages = [...selectedLanguages, clickedLanguage];
    setRegisterUser({ ...registerUser, l_language: newSelectedLanguages });
    setIsDropdownOpened(false);
  };

  const handleSelectedLanguageClick = (clickedLanguage: LanguageInfo) => {
    const filteredLanguages = selectedLanguages.filter(
      (language) => language !== clickedLanguage,
    );
    setRegisterUser({ ...registerUser, l_language: filteredLanguages });
  };

  const handleNextButtonClick = () => {
    if (selectedLanguages.length < 1) {
      return;
    }
    router.push('/register/native');
  };

  return (
    <Container>
      <Title>Which languages do you want to practice?</Title>
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
        onClick={handleNextButtonClick}
        disabled={!selectedLanguages.length}
      >
        NEXT
      </StyledNextButton>
    </Container>
  );
}

Learn.getLayout = function getLayout(page: ReactElement) {
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
