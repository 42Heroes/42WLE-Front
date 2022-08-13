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
  children: React.ReactElement;
}

export default function MessageEventProvider({ children }: Props) {
  const setChatData = useSetRecoilState(chatState);
  const setUnreadMessage = useSetRecoilState(unreadMessageState);
  const activeChatRoomId = useRecoilValue(activeChatRoomIdState);

  useEffect(() => {
    const requestRoomHandler = (res: { status: string; chatRoom: Chat }) => {
      if (res.status === 'ok') {
        setChatData((prev) => {
          const isExistDummyRoom = prev.find((room) => {
            return (
              room.users.every((target) =>
                res.chatRoom.users.some((user) => user._id === target._id),
              ) && room.isDummy
            );
          });
          if (isExistDummyRoom) {
            const filteredRoom = prev.filter(
              (room) => room._id !== isExistDummyRoom?._id,
            );
            return [res.chatRoom, ...filteredRoom];
          }
          if (prev.some((chatRoom) => chatRoom._id === res.chatRoom._id)) {
            return prev;
          }
          return [res.chatRoom, ...prev];
        });
      }
    };

    const newMessageHandler = (message: Message) => {
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
      if (activeChatRoomId !== message.chatRoom_id) {
        setUnreadMessage((prevMessages) => [...prevMessages, message]);
      }
    };

    socket
      .off(SocketEvents.ReqCreateRoom)
      .on(SocketEvents.ReqCreateRoom, requestRoomHandler);

    socket
      .off(SocketEvents.Message)
      .on(SocketEvents.Message, newMessageHandler);

    return () => {
      socket.off(SocketEvents.ReqCreateRoom, requestRoomHandler);
      socket.off(SocketEvents.Message, newMessageHandler);
    };
  }, [activeChatRoomId]);

  return <>{children}</>;
}
