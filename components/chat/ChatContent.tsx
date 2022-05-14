import styled from 'styled-components';

interface Props {
  chat: Record<string, unknown>;
  user: string;
}

export default function ChatContent({ user, chat }: Props) {
  console.log(chat[0].messages);

  return (
    <Container>
      {chat[0].messages &&
        chat[0].messages.map((message, i) => {
          if (message.user === user)
            return (
              <UserMessage key={i}>
                <p>{message.content}</p>
              </UserMessage>
            );
          else
            return <PartnerMessage key={i}>{message.content}</PartnerMessage>;
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
const PartnerMessage = styled.div`
  color: ${({ theme }) => theme.fontColor.titleColor};
  border: 1px solid ${({ theme }) => theme.fontColor.commentColor};
  padding: 1rem;
  margin: 2rem;
  border-radius: 30rem;
  border-top-left-radius: 0;
  width: max-content;
`;
