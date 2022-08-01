import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Chat } from '../../interfaces/chat.interface';
import { unreadMessageState } from '../../recoil/atoms';
import ChatRoom from './ChatRoom';

interface Props {
  chatRooms: Chat[];
}

export default function ChatRoomList({ chatRooms }: Props) {
  const unreadMessages = useRecoilValue(unreadMessageState);
  const newMessageCount = (chatRoomId: string) => {
    return unreadMessages.filter(
      (message) => message.chatRoom_id === chatRoomId,
    ).length;
  };
  return (
    <Container>
      {chatRooms.map((chatRoom) => (
        <ChatRoom
          key={chatRoom._id}
          chat={chatRoom}
          newMessages={newMessageCount(chatRoom._id)}
        />
      ))}
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  flex-direction: column;
`;
