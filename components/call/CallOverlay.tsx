import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { callInfoState } from '../../recoil/selectors';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import RemoteVideo from './RemoteVideo';
import { activeChatRoomIdState, isOverlayOpenState } from '../../recoil/atoms';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export default function CallOverlay() {
  const { isCalling, users, roomNo } = useRecoilValue(callInfoState);
  const setActiveChatRoomId = useSetRecoilState(activeChatRoomIdState);
  const [isOverlayOpen, setIsOverlayOpen] = useRecoilState(isOverlayOpenState);
  const [isDragging, setIsDragging] = useState(false);
  const [overlayPosition, setOverlayPosition] = useState({
    x: 0,
    y: 0,
  });

  const router = useRouter();

  const ref = useRef(null);

  const handleClickCallTitle = () => {
    setActiveChatRoomId(roomNo);
    setIsOverlayOpen(true);
    router.push('/chat');
  };

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setOverlayPosition({ x: data.x, y: data.y });
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    setOverlayPosition({
      x: document.body.clientWidth - 300,
      y: document.body.clientHeight - 300,
    });
  }, []);

  return isCalling && (isOverlayOpen || router.pathname !== '/chat') ? (
    <Draggable
      nodeRef={ref}
      bounds="parent"
      position={overlayPosition}
      onDrag={handleDrag}
      onStart={handleDragStart}
      onStop={handleDragStop}
    >
      <Container ref={ref} isDragging={isDragging}>
        <VideoTitle onClick={handleClickCallTitle}>
          {/*TODO: 채팅방 입장 인원들 이름으로 변경*/}
          <span>
            <ArrowBackRoundedIcon />
          </span>
        </VideoTitle>
        {users.map((user) => (
          <RemoteVideo
            key={user.socketId}
            stream={user.stream}
            autoPlay
            playsInline
          />
        ))}
      </Container>
    </Draggable>
  ) : null;
}

const Container = styled.div<{ isDragging: boolean }>`
  position: absolute;
  max-width: 300px;
  transition: filter 0.2s ease-in-out;

  &:hover {
    filter: ${({ isDragging }) =>
      isDragging ? 'brightness(0.7)' : 'brightness(0.8)'};
    cursor: ${({ isDragging }) => (isDragging ? 'grabbing' : 'grab')};
  }
`;

const VideoTitle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  padding: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
