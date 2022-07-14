import { useEffect, useRef, useState } from 'react';
import { useCreateMediaStream } from '../hooks/useCreateStream';
import socket from '../library/socket';
import { SocketEvents } from '../library/socket.events.enum';

/* FE
    1. 자신의 video, audio 를 받아온다. navigator.mediaDevices.getUserMedia ok
    2. RTCPeerConnection 을 만든 후 video, audio 를 보낼 트랙에 추가한다. ok
    3. requestCall
    4. acceptCall
    5. 통화를 수락한다면 통화를 요청한 사람이 상대방에게 rtc offer 를 보낸다.
      a. offer 를 생성 후 peerConnection 의 localDescription 으로 설정한다.
    6. offer 를 수신한 상대방은 answer 를 생성 후 통화 요청자에게 보낸다.
      a. offer 를 수신 후 peerConnection 의 remoteDescription 으로 설정
      b. answer 를 생성 후 peerConnection 의 localDescription 으로 설정
    7. answer 를 수신한 통화 요청자는 해당 answer 를 peerConnection 의 remoteDescription 으로 설정
*/

export default function PlayGround() {
  const RTCConfig = {
    iceServers: [
      {
        urls: [
          'stun:stun.l.google.com:19302',
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
          'stun:stun3.l.google.com:19302',
          'stun:stun4.l.google.com:19302',
        ],
      },
    ],
  };
  // Peer Connection, getMediaStream 을 통해 얻은 stream, 화면에 보여줄 video Ref 들
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const [myPeerConnection, setMyPeerConnection] = useState<RTCPeerConnection>();
  const localStream = useCreateMediaStream(localVideoRef);

  const [localCallStatus, setLocalCallStatus] = useState({
    mute: false,
    camera: true,
  });

  const TEMP_ROOM_NO = 'gamguma';

  const [someOneCall, setSomeOneCall] = useState('');

  const [localRemoteStatus, setRemoteCallStatus] = useState({
    mute: false,
    camera: true,
  });

  useEffect(() => {
    const newPeerConnection = new RTCPeerConnection(RTCConfig);
    const handleIceCandidate = (event: RTCPeerConnectionIceEvent) => {
      console.log('sent iceCandidate');
      if (event.candidate) {
        console.log('candidate: ', event.candidate);
        socket.emit(SocketEvents.IceCandidate, {
          ice: event.candidate,
          roomNo: TEMP_ROOM_NO,
        });
      }
    };

    const handleAddTrack = (event: RTCTrackEvent) => {
      console.log(event.streams);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
        console.log(remoteVideoRef.current.srcObject);
      }
    };

    const makeConnection = async () => {
      if (!localStream) return;
      newPeerConnection.onicecandidate = handleIceCandidate;
      newPeerConnection.ontrack = handleAddTrack;
      newPeerConnection.oniceconnectionstatechange = (event) => {
        console.log('ice connection state change: ', event);
      };
      localStream
        .getTracks()
        .forEach((track) => newPeerConnection.addTrack(track, localStream));
    };

    const createOffer = async () => {
      console.log('create Offer');
      const offer = await newPeerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await newPeerConnection.setLocalDescription(
        new RTCSessionDescription(offer),
      );
      console.log('sent Offer');
      socket.emit(SocketEvents.Offer, { offer, roomNo: TEMP_ROOM_NO });
    };

    const createAnswer = async (offer: RTCSessionDescription) => {
      console.log('received offer');
      await newPeerConnection.setRemoteDescription(
        new RTCSessionDescription(offer),
      );
      const answer = await newPeerConnection.createAnswer();
      newPeerConnection.setLocalDescription(new RTCSessionDescription(answer));
      socket.emit(SocketEvents.Answer, { answer, roomNo: TEMP_ROOM_NO });
      console.log('sent answer');
    };

    //! Socket

    socket
      .off(SocketEvents.RequestCall)
      .on(SocketEvents.RequestCall, (roomNo) => {
        console.log('누가 전화를 걸었음!', roomNo);
        setSomeOneCall(roomNo);
      });

    socket
      .off(SocketEvents.Offer)
      .on(SocketEvents.Offer, (offer: RTCSessionDescription) => {
        createAnswer(offer);
      });

    socket
      .off(SocketEvents.Answer)
      .on(SocketEvents.Answer, (answer: RTCSessionDescription) => {
        console.log('received the answer');
        newPeerConnection.setRemoteDescription(
          new RTCSessionDescription(answer),
        );
      });

    socket.off(SocketEvents.AcceptCall).on(SocketEvents.AcceptCall, () => {
      createOffer();
    });

    socket
      .off(SocketEvents.IceCandidate)
      .on(SocketEvents.IceCandidate, (ice: RTCIceCandidateInit) => {
        console.log('receive iceCandidate');
        newPeerConnection
          .addIceCandidate(new RTCIceCandidate(ice))
          .then(() => console.log('addIceCandidate success'));
      });
    setMyPeerConnection(newPeerConnection);
    makeConnection();
  }, [localStream]);

  const handleMuteClick = () => {
    localStream?.getAudioTracks().forEach((track) => {
      console.log(track);
      track.enabled = !localCallStatus.mute;
    });
    setLocalCallStatus({ ...localCallStatus, mute: !localCallStatus.mute });
  };

  const handleCameraClick = () => {
    localStream
      ?.getVideoTracks()
      .forEach((track) => (track.enabled = !localCallStatus.camera));
    setLocalCallStatus({ ...localCallStatus, camera: !localCallStatus.camera });
  };

  const handleJoinClick = () => {
    socket.emit('join', TEMP_ROOM_NO);
  };

  const requestCall = () => {
    socket.emit(SocketEvents.RequestCall, TEMP_ROOM_NO, (data: string) => {
      console.log(data);
    });
  };

  return (
    <div>
      <h1>{}</h1>
      <button
        style={{ backgroundColor: '#ff9999', padding: '0.5rem 2rem' }}
        onClick={handleMuteClick}
      >
        {localCallStatus.mute ? 'unMute' : 'mute'}
      </button>
      <button
        style={{ backgroundColor: '#ff9999', padding: '0.5rem 2rem' }}
        onClick={handleJoinClick}
      >
        join {TEMP_ROOM_NO}
      </button>
      <button
        style={{ backgroundColor: '#ff9999', padding: '0.5rem 2rem' }}
        onClick={requestCall}
      >
        requestCall
      </button>
      <button
        style={{
          backgroundColor: someOneCall ? 'white' : '#ff9999',
          padding: '0.5rem 2rem',
        }}
        onClick={() => {
          socket.emit(SocketEvents.AcceptCall, someOneCall, () =>
            setSomeOneCall(''),
          );
        }}
      >
        {someOneCall}
      </button>
      <button
        style={{ backgroundColor: '#ff9999', padding: '0.5rem 2rem' }}
        onClick={handleCameraClick}
      >
        {localCallStatus.camera ? 'turnOffCamera' : 'turnOnCamera'}
      </button>
      <video
        style={{ width: 240, height: 240, transform: 'rotateY(180deg)' }}
        ref={localVideoRef}
        autoPlay
        playsInline
      />
      <video
        className="remoteVideo"
        style={{ width: 240, height: 240, transform: 'rotateY(180deg)' }}
        ref={remoteVideoRef}
        autoPlay
        playsInline
        muted
      />
    </div>
  );
}
