import { ReactElement, useState } from 'react';
import LanguageDropdown from '../../components/common/LanguageDropdown';
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
  const handleSelectedLanguage = (
    clickedLanguage: LanguageInfo,
    index: number,
  ) => {
    setSelectedLanguages([...selectedLanguages, clickedLanguage]);
    setLanguages(languages.filter((_, ind: number) => ind !== index));
  };
  console.log(selectedLanguages);
  console.log(languages);

  return (
    <div>
      <LanguageDropdown
        onClickLanguage={handleSelectedLanguage}
        languages={languages}
      />
    </div>
  );
}

Learn.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
