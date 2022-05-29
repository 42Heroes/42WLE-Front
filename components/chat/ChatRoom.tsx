import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Chat } from '../../interfaces/chat.interface';
import { activeChatRoomIdState, userState } from '../../recoil/atoms';
import ProfileImage from '../common/ProfileImage';

interface Props {
  chat: Chat;
}

export default function ChatRoom({ chat }: Props) {
  const me = useRecoilValue(userState);
  const [activeChatRoomId, setActiveChatRoomId] = useRecoilState(
    activeChatRoomIdState,
  );

  const otherUser = chat.users.find((user) => user._id !== me?._id);
  const lastMessage = chat.messages[chat.messages.length - 1].content;
  const isActiveRoom = chat._id === activeChatRoomId;

  const handleChatRoomClick = () => {
    setActiveChatRoomId(chat._id);
  };

  return (
    <Container isActive={isActiveRoom} onClick={handleChatRoomClick}>
      <ProfileImage src={otherUser?.image_url ?? ''} size="medium" />
      <MessageContainer>
        <h1>{otherUser?.nickname}</h1>
        <p>{lastMessage}</p>
      </MessageContainer>
    </Container>
  );
}

const Container = styled.li<{ isActive: boolean }>`
  width: 100%;
  height: 10rem;
  display: flex;
  padding: 2rem;
  background-color: ${(prop) => prop.isActive && '#242526'};
  cursor: pointer;
`;

const MessageContainer = styled.div`
  padding: 0.5rem 1.5rem;
  color: ${({ theme }) => theme.fontColor.titleColor};

  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1.2rem;
  }
`;
