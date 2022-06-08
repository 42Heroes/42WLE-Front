import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { Message } from '../../interfaces/chat.interface';
import { User } from '../../interfaces/user.interface';
import { userState } from '../../recoil/atoms';
import ProfileImage from '../common/ProfileImage';

interface Props {
  messages: Message[];
  activePartner: User;
}

export default function ChatContent({ messages, activePartner }: Props) {
  const me = useRecoilValue(userState);

  return (
    <Container>
      {messages.map((message) =>
        message.user_id === me?._id ? (
          <UserMessage key={message._id}>
            <p>{message.content}</p>
          </UserMessage>
        ) : (
          <PartnerMessageContainer key={message._id}>
            <ProfileImage src={activePartner.image_url} size="small" />
            <PartnerMessage>{message.content}</PartnerMessage>
          </PartnerMessageContainer>
        ),
      )}
    </Container>
  );
}

const Container = styled.ul`
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

const PartnerMessage = styled.div`
  color: ${({ theme }) => theme.fontColor.titleColor};
  margin: 2rem;
  border: 1px solid ${({ theme }) => theme.fontColor.commentColor};
  padding: 1rem;
  border-radius: 30rem;
  border-top-left-radius: 0;
  width: max-content;
`;
