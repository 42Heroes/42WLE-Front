import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import CommonLayout from '../components/layout/CommonLayout';
import { userState } from '../recoil/atoms';

export default function Find() {
  const userData = useRecoilValue(userState);

  return <p style={{ color: 'white' }}>This is find page.</p>;
}

Find.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Find">{page}</CommonLayout>;
};
