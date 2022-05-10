import { ReactElement } from 'react';
import CommonLayout from '../components/layout/CommonLayout';

export default function Test() {
  return <div></div>;
}

Test.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};
