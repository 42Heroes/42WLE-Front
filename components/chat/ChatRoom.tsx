import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import useMe from '../../hooks/useMe';
import { Chat } from '../../interfaces/chat.interface';
import { activeChatRoomIdState, unreadMessageState } from '../../recoil/atoms';
import ProfileImage from '../common/ProfileImage';

interface Props {
  chat: Chat;
  newMessages: number;
}

export default function ChatRoom({ chat, newMessages }: Props) {
  const { data: me } = useMe();
  const setUnreadMessages = useSetRecoilState(unreadMessageState);
  const [activeChatRoomId, setActiveChatRoomId] = useRecoilState(
    activeChatRoomIdState,
  );
  const otherUser = chat.users.find((user) => user._id !== me?._id);

  const lastMessageContent = chat.messages.length
    ? chat?.messages[chat.messages.length - 1].type === 'text'
      ? chat?.messages[chat.messages.length - 1].content
      : 'Image'
    : '아무도 채팅을 안 했습니당';

  const getLocalMessageTime = (date: Date) => new Date(date).toString();
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  console.log(yesterday);
  const lastMessageTime = chat.messages.length
    ? getLocalMessageTime(
        chat?.messages[chat.messages.length - 1].createdAt,
      ).slice(4, 16) === new Date().toString().slice(4, 16)
      ? getLocalMessageTime(
          chat?.messages[chat.messages.length - 1].createdAt,
        ).slice(16, 21)
      : getLocalMessageTime(
          chat?.messages[chat.messages.length - 1].createdAt,
        ).slice(4, 16) === getLocalMessageTime(yesterday).slice(4, 16)
      ? 'yesterday'
      : getLocalMessageTime(
          chat?.messages[chat.messages.length - 1].createdAt,
        ).slice(4, 10)
    : '';

  const isActiveRoom = chat._id === activeChatRoomId;

  const handleChatRoomClick = () => {
    setUnreadMessages((unreadMessages) =>
      unreadMessages.filter((message) => message.chatRoom_id !== chat._id),
    );
    setActiveChatRoomId(chat._id);
  };

  return (
    <Container isActive={isActiveRoom} onClick={handleChatRoomClick}>
      <ImageContainer>
        <ProfileImage src={otherUser?.image_url ?? ''} size="medium" />
      </ImageContainer>
      <MessageContainer>
        <MessageTopContainer>
          <h1>{otherUser?.nickname}</h1>
          <TimeContainer>{lastMessageTime}</TimeContainer>
        </MessageTopContainer>
        <MessageBottomContainer>
          <p>{lastMessageContent}</p>
          {newMessages !== 0 && (
            <MessageNotification>{newMessages}</MessageNotification>
          )}
        </MessageBottomContainer>
      </MessageContainer>
    </Container>
  );
}

const Container = styled.li<{ isActive: boolean }>`
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  padding: 2rem;
  background-color: ${(prop) => prop.isActive && '#242526'};
  border-radius: ${(prop) => prop.isActive && '2rem 0 2rem 0'};
  cursor: pointer;
`;

const ImageContainer = styled.div`
  min-width: 5rem;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MessageTopContainer = styled.div`
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.fontColor.titleColor};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const MessageBottomContainer = styled.div`
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.fontColor.titleColor};
  width: 100%;
  height: 100%;
  display: flex;
  p {
    font-size: 1.2rem;
    width: 100%;
    height: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }
`;

const TimeContainer = styled.div`
  color: ${({ theme }) => theme.fontColor.titleColor};
  font-size: 1rem;
`;

const MessageNotification = styled.div`
  background-color: ${({ theme }) => theme.newChat};
  border-radius: 100%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  color: ${({ theme }) => theme.fontColor.titleColor};
  font-weight: bold;
`;
