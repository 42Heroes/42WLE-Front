interface Props {
  children: React.ReactElement;
}

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ children }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(children, document.querySelector('#modal') as Element)
    : null;
};

export default Portal;
