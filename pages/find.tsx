import { ConstructionOutlined } from '@mui/icons-material';
import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import CommonLayout from '../components/layout/CommonLayout';
import { userState } from '../recoil/atoms';

export default function Find({ user }) {
  console.log(user);
  const userData = useRecoilValue(userState);

  return <p style={{ color: 'white' }}>This is find page.</p>;
}

Find.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Find">{page}</CommonLayout>;
};

export async function getServerSideProps(context) {
  const cookie = context.req ? context.req.headers.cookie : '';

  console.log(cookie);
  return { props: { user: 'hello' } };
}
