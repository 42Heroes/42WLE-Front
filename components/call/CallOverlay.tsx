import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { callInfoState } from '../../recoil/selectors';
import ActiveVideoCall from './ActiveVideoCall';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';

export default function CallOverlay() {
  const { isCalling, users } = useRecoilValue(callInfoState);

  const [overlayPosition, setOverlayPosition] = useState({
    x: 0,
    y: 0,
  });

  const router = useRouter();

  const ref = useRef(null);

  useEffect(() => {
    setOverlayPosition({
      x: document.body.clientWidth - 300,
      y: document.body.clientHeight - 300,
    });
  }, []);

  return isCalling && router.pathname !== '/chat' ? (
    <Draggable
      nodeRef={ref}
      bounds="parent"
      position={overlayPosition}
      onStart={(e, data) => {
        console.log(e, data);
      }}
      onDrag={(e, data) => {
        setOverlayPosition({ x: data.x, y: data.y });
      }}
    >
      <Container ref={ref}>
        <ActiveVideoCall />
      </Container>
    </Draggable>
  ) : null;
}

const Container = styled.div`
  position: absolute;
  width: 30rem;
`;
