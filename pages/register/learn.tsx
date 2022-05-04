import { ReactElement } from 'react';
import LanguageDropdown from '../../components/common/LanguageDropdown';
import LoginLayout from '../../components/layout/LoginLayout';

export default function Learn() {
  return (
    <div>
      <LanguageDropdown />
    </div>
  );
}

Learn.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
