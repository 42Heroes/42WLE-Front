import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import LocalVideo from '../components/call/LocalVideo';
import RemoteVideo from '../components/call/RemoteVideo';
import { useCreateMediaStream } from '../hooks/useCreateStream';
import usePeerConnection from '../hooks/usePeerConnection';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import socket from '../library/socket';

export default function PlayGround() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const {
    userMediaStream: localStream,
    stopMediaStream,
    createMediaStream,
  } = useCreateMediaStream(videoRef);
  const {
    connectedUsers,
    callInfo,
    handleAcceptCall,
    handleEndCall,
    handleRequestCall,
    handleRejectCall,
  } = usePeerConnection({ localStream });

  useEffect(() => {
    socket.emit('join', 'gamguma');
  }, []);

  return (
    <div>
      <LocalVideo
        videoRef={videoRef}
        playsInline
        autoPlay
        stream={localStream}
        handleEndCall={handleEndCall}
      />
      {connectedUsers.map((user) => (
        <RemoteVideo
          key={user.socketId}
          stream={user.stream}
          autoPlay
          playsInline
        />
      ))}
    </div>
  );
}
