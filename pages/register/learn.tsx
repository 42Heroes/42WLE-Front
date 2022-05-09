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
    <div>
      <LanguageDropdown
        onClickLanguage={handleSelectedLanguage}
        languages={languages}
        selectedLanguages={selectedLanguages}
      />
      <LanguageSelected
        onClickDelete={handleDeletedLanguage}
        selectedLanguages={selectedLanguages}
      />
    </div>
  );
}

Learn.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
