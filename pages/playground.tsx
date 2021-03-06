import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import LocalVideo from '../components/call/LocalVideo';
import RemoteVideo from '../components/call/RemoteVideo';
import { useCreateMediaStream } from '../hooks/useCreateStream';
import socket from '../library/socket';
import { SocketEvents } from '../library/socket.events.enum';
import { callState } from '../recoil/atoms/callAtom';

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
  const { userMediaStream: localStream } = useCreateMediaStream(localVideoRef);
  const [users, setUsers] = useRecoilState(callState);
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection | undefined }>(
    {},
  );

  const TEMP_ROOM_NO = 'gamguma';

  const [someOneCall, setSomeOneCall] = useState('');

  useEffect(() => {
    // 새로운 사용자가 접속하면 새로운 Peer Connection 생성
    const createPeerConnection = (receiverSocketId: string) => {
      if (pcsRef.current[receiverSocketId]) {
        return pcsRef.current[receiverSocketId];
      }
      if (!localStream) return;

      const handleIceCandidate = (event: RTCPeerConnectionIceEvent) => {
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

      const handleIceChange = (event: Event) => {
        console.log('iceCandidate 변경 이벤트가 발생했습니다: ', event);
      };

      const peerConnection = new RTCPeerConnection(RTCConfig);

      peerConnection.onicecandidate = handleIceCandidate;
      peerConnection.ontrack = handleAddTrack;
      peerConnection.oniceconnectionstatechange = handleIceChange;
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });
      pcsRef.current[receiverSocketId] = peerConnection;
      return peerConnection;
    };

    // offer 생성
    const createOffer = (
      peerConnection: RTCPeerConnection,
    ): Promise<RTCSessionDescriptionInit | void> => {
      return new Promise((resolve, reject) => {
        peerConnection
          .createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          })
          .then((offer) => {
            peerConnection.setLocalDescription(
              new RTCSessionDescription(offer),
            );
            resolve(offer);
          })
          .catch((error) => reject(error));
      });
    };

    // 상대방이 오퍼를 받을 때
    socket.off(SocketEvents.Offer).on(SocketEvents.Offer, async (data) => {
      const { offerSenderId, offer } = data;

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
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });

    // 누군가가 전화를 걸었을 때
    socket
      .off(SocketEvents.RequestCall)
      .on(SocketEvents.RequestCall, (data) => {
        const { roomNo } = data;
        setSomeOneCall(roomNo);
      });

    // 상대방이 통화를 수락했을 때
    socket
      .off(SocketEvents.AcceptCall)
      .on(
        SocketEvents.AcceptCall,
        async (users: { socketId: string; id: string }[]) => {
          const promises = users.map(async (user) => {
            if (pcsRef.current[user.socketId]) return;

            const peerConnection = createPeerConnection(user.socketId);

            if (peerConnection) {
              const offer = await createOffer(peerConnection);
              socket.emit(SocketEvents.Offer, {
                offer,
                offerReceiverId: user.socketId,
              });
            }
          });
          await Promise.all(promises);
        },
      );

    // 상대방이 통화를 거절했을 때
    socket.off(SocketEvents.RejectCall).on(SocketEvents.RejectCall, (data) => {
      console.log('상대방이 조금 바쁜가봐요 ㅠㅠ');
    });

    // 상대방이 통화를 종료했을 때
    socket.off(SocketEvents.ExitUser).on(SocketEvents.ExitUser, (data) => {
      const { socketId } = data;
      pcsRef.current[socketId]?.close();
      pcsRef.current[socketId] = undefined;
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
      socket.off(SocketEvents.RejectCall);
      socket.off(SocketEvents.ExitUser);
    };
  }, [localStream]);

  const handleJoinClick = () => {};

  const requestCall = (roomInfo: string) => {
    socket.emit(SocketEvents.RequestCall, TEMP_ROOM_NO, (data: string) => {
      // 전화를 걸구 서버가 판단해서 유저가 있으면 통화 진행 중 표시, 아니면 전화를 걸지 않음
      console.log(data);
    });
  };

  const handleEndCall = () => {
    // TODO: 통화 중인 경우에만 이벤트 보내게끔 예외처리
    Object.keys(pcsRef.current).forEach((key) => {
      pcsRef.current[key]?.close();
    });
    pcsRef.current = {};
    setUsers([]);
    socket.emit(SocketEvents.EndCall, TEMP_ROOM_NO);
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: someOneCall ? 'white' : '#ff9999',
          padding: '0.5rem 2rem',
        }}
        onClick={requestCall}
      >
        Call
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
      <LocalVideo
        videoRef={localVideoRef}
        playsInline
        autoPlay
        stream={localStream}
        handleEndCall={handleEndCall}
      />
      {users.map((user) => (
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
