import { useEffect } from 'react';
import socket from '../library/socket';
import { SocketEvents } from '../library/socket.events.enum';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  callListState,
  connectedUserListState,
  isCallingState,
  peerConnectionState,
  roomNoState,
} from '../recoil/atoms';
import { useCreateMediaStream } from './useCreateStream';

const usePeerConnection = () => {
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

  const {
    userMediaStream: localStream,
    createMediaStream,
    stopMediaStream,
  } = useCreateMediaStream();
  const [roomNo, setRoomNo] = useRecoilState(roomNoState);
  const [isCalling, setIsCalling] = useRecoilState(isCallingState);
  const setCallList = useSetRecoilState(callListState);
  const [connectedUsers, setConnectedUsers] = useRecoilState(
    connectedUserListState,
  );
  const [pcs, setPcs] = useRecoilState(peerConnectionState);

  useEffect(() => {
    const createPeerConnection = (receiverSocketId: string) => {
      if (pcs[receiverSocketId]) {
        return pcs[receiverSocketId];
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
        setConnectedUsers((prevUsers) => {
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

      setPcs((prevPcs) => ({
        ...prevPcs,
        [receiverSocketId]: peerConnection,
      }));

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
    socket
      .off(SocketEvents.Offer)
      .on(
        SocketEvents.Offer,
        async (data: {
          offerSenderId: string;
          offer: RTCSessionDescriptionInit;
        }) => {
          const { offerSenderId, offer } = data;

          const peerConnection = createPeerConnection(offerSenderId);

          if (peerConnection) {
            peerConnection.setRemoteDescription(
              new RTCSessionDescription(offer),
            );

            const answer = await peerConnection.createAnswer();

            await peerConnection.setLocalDescription(answer);

            socket.emit(SocketEvents.Answer, {
              answer,
              answerReceiverId: offerSenderId,
            });
          }
        },
      );

    // 상대방의 answer 를 받을 때
    socket
      .off(SocketEvents.Answer)
      .on(
        SocketEvents.Answer,
        async (data: {
          answerSenderId: string;
          answer: RTCSessionDescriptionInit;
        }) => {
          const { answerSenderId, answer } = data;

          const peerConnection = pcs[answerSenderId];

          if (peerConnection) {
            peerConnection.setRemoteDescription(
              new RTCSessionDescription(answer),
            );
          }
        },
      );

    // 상대방이 ice candidate 를 받을 때
    socket
      .off(SocketEvents.IceCandidate)
      .on(
        SocketEvents.IceCandidate,
        (data: {
          candidateSenderId: string;
          candidate: RTCIceCandidateInit;
        }) => {
          const { candidateSenderId, candidate } = data;

          const peerConnection = pcs[candidateSenderId];
          if (peerConnection) {
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
          }
        },
      );

    // 누군가가 전화를 걸었을 때
    socket
      .off(SocketEvents.RequestCall)
      .on(SocketEvents.RequestCall, (data) => {
        const { roomNo, users } = data;
        console.log('누군가가 전화를 걸었습니다: ', data);

        setCallList((prevCallList) => {
          const filteredCallList = prevCallList.filter(
            (call) => call.roomNo !== roomNo,
          );
          return [
            ...filteredCallList,
            {
              roomNo,
              users,
            },
          ];
        });
      });

    // 상대방이 통화를 수락했을 때
    socket
      .off(SocketEvents.AcceptCall)
      .on(
        SocketEvents.AcceptCall,
        async (users: { socketId: string; id: string }[]) => {
          const promises = users.map(async (user) => {
            if (pcs[user.socketId]) return;

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
      alert('상대방이 조금 바쁜가봐요 ㅠㅠ');
      // setCallInfo({ roomNo: '', isCalling: false });
    });

    socket.off(SocketEvents.CancelCall).on(SocketEvents.CancelCall, (data) => {
      console.log('상대방이 전화를 취소했습니다', data);
      setCallList((prevCallList) =>
        prevCallList.filter((call) => call.roomNo !== data.roomNo),
      );
    });

    // 상대방이 통화를 종료했을 때
    socket.off(SocketEvents.ExitUser).on(SocketEvents.ExitUser, (data) => {
      const { socketId } = data;
      pcs[socketId]?.close();
      setPcs((prevPcs) => ({ ...prevPcs, [socketId]: undefined }));
      setConnectedUsers((prevUsers) =>
        prevUsers.filter((user) => user.socketId !== socketId),
      );
    });

    // return () => {
    //   socket.off(SocketEvents.Offer);
    //   socket.off(SocketEvents.Answer);
    //   socket.off(SocketEvents.IceCandidate);
    //   socket.off(SocketEvents.AcceptCall);
    //   socket.off(SocketEvents.RequestCall);
    //   socket.off(SocketEvents.RejectCall);
    //   socket.off(SocketEvents.ExitUser);
    // };
  }, [localStream, pcs]);

  const handleRequestCall = async (roomInfo: string) => {
    if (!localStream?.active) {
      await createMediaStream();
    }
    if (isCalling && roomNo !== '') {
      alert('이미 전화가 걸려있습니다');
      return;
    }

    // 전화를 걸구 서버가 판단해서 유저가 있으면 통화 진행 중 표시, 아니면 전화를 걸지 않음
    socket.emit(SocketEvents.RequestCall, roomInfo, (data: string) => {
      setRoomNo(roomInfo);
      setIsCalling(true);
      console.log(data);
    });
  };

  const handleAcceptCall = async (roomInfo: string) => {
    if (isCalling && roomInfo !== roomNo) {
      const acceptChange = prompt(
        '상대방이 전화를 걸었습니다. 수락하시겠습니까?',
      );
      console.log(acceptChange);
      if (acceptChange) {
        console.log('수락합니다');
        handleEndCall();
      } else {
        console.log('거절합니다');
        handleRejectCall(roomInfo);
        return;
      }
    }
    if (!localStream?.active) {
      await createMediaStream();
    }
    setRoomNo(roomInfo);
    setIsCalling(true);
    socket.emit(SocketEvents.AcceptCall, roomInfo, (data: string) => {
      setCallList((prevCallList) => {
        const filteredCallList = prevCallList.filter(
          (call) => call.roomNo !== roomInfo,
        );
        return filteredCallList;
      });
    });
  };

  const handleRejectCall = (roomInfo: string) => {
    socket.emit(SocketEvents.RejectCall, roomInfo, (data: string) => {
      console.log(data);
    });
    setRoomNo('');
    setIsCalling(false);
    setCallList((prevList) => {
      return prevList.filter((room) => room.roomNo !== roomInfo);
    });
  };

  const handleEndCall = () => {
    // TODO: 통화 중인 경우에만 이벤트 보내게끔 예외처리
    socket.emit(SocketEvents.EndCall, () => {
      stopMediaStream();
      Object.keys(pcs).forEach((key) => {
        pcs[key]?.close();
      });
      setPcs({});
      setConnectedUsers([]);
      setRoomNo('');
      setIsCalling(false);
    });
  };

  return {
    connectedUsers,
    handleRequestCall,
    handleAcceptCall,
    handleRejectCall,
    handleEndCall,
  };
};

export default usePeerConnection;
