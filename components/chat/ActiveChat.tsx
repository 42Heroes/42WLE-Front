import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ChatContent from './ChatContent';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {
  activeChatPartnerState,
  activeChatRoomState,
} from '../../recoil/selectors';
import ProfileImage from '../common/ProfileImage';

export default function ActiveChat() {
  const activePartner = useRecoilValue(activeChatPartnerState);
  const activeChatRoom = useRecoilValue(activeChatRoomState);

  if (!activeChatRoom || !activePartner) {
    return null;
  }

  return (
    <>
      <NameContainer>
        <ProfileImage src={activePartner.image_url} size="small" />
        <h1>{activePartner.nickname}</h1>
      </NameContainer>
      <MessageContainer>
        <ChatContent
          messages={activeChatRoom.messages}
          activePartner={activePartner}
        />
      </MessageContainer>
      <MessageInputContainer>
        <ImageOutlinedIcon sx={{ color: '#727272', fontSize: 23 }} />
        <input placeholder="Your messages..." />
        <SendRoundedIcon sx={{ color: '#8083FF', fontSize: 23 }} />
      </MessageInputContainer>
    </>
  );
}

const NameContainer = styled.div`
  color: ${({ theme }) => theme.fontColor.titleColor};
  height: 6rem;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
  display: flex;
  align-items: center;
  padding: 2rem;
  h1 {
    margin-left: 2rem;
    font-size: 2rem;
  }
`;

const MessageContainer = styled.div`
  flex: 1;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
`;

const MessageInputContainer = styled.div`
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  height: 4.5rem;
  border-radius: 1rem;
  padding: 1.5rem;
  background-color: #242526;
  input {
    width: 100%;
    background-color: inherit;
    margin-left: 1rem;
    color: ${({ theme }) => theme.fontColor.contentColor};
    ::placeholder {
      color: ${({ theme }) => theme.fontColor.contentColor};
    }
    &:focus {
      outline: none;
    }
  }
  svg {
    &:last-child {
      transform: rotateZ(-45deg);
      margin-bottom: 0.5rem;
    }
  }
`;
