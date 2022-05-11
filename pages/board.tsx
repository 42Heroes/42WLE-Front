import { ReactElement } from 'react';
import CommonLayout from '../components/layout/CommonLayout';

export default function Board() {
  return <p style={{ color: 'white' }}>This is board page.</p>;
}

Board.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Board">{page}</CommonLayout>;
};
