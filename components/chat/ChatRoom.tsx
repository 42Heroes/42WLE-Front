import styled from 'styled-components';

interface Props {}

export default function ChatRoom({ chat, user }: Props) {
  const chatRoomName = chat.users
    .filter((a) => a.nickname !== user.nickname)
    .map((i) => i.nickname)
    .join(', ');
  return (
    <Container>
      <span>{chatRoomName}</span>
    </Container>
  );
}

const Container = styled.li`
  color: white;
`;
