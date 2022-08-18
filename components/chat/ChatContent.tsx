import Image from 'next/image';
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

interface isMarginNeededProps {
  isMarginNeeded: boolean;
}

export default function ChatContent({ messages, activePartner }: Props) {
  const me = useRecoilValue(userState);
  const getLocalTime = (date: Date) => new Date(date).toString().slice(15, 21);
  const getLocalDate = (date: Date) => new Date(date).toString().slice(4, 15);
  return (
    <Container>
      {messages.map((message, index) => {
        const localDate = getLocalTime(message.createdAt);
        const isLastMessage = messages[index + 1]
          ? messages[index + 1].user_id !== message.user_id
          : true;
        const isLastTime = messages[index + 1]
          ? getLocalTime(messages[index].createdAt) !==
            getLocalTime(messages[index + 1].createdAt)
          : true;
        const isFirstMessage = messages[index - 1]
          ? messages[index - 1].user_id !== message.user_id
          : true;
        const isFirstTime = messages[index - 1]
          ? getLocalTime(messages[index].createdAt) !==
            getLocalTime(messages[index - 1].createdAt)
          : true;
        const isMarginNeeded = isLastMessage || isLastTime;
        const isDateChanged =
          messages[index - 1] &&
          getLocalDate(messages[index - 1].createdAt) !==
            getLocalDate(messages[index].createdAt)
            ? true
            : false;

        return (
          <>
            {(index === 0 || isDateChanged) && (
              <DateWrapper>
                <p>{getLocalDate(message.createdAt)}</p>
              </DateWrapper>
            )}
            {message.user_id === me?._id ? (
              <UserMessage key={message._id} isMarginNeeded={isMarginNeeded}>
                {(isLastMessage || isLastTime) && (
                  <TimeContainer>{localDate}</TimeContainer>
                )}
                {message.type === 'text' ? (
                  <p>{message.content}</p>
                ) : (
                  <ImageWrapper>
                    <Image
                      src={message.content}
                      layout="fill"
                      objectFit="cover"
                      alt="image"
                    />
                  </ImageWrapper>
                )}
              </UserMessage>
            ) : (
              <PartnerMessageContainer
                key={message._id}
                isMarginNeeded={isMarginNeeded}
              >
                <ImageContainer>
                  {(isFirstMessage || isFirstTime) && (
                    <ProfileImage src={activePartner.image_url} size="small" />
                  )}
                </ImageContainer>
                <PartnerMessageWrapper>
                  {message.type === 'text' ? (
                    <PartnerMessage>
                      <p>{message.content}</p>
                    </PartnerMessage>
                  ) : (
                    <ImageWrapper>
                      <Image
                        src={message.content}
                        layout="fill"
                        objectFit="cover"
                        alt="image"
                      />
                    </ImageWrapper>
                  )}
                </PartnerMessageWrapper>
                {(isLastMessage || isLastTime) && (
                  <TimeContainer>{localDate}</TimeContainer>
                )}
              </PartnerMessageContainer>
            )}
          </>
        );
      })}
    </Container>
  );
}

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 0 2rem;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  margin: 1.5rem 0;
  color: ${({ theme }) => theme.fontColor.commentColor};

  ::before {
    content: '';
    flex-grow: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.fontColor.commentColor};
    font-size: 1rem;
    margin-right: 1rem;
  }
  ::after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.fontColor.commentColor};
    font-size: 1rem;
    margin-left: 1rem;
  }
`;

const UserMessage = styled.div<isMarginNeededProps>`
  color: ${({ theme }) => theme.fontColor.titleColor};
  margin-bottom: ${(prop) => (prop.isMarginNeeded ? '2rem' : '0.5rem')};
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  p {
    background-color: #242526;
    border: 1px solid ${({ theme }) => theme.fontColor.commentColor};
    width: max-content;
    padding: 1rem;
    border-radius: 2rem;
    border-top-right-radius: 0;
    max-width: 80%;
    word-wrap: break-word;
  }
`;

const PartnerMessageContainer = styled.div<isMarginNeededProps>`
  display: flex;
  align-items: flex-end;
  margin-bottom: ${(prop) => (prop.isMarginNeeded ? '2rem' : '0.5rem')};
`;

const ImageContainer = styled.div`
  min-width: 4rem;
`;

const PartnerMessageWrapper = styled.div`
  color: ${({ theme }) => theme.fontColor.titleColor};
  margin-left: 2rem;
  margin-right: 1rem;
  width: max-content;
  max-width: 80%;
  word-wrap: break-word;
`;

const PartnerMessage = styled.div`
  border: 1px solid ${({ theme }) => theme.fontColor.commentColor};
  border-radius: 2rem;
  border-top-left-radius: 0;
  padding: 1rem;
`;

const TimeContainer = styled.div`
  color: ${({ theme }) => theme.fontColor.titleColor};
  font-size: 1rem;
  margin-right: 1rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 10rem;
  height: 10rem;
  img {
    border-radius: 1rem;
  }
`;
