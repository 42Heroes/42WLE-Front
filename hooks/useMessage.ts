import { useSetRecoilState } from 'recoil';
import { Chat, Message } from '../interfaces/chat.interface';
import socket from '../library/socket';
import { SocketEvents } from '../library/socket.events.enum';
import { chatState } from '../recoil/atoms';

interface MessagePayload {
  chatRoom_id: string;
  type: string;
  content: string;
}

const useMessage = () => {
  const setChatData = useSetRecoilState(chatState);

  const requestInitialData = () => {
    socket.emit(SocketEvents.ReqInitialData, (res: Chat[]) => {
      setChatData(res);
    });
  };

  const requestAuthorization = (payload: { token: string }): Promise<void> => {
    return new Promise((resolve, reject) => {
      socket.emit(
        SocketEvents.Authorization,
        payload,
        (res: { status: string; message: string }) => {
          if (res.status === 'ok') {
            resolve();
          } else {
            reject('Authorization failed');
          }
        },
      );
    });
  };

  const handleSendMessage = (payload: MessagePayload): Promise<void> => {
    return new Promise((resolve) => {
      socket.emit(SocketEvents.Message, payload, (message: Message) => {
        setChatData((prev) => {
          const filteredChatRoom = prev.filter(
            (chatRoom) => chatRoom._id !== message.chatRoom_id,
          );
          const target = prev.find(
            (chatRoom) => chatRoom._id === message.chatRoom_id,
          );
          if (target) {
            const targetRoomMessages = [...target.messages, message];
            return [
              { ...target, messages: targetRoomMessages },
              ...filteredChatRoom,
            ];
          }
          return prev;
        });
        resolve();
      });
    });
  };
  return { handleSendMessage, requestInitialData, requestAuthorization };
};

export default useMessage;
