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
import useMessage from './useMessage';

const usePeerConnection = () => {
  const {
    userMediaStream: localStream,
    createMediaStream,
    stopMediaStream,
  } = useCreateMediaStream();
  const { handleSendMessage } = useMessage();
  const [roomNo, setRoomNo] = useRecoilState(roomNoState);
  const [isCalling, setIsCalling] = useRecoilState(isCallingState);
  const setCallList = useSetRecoilState(callListState);
  const [connectedUsers, setConnectedUsers] = useRecoilState(
    connectedUserListState,
  );
  const [pcs, setPcs] = useRecoilState(peerConnectionState);

  const handleRequestCall = async (roomId: string) => {
    if (isCalling && roomNo !== '') {
      await handleEndCall();
    }
    if (!localStream?.active) {
      await createMediaStream();
    }
    const payload = {
      chatRoom_id: roomId,
      type: 'text',
      content: 'VideoCall 👨🏻‍💻',
    };

    await handleSendMessage(payload);

    socket.emit(SocketEvents.RequestCall, roomId, (data: string) => {
      setRoomNo(roomId);
      setIsCalling(true);
      console.log(data);
    });
  };

  const handleAcceptCall = async (roomId: string) => {
    if (isCalling && roomNo !== '') {
      await handleEndCall();
    }

    if (!localStream?.active) {
      await createMediaStream();
    }

    const payload = {
      chatRoom_id: roomId,
      type: 'text',
      content: 'Accept Video Call 👨🏻‍💻',
    };

    await handleSendMessage(payload);

    socket.emit(SocketEvents.AcceptCall, roomId, (data: string) => {
      console.log(roomId);
      setRoomNo(roomId);
      setIsCalling(true);
      setCallList((prevCallList) => {
        return prevCallList.filter((call) => call.roomNo !== roomId);
      });
    });
  };

  const handleRejectCall = async (roomInfo: string) => {
    const payload = {
      chatRoom_id: roomInfo,
      type: 'text',
      content: 'RejectCall 😭',
    };

    await handleSendMessage(payload);

    socket.emit(SocketEvents.RejectCall, roomInfo, (data: string) => {
      console.log(data);
    });

    setCallList((prevList) => {
      return prevList.filter((room) => room.roomNo !== roomInfo);
    });
  };

  const handleEndCall = (): Promise<void> => {
    return new Promise((resolve) => {
      socket.emit(
        SocketEvents.EndCall,
        async ({ status, roomId }: { status: string; roomId: string }) => {
          const payload = {
            chatRoom_id: roomId,
            type: 'text',
            content: '',
          };
          stopMediaStream();
          Object.keys(pcs).forEach((key) => {
            pcs[key]?.close();
          });
          setPcs({});
          setConnectedUsers([]);
          setRoomNo('');
          setIsCalling(false);
          if (status === 'cancel') {
            payload.content = 'CancelCall 😭';
          } else if (status === 'end') {
            payload.content = 'EndCall 😭';
          }

          await handleSendMessage(payload);

          resolve();
        },
      );
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
