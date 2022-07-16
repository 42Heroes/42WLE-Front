import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useCreateMediaStream } from '../hooks/useCreateStream';
import socket from '../library/socket';
import { SocketEvents } from '../library/socket.events.enum';
import { callState, pcsState } from '../recoil/atoms/callAtom';

const Video = ({ stream, ...rest }: { stream: MediaStream }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return <video {...rest} ref={videoRef} playsInline autoPlay muted />;
};

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
  const localStream = useCreateMediaStream(localVideoRef);
  const [users, setUsers] = useRecoilState(callState);
  const [pcs, setPcs] = useRecoilState(pcsState);
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
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
    // 새로운 사용자가 접속하면 새로운 Peer Connection 생성
    const createPeerConnection = (receiverSocketId: string) => {
      if (pcs[receiverSocketId]) {
        console.log(pcs[receiverSocketId]);
        return pcs[receiverSocketId];
      }
      if (!localStream) return;

      const handleIceCandidate = (event: RTCPeerConnectionIceEvent) => {
        // console.log('icecandidate 이벤트가 발생했습니다: ', event.candidate);
        if (event.candidate) {
          socket.emit(SocketEvents.IceCandidate, {
            candidateReceiverId: receiverSocketId,
            candidate: event.candidate,
          });
        }
      };

      const handleAddTrack = (event: RTCTrackEvent) => {
        console.log('트랙이 추가됐습니다', event.streams[0], receiverSocketId);
        setUsers((prevUsers) => {
          const filteredUsers = prevUsers.filter(
            (user) => user.socketId !== receiverSocketId,
          );
          return [
            ...filteredUsers,
            { socketId: receiverSocketId, stream: event.streams[0] },
          ];
        });
      };

      const peerConnection = new RTCPeerConnection(RTCConfig);
      peerConnection.onicecandidate = handleIceCandidate;
      peerConnection.ontrack = handleAddTrack;
      peerConnection.oniceconnectionstatechange = (e) => {
        console.log('iceCandidate 변경 이벤트가 발생했습니다: ', e);
      };
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
      pcsRef.current[receiverSocketId] = peerConnection;
      setPcs((prevPcs) => ({ ...prevPcs, [receiverSocketId]: peerConnection }));
      return peerConnection;
    };

    // offer 생성
    const createOffer = (
      receiverSocketId: string,
    ): Promise<RTCSessionDescriptionInit | void> => {
      return new Promise((resolve, reject) => {
        const peerConnection = pcsRef.current[receiverSocketId];
        if (peerConnection) {
          peerConnection
            .createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true,
            })
            .then((offer) => {
              peerConnection.setLocalDescription(
                new RTCSessionDescription(offer),
              );
              console.log('create Offer', offer);
              resolve(offer);
            });
        } else {
          reject('peerConnection is null');
          console.log('peerConnection is null');
        }
      });
    };

    // 상대방이 오퍼를 받을 때
    socket.off(SocketEvents.Offer).on(SocketEvents.Offer, async (data) => {
      const { offerSenderId, offer } = data;
      console.log('Offer 받음', data.offerSenderId);

      const peerConnection = createPeerConnection(offerSenderId);

      if (peerConnection) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit(SocketEvents.Answer, {
          answer,
          answerReceiverId: offerSenderId,
        });
      }
    });

    // 상대방의 answer 를 받을 때
    socket
      .off(SocketEvents.Answer)
      .on(SocketEvents.Answer, async (data: any) => {
        const { answerSenderId, answer } = data;
        console.log('Answer 받음', answerSenderId);
        const peerConnection = pcsRef.current[answerSenderId];
        if (peerConnection) {
          peerConnection.setRemoteDescription(
            new RTCSessionDescription(answer),
          );
        }
      });

    // 상대방이 ice candidate 를 받을 때
    socket
      .off(SocketEvents.IceCandidate)
      .on(SocketEvents.IceCandidate, (data: any) => {
        const { candidateSenderId, candidate } = data;
        const peerConnection = pcsRef.current[candidateSenderId];
        if (peerConnection) {
          console.log('IceCandidate 받았다', data);
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });

    // 누군가가 전화를 걸었을 때
    socket
      .off(SocketEvents.RequestCall)
      .on(SocketEvents.RequestCall, (data) => {
        console.log('RequestCall', data);
        const { roomNo } = data;
        setSomeOneCall(roomNo);
      });

    // 상대방이 통화를 수락했을 때
    socket
      .off(SocketEvents.AcceptCall)
      .on(
        SocketEvents.AcceptCall,
        async (users: { socketId: string; id: string }[]) => {
          console.log('AcceptCall', users);
          const promises = users.map(async (user) => {
            createPeerConnection(user.socketId);
            const offer = await createOffer(user.socketId);
            // TODO : 이벤트 처리
            console.log('offer', offer);
            console.log('sent Offer');
            socket.emit(SocketEvents.Offer, {
              offer,
              offerReceiverId: user.socketId,
            });
          });
          await Promise.all(promises);
        },
      );

    // 상대방이 통화를 거절했을 때
    socket
      .off(SocketEvents.RejectCall)
      .on(SocketEvents.RejectCall, (data) => {});

    socket.off(SocketEvents.ExitUser).on(SocketEvents.ExitUser, (data) => {
      console.log('ExitUser', data);
      const { socketId } = data;
      pcs[socketId] && pcs[socketId].close();
      setPcs((prevPcs) => {
        const copy = { ...prevPcs };
        delete copy[socketId];
        return copy;
      });
      setUsers((prevUsers) => {
        const filteredUsers = prevUsers.filter(
          (user) => user.socketId !== socketId,
        );
        return filteredUsers;
      });
    });

    socket.emit('join', TEMP_ROOM_NO);
    return () => {
      socket.off(SocketEvents.Offer);
      socket.off(SocketEvents.Answer);
      socket.off(SocketEvents.IceCandidate);
      socket.off(SocketEvents.AcceptCall);
      socket.off(SocketEvents.RequestCall);
    };
  }, [localStream]);

  // useEffect(() => {
  //   const newPeerConnection = new RTCPeerConnection(RTCConfig);
  //   const handleIceCandidate = (event: RTCPeerConnectionIceEvent) => {
  //     console.log('sent iceCandidate');
  //     if (event.candidate) {
  //       console.log('candidate: ', event.candidate);
  //       socket.emit(SocketEvents.IceCandidate, {
  //         ice: event.candidate,
  //         roomNo: TEMP_ROOM_NO,
  //       });
  //     }
  //   };

  //   const handleAddTrack = (event: RTCTrackEvent) => {
  //     console.log(event.streams);
  //     if (remoteVideoRef.current) {
  //       remoteVideoRef.current.srcObject = event.streams[0];
  //       console.log(remoteVideoRef.current.srcObject);
  //     }
  //   };

  //   const makeConnection = async () => {
  //     if (!localStream) return;
  //     newPeerConnection.onicecandidate = handleIceCandidate;
  //     newPeerConnection.ontrack = handleAddTrack;
  //     newPeerConnection.oniceconnectionstatechange = (event) => {
  //       console.log('ice connection state change: ', event);
  //     };
  //     localStream
  //       .getTracks()
  //       .forEach((track) => newPeerConnection.addTrack(track, localStream));
  //   };

  //   const createOffer = async () => {
  //     console.log('create Offer');
  //     const offer = await newPeerConnection.createOffer({
  //       offerToReceiveAudio: true,
  //       offerToReceiveVideo: true,
  //     });
  //     await newPeerConnection.setLocalDescription(
  //       new RTCSessionDescription(offer),
  //     );
  //     console.log('sent Offer');
  //     socket.emit(SocketEvents.Offer, { offer, roomNo: TEMP_ROOM_NO });
  //   };

  //   const createAnswer = async (offer: RTCSessionDescription) => {
  //     console.log('received offer');
  //     await newPeerConnection.setRemoteDescription(
  //       new RTCSessionDescription(offer),
  //     );
  //     const answer = await newPeerConnection.createAnswer();
  //     newPeerConnection.setLocalDescription(new RTCSessionDescription(answer));
  //     socket.emit(SocketEvents.Answer, { answer, roomNo: TEMP_ROOM_NO });
  //     console.log('sent answer');
  //   };

  //   //! Socket

  //   socket
  //     .off(SocketEvents.RequestCall)
  //     .on(SocketEvents.RequestCall, (roomNo) => {
  //       console.log('누가 전화를 걸었음!', roomNo);
  //       setSomeOneCall(roomNo);
  //     });

  //   socket
  //     .off(SocketEvents.Offer)
  //     .on(SocketEvents.Offer, (offer: RTCSessionDescription) => {
  //       createAnswer(offer);
  //     });

  //   socket
  //     .off(SocketEvents.Answer)
  //     .on(SocketEvents.Answer, (answer: RTCSessionDescription) => {
  //       console.log('received the answer');
  //       newPeerConnection.setRemoteDescription(
  //         new RTCSessionDescription(answer),
  //       );
  //     });

  //   socket.off(SocketEvents.AcceptCall).on(SocketEvents.AcceptCall, () => {
  //     createOffer();
  //   });

  //   socket
  //     .off(SocketEvents.IceCandidate)
  //     .on(SocketEvents.IceCandidate, (ice: RTCIceCandidateInit) => {
  //       console.log('receive iceCandidate');
  //       newPeerConnection
  //         .addIceCandidate(new RTCIceCandidate(ice))
  //         .then(() => console.log('addIceCandidate success'));
  //     });
  //   setMyPeerConnection(newPeerConnection);
  //   makeConnection();
  // }, [localStream]);

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

  console.log(pcs.current);
  console.log(users);
  console.log(pcs);
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
      {users.map((user) => (
        <Video
          stream={user.stream}
          key={user.socketId}
          style={{ width: 240, height: 240, transform: 'rotateY(180deg)' }}
          autoPlay
          playsInline
        />

        // <span key={user.socketId}>{user.socketId}</span>
      ))}
    </div>
  );
}
