import { ReactElement, useState } from 'react';
import LanguageDropdown from '../../components/common/LanguageDropdown';
import LoginLayout from '../../components/layout/LoginLayout';

interface LanguageInfo {
  language: string;
  flag: string;
}

export default function Learn() {
  const [selectedLanguages, setSelectedLanguages] = useState<LanguageInfo[]>(
    [],
  );
  const handleSelectedLanguage = (language: LanguageInfo) => {
    setSelectedLanguages([...selectedLanguages, language]);
  };
  console.log(selectedLanguages);
  return (
    <div>
      <LanguageDropdown onClickLanguage={handleSelectedLanguage} />
    </div>
  );
}

Learn.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
