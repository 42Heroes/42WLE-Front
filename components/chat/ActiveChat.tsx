import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import ChatContent from './ChatContent';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import SearchIcon from '@mui/icons-material/Search';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import {
  activeChatPartnerState,
  activeChatRoomState,
} from '../../recoil/selectors';
import ProfileImage from '../common/ProfileImage';
import useInput from '../../hooks/useInput';
import socket from '../../library/socket';
import { SocketEvents } from '../../library/socket.events.enum';
import { useEffect, useRef, useState } from 'react';
import { chatState } from '../../recoil/atoms';
import { Message } from '../../interfaces/chat.interface';

export default function ActiveChat() {
  const activePartner = useRecoilValue(activeChatPartnerState);
  const activeChatRoom = useRecoilValue(activeChatRoomState);
  const setChatData = useSetRecoilState(chatState);
  const [isPending, setIsPending] = useState(false);
  const [value, onChangeInputText, setInputText] = useInput();
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const SendBtnColor = value.length ? '#8083FF' : '#727272';

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!value || isPending) {
      return;
    }
    if (e.code === 'Enter') {
      setIsPending(true);
      const payload = {
        chatRoom_id: activeChatRoom?._id,
        type: 'text',
        content: value,
      };
      socket.emit(SocketEvents.Message, payload, (message: Message) => {
        setInputText('');
        setIsPending(false);
        setChatData((prev) => {
          const filteredChatRoom = prev.filter(
            (chatRoom) => chatRoom._id !== message.chatRoom_id,
          );
          const target = prev.find(
            (chatRoom) => chatRoom._id === message.chatRoom_id,
          );
          if (target) {
            const targetRoomMessages = [...target.messages, message];
            return [
              { ...target, messages: targetRoomMessages },
              ...filteredChatRoom,
            ];
          }
          return prev;
        });
      });
    }
  };

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [activeChatRoom?.messages]);

  if (!activeChatRoom || !activePartner) {
    return null;
  }

  const handleSearchBtnClick = () => {
    return;
  };
  const handleVideoBtnClick = () => {
    return;
  };

  return (
    <>
      <NameContainer>
        <PartnerNameBox>
          <ProfileImage src={activePartner.image_url} size="small" />
          <h1>{activePartner.nickname}</h1>
        </PartnerNameBox>
        <BtnBox>
          <VideocamRoundedIcon
            sx={{ fontSize: 25 }}
            onClick={() => handleVideoBtnClick}
          />
          <SearchIcon
            sx={{ fontSize: 25 }}
            onClick={() => handleSearchBtnClick}
          />
        </BtnBox>
      </NameContainer>
      <MessageContainer>
        <ChatContent
          messages={activeChatRoom.messages}
          activePartner={activePartner}
        />
        <div ref={messageContainerRef}> </div>
      </MessageContainer>
      <MessageInputContainer>
        <ImageOutlinedIcon sx={{ color: '#727272', fontSize: 23 }} />
        <input
          value={value}
          onChange={onChangeInputText}
          placeholder="Your messages..."
          onKeyDown={handleInputKeyDown}
        />
        <SendRoundedIcon sx={{ color: SendBtnColor, fontSize: 23 }} />
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
  justify-content: space-between;
  padding: 2rem;
  h1 {
    margin-left: 2rem;
    font-size: 2rem;
  }
`;

const PartnerNameBox = styled.div`
  display: flex;
  align-items: center;
`;

const BtnBox = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.grayColor};
  svg {
    margin: 1rem;
  }
`;

const MessageContainer = styled.div`
  flex: 1;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
  overflow: auto;
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
