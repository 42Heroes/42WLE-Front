import { useRouter } from 'next/router';
import useMe from '../../hooks/useMe';
import LoadingIndicator from '../common/LoadingIndicator';

interface Props {
  children: React.ReactElement;
}

export default function ProtectedPage({ children }: Props) {
  const router = useRouter();
  const { data: me, isLoading } = useMe();

  if (typeof window !== 'undefined' && !isLoading && !me) {
    router.push('/login');
  }

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return <>{children}</>;
}
