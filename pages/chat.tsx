import { ReactElement } from 'react';
import CommonLayout from '../components/layout/CommonLayout';

export default function Chat() {
  return <p style={{ color: 'white' }}>This is chat page.</p>;
}

Chat.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Chat">{page}</CommonLayout>;
};
