import { ReactElement } from 'react';
import CommonLayout from '../components/layout/CommonLayout';

export default function Find() {
  return <p style={{ color: 'white' }}>This is find page.</p>;
}

Find.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Find">{page}</CommonLayout>;
};
