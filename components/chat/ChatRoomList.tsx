import styled from 'styled-components';
import { Chat } from '../../interfaces/chat.interface';
import ChatRoom from './ChatRoom';

interface Props {
  chatRooms: Chat[];
}

export default function ChatRoomList({ chatRooms }: Props) {
  return (
    <Container>
      {chatRooms.map((chatRoom) => (
        <ChatRoom key={chatRoom._id} chat={chatRoom} />
      ))}
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  flex-direction: column;
`;
