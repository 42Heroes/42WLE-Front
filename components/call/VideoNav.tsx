import { useState } from 'react';
import styled from 'styled-components';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import CallEndIcon from '@mui/icons-material/CallEnd';

interface Props {
  onToggleMute: () => void;
  onToggleCamera: () => void;
  onEndCall?: () => void;
  isAudioOn: boolean;
  isCameraOn: boolean;
}

export default function VideoNav({
  onToggleMute,
  onToggleCamera,
  onEndCall,
  isCameraOn,
  isAudioOn,
}: Props) {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <Container onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <PlayerBar isHovering={isHovering}>
        <Button isActive={isCameraOn} onClick={onToggleCamera}>
          {isCameraOn ? <VideocamIcon /> : <VideocamOffIcon />}
        </Button>
        <Button isActive={isAudioOn} onClick={onToggleMute}>
          {isAudioOn ? <MicIcon /> : <MicOffIcon />}
        </Button>
        {onEndCall && (
          <EndButton onClick={onEndCall}>
            <CallEndIcon />
          </EndButton>
        )}
      </PlayerBar>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  overflow: hidden;
`;

const PlayerBar = styled.div<{ isHovering: boolean }>`
  position: absolute;
  opacity: ${({ isHovering }) => (isHovering ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  height: 5rem;
`;

const Button = styled.button<{ isActive?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isActive }) => (isActive ? '#727272' : '#ffffffDB')};
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  color: white;
  margin: 1rem;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  svg {
    fill: ${({ isActive }) => (isActive ? '#ffffff' : '#121212')};
  }
  &:hover {
    background-color: ${({ isActive }) => (isActive ? '#bababaef' : '#727272')};
  }
`;

const EndButton = styled(Button)`
  background-color: #eb4d4b;
  svg {
    fill: #ffffff;
  }
  &:hover {
    background-color: #fa2d2a;
  }
`;
