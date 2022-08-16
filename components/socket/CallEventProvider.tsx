import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useCreateMediaStream } from '../../hooks/useCreateStream';
import socket from '../../library/socket';
import { SocketEvents } from '../../library/socket.events.enum';
import {
  callListState,
  connectedUserListState,
  isCallingState,
  peerConnectionState,
  roomNoState,
} from '../../recoil/atoms';

interface Props {
  children: React.ReactElement;
}

export default function CallEventProvider({ children }: Props) {
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
      {
        urls: process.env.NEXT_PUBLIC_TURN_SERVER_URL as string,
        username: process.env.NEXT_PUBLIC_TURN_SERVER_USERNAME as string,
        credential: process.env.NEXT_PUBLIC_TURN_SERVER_PASSWORD as string,
      },
    ],
  };
  const { userMediaStream: localStream, stopMediaStream } =
    useCreateMediaStream();

  const setRoomNo = useSetRecoilState(roomNoState);
  const setIsCalling = useSetRecoilState(isCallingState);
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

    const handleOffer = async (data: {
      offerSenderId: string;
      offer: RTCSessionDescriptionInit;
    }) => {
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
    };

    const handleAnswer = async (data: {
      answerSenderId: string;
      answer: RTCSessionDescriptionInit;
    }) => {
      const { answerSenderId, answer } = data;

      const peerConnection = pcs[answerSenderId];

      if (peerConnection) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      }
    };

    const handleIceCandidate = (data: {
      candidateSenderId: string;
      candidate: RTCIceCandidateInit;
    }) => {
      const { candidateSenderId, candidate } = data;

      const peerConnection = pcs[candidateSenderId];
      if (peerConnection) {
        peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      }
    };

    const handleRequestCall = (data: { roomNo: string; users: any }) => {
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
    };

    const handleAcceptCall = async (
      users: { socketId: string; id: string }[],
    ) => {
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
    };

    const handleRejectCall = (data: { roomNo: string }) => {
      console.log('상대방이 조금 바쁜가봐요 ㅠㅠ');
    };

    const handleCancelCall = (data: { roomNo: string }) => {
      console.log('상대방이 전화를 취소했습니다', data);
      setCallList((prevCallList) =>
        prevCallList.filter((call) => call.roomNo !== data.roomNo),
      );
    };

    const handleExitUser = (data: { roomNo: string; socketId: string }) => {
      const { socketId } = data;
      pcs[socketId]?.close();
      setPcs((prevPcs) => ({ ...prevPcs, [socketId]: null }));
      if (connectedUsers.length === 0) {
        stopMediaStream();
        setRoomNo('');
        setIsCalling(false);
        setPcs({});
      }
      setConnectedUsers((prevUsers) =>
        prevUsers.filter((user) => user.socketId !== socketId),
      );
    };

    // 상대방이 오퍼를 받을 때
    socket.off(SocketEvents.Offer).on(SocketEvents.Offer, handleOffer);

    // 상대방의 answer 를 받을 때
    socket.off(SocketEvents.Answer).on(SocketEvents.Answer, handleAnswer);

    // 상대방이 ice candidate 를 받을 때
    socket
      .off(SocketEvents.IceCandidate)
      .on(SocketEvents.IceCandidate, handleIceCandidate);

    // 누군가가 전화를 걸었을 때
    socket
      .off(SocketEvents.RequestCall)
      .on(SocketEvents.RequestCall, handleRequestCall);

    // 상대방이 통화를 수락했을 때
    socket
      .off(SocketEvents.AcceptCall)
      .on(SocketEvents.AcceptCall, handleAcceptCall);

    // 상대방이 통화를 거절했을 때
    socket
      .off(SocketEvents.RejectCall)
      .on(SocketEvents.RejectCall, handleRejectCall);

    socket
      .off(SocketEvents.CancelCall)
      .on(SocketEvents.CancelCall, handleCancelCall);

    // 상대방이 통화를 종료했을 때
    socket.off(SocketEvents.ExitUser).on(SocketEvents.ExitUser, handleExitUser);

    return () => {
      socket.off(SocketEvents.Offer, handleOffer);
      socket.off(SocketEvents.Answer, handleAnswer);
      socket.off(SocketEvents.IceCandidate, handleIceCandidate);
      socket.off(SocketEvents.AcceptCall, handleAcceptCall);
      socket.off(SocketEvents.RequestCall, handleRequestCall);
      socket.off(SocketEvents.RejectCall, handleRejectCall);
      socket.off(SocketEvents.ExitUser, handleExitUser);
    };
  }, [localStream, pcs]);

  return <>{children}</>;
}
