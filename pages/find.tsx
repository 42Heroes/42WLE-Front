import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import CommonLayout from '../components/layout/CommonLayout';
import { userState } from '../library/user_atom';

export default function Find() {
  const userData = useRecoilValue(userState);
  console.log('', userData);
  return <p style={{ color: 'white' }}>This is find page.</p>;
}

Find.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Find">{page}</CommonLayout>;
};
