import { ReactElement } from 'react';
import CommonLayout from '../components/layout/CommonLayout';
import Nav from '../components/layout/Nav';

export default function Test() {
  return <div></div>;
}

Test.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout>{page}</CommonLayout>;
};
