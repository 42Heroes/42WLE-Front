import Image from 'next/image';
import styled from 'styled-components';

interface Props {
  chat: Record<string, unknown>;
  user: string;
}

export default function ChatContent({ user, chat }: Props) {
  const chatRoomName = chat[0].users.filter((a: any) => a.nickname !== user)[0];

  return (
    <Container>
      {chat[0].messages.map((message, i) => {
        if (message.user === user)
          return (
            <UserMessage key={i}>
              <p>{message.content}</p>
            </UserMessage>
          );
        else
          return (
            <PartnerMessageContainer>
              {chatRoomName.image && (
                <PartnerMessageImageWrapper>
                  <Image
                    className="profile-image"
                    alt="pic"
                    src={chatRoomName.image}
                    width={60}
                    height={60}
                    objectFit="cover"
                  />
                </PartnerMessageImageWrapper>
              )}
              <PartnerMessage key={i}>{message.content}</PartnerMessage>
            </PartnerMessageContainer>
          );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserMessage = styled.div`
  color: ${({ theme }) => theme.fontColor.titleColor};
  margin: 2rem;
  display: flex;
  justify-content: flex-end;
  p {
    background-color: #242526;
    border: 1px solid ${({ theme }) => theme.fontColor.commentColor};
    width: max-content;
    padding: 1rem;
    text-align: right;
    border-radius: 30rem;
    border-top-right-radius: 0;
  }
`;

const PartnerMessageContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem;
`;

const PartnerMessageImageWrapper = styled.div`
  width: 6rem;
  height: 6rem;
  .profile-image {
    border-radius: 50%;
  }
`;

const PartnerMessage = styled.div`
  color: ${({ theme }) => theme.fontColor.titleColor};
  border: 1px solid ${({ theme }) => theme.fontColor.commentColor};
  padding: 1rem;
  margin: 2rem;
  border-radius: 30rem;
  border-top-left-radius: 0;
  width: max-content;
`;
