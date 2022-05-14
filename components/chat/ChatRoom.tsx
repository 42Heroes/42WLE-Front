import Image from 'next/image';
import styled from 'styled-components';

interface Props {
  chat: Record<string, unknown>;
  user: string;
}

export default function ChatRoom({ chat, user }: Props) {
  const chatRoomName = chat.users.filter((a: any) => a.nickname !== user)[0];
  const lastMessage = chat.messages[chat.messages.length - 1].content;
  return (
    <Container>
      <ImageContainer>
        <Image
          alt="pic"
          src={chatRoomName.image}
          width={60}
          height={60}
          layout="responsive"
          // objectFit="cover"
        />
      </ImageContainer>
      <MessageContainer>
        <h1>{chatRoomName.nickname}</h1>
        <p>{lastMessage}</p>
      </MessageContainer>
    </Container>
  );
}

const Container = styled.li`
  width: 100%;
  height: 10rem;
  display: flex;
  padding: 2rem;
`;

const ImageContainer = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
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
