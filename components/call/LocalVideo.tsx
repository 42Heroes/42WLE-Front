import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import usePeerConnection from '../../hooks/usePeerConnection';
import VideoNav from './VideoNav';

interface Props {
  muted?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  stream: MediaStream | null;
}

export default function LocalVideo({ autoPlay, playsInline, stream }: Props) {
  const { handleEndCall } = usePeerConnection();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [localCallStatus, setLocalCallStatus] = useState({
    mute: false,
    camera: true,
  });

  const toggleMute = () => {
    stream?.getAudioTracks().forEach((track) => {
      track.enabled = !localCallStatus.mute;
    });
    setLocalCallStatus({ ...localCallStatus, mute: !localCallStatus.mute });
  };

  const toggleCamera = () => {
    stream?.getVideoTracks().forEach((track) => {
      track.enabled = !localCallStatus.camera;
    });
    setLocalCallStatus({ ...localCallStatus, camera: !localCallStatus.camera });
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [videoRef, stream]);

  return (
    <Container>
      <Video
        ref={videoRef}
        autoPlay={autoPlay}
        playsInline={playsInline}
        muted
      />
      <VideoNav
        isMuted={localCallStatus.mute}
        isCameraOn={localCallStatus.camera}
        onToggleMute={toggleMute}
        onToggleCamera={toggleCamera}
        onEndCall={handleEndCall}
      />
    </Container>
  );
}

const Container = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const Video = styled.video`
  width: 100%;
  border-radius: 1rem;
  transform: rotateY(180deg);
`;
