import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Chat, Message } from '../../interfaces/chat.interface';
import socket from '../../library/socket';
import { SocketEvents } from '../../library/socket.events.enum';
import {
  activeChatRoomIdState,
  chatState,
  unreadMessageState,
} from '../../recoil/atoms';

interface Props {
  children: React.ReactNode;
}

export default function SocketProvider({ children }: Props) {
  const setChatData = useSetRecoilState(chatState);
  const setUnreadMessage = useSetRecoilState(unreadMessageState);
  const activeChatRoomId = useRecoilValue(activeChatRoomIdState);

  useEffect(() => {
    socket.on(SocketEvents.Error, (err) => {
      console.log(err);
    });

    socket
      .off(SocketEvents.ReqCreateRoom)
      .on(
        SocketEvents.ReqCreateRoom,
        (res: { status: string; chatRoom: Chat }) => {
          if (res.status === 'ok') {
            setChatData((prev) => {
              if (prev.some((chatRoom) => chatRoom._id === res.chatRoom._id)) {
                console.log(prev);
                return prev;
              }

              return [...prev, res.chatRoom];
            });
          }
        },
      );

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

        setUnreadMessage((prevMessages) => {
          const unreadMessages = [...prevMessages, message];
          return unreadMessages;
        });
      });
  }, []);
  return <>{children}</>;
}
