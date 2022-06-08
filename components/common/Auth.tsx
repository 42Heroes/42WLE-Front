import { useEffect } from 'react';
import { onSilentRefresh } from '../../library/api/login';

interface Props {
  children: React.ReactNode;
}

export default function Auth({ children }: Props) {
  useEffect(() => {
    onSilentRefresh();
  }, []);

  return <>{children}</>;
}
