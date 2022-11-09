import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import VideoNav from './VideoNav';

interface Props {
  stream?: MediaStream;
  muted?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
}

export default function RemoteVideo({ stream, autoPlay, playsInline }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [callStatus, setCallStatus] = useState({
    audio: true,
    camera: true,
  });

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const toggleMute = () => {
    stream?.getAudioTracks().forEach((track) => {
      track.enabled = !callStatus.audio;
    });
    setCallStatus({ ...callStatus, audio: !callStatus.audio });
  };

  const toggleCamera = () => {
    stream?.getVideoTracks().forEach((track) => {
      track.enabled = !callStatus.camera;
    });
    setCallStatus({ ...callStatus, camera: !callStatus.camera });
  };

  return (
    <Container>
      <Video ref={videoRef} autoPlay={autoPlay} playsInline={playsInline} />
      <VideoNav
        isAudioOn={callStatus.audio}
        isCameraOn={callStatus.camera}
        onToggleMute={toggleMute}
        onToggleCamera={toggleCamera}
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
