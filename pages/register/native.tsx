import { ReactElement } from 'react';
import SelectLanguage from '../../components/common/SelectLanguage';
import LoginLayout from '../../components/layout/LoginLayout';

export default function Learn() {
  return <SelectLanguage question="Which languages can you speak fluently?" />;
}

Learn.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
