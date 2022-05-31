import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Message } from '../../interfaces/chat.interface';
import { chatState } from '../../recoil/atoms';
import socket from '../../library/socket';
import { SocketEvents } from '../../library/socket.events.enum';

interface Props {
  children: React.ReactNode;
}

export default function Auth({ children }: Props) {
  const setChatData = useSetRecoilState(chatState);

  useEffect(() => {
    socket.on(SocketEvents.Error, (err) => {
      console.log(err);
    });

    socket
      .off(SocketEvents.ReqCreateRoom)
      .on(SocketEvents.ReqCreateRoom, (res) => {
        console.log('reqCreateRoom', res);
        if (res.status === 'ok') {
          setChatData((prev) => {
            if (prev.some((chatRoom) => chatRoom._id === res.chatRoom._id)) {
              console.log(prev);
              return prev;
            }

            return [...prev, res.chatRoom];
          });
        }
      });

    socket
      .off(SocketEvents.Message)
      .on(SocketEvents.Message, (message: Message) => {
        console.log('messageEvent');
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
      });
  }, []);

  return <>{children}</>;
}
