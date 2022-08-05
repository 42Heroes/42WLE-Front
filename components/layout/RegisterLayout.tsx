import ProtectedPage from '../auth/ProtectedPage';
import LoginLayout from './LoginLayout';

interface Props {
  children: React.ReactElement;
}

export default function RegisterLayout({ children }: Props) {
  return (
    <LoginLayout>
      <ProtectedPage>{children}</ProtectedPage>
    </LoginLayout>
  );
}
