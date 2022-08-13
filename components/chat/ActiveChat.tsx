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
import { useEffect, useRef, useState } from 'react';
import usePeerConnection from '../../hooks/usePeerConnection';
import useMessage from '../../hooks/useMessage';
import { activeChatRoomIdState, chatState } from '../../recoil/atoms';

export default function ActiveChat() {
  const activePartner = useRecoilValue(activeChatPartnerState);
  const activeChatRoom = useRecoilValue(activeChatRoomState);
  const setActiveChatRoomId = useSetRecoilState(activeChatRoomIdState);
  const setChatData = useSetRecoilState(chatState);
  const [value, onChangeInputText, setInputText] = useInput();
  const [isPending, setIsPending] = useState(false);
  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const SendBtnColor = value.length ? '#8083FF' : '#727272';
  const { handleRequestCall } = usePeerConnection();
  const { handleSendMessage, requestCreateRoom } = useMessage();

  const handleInputKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      !value ||
      isPending ||
      e.code !== 'Enter' ||
      !activeChatRoom ||
      !activePartner
    ) {
      return;
    }
    setIsPending(true);
    const payload = {
      chatRoom_id: activeChatRoom?._id,
      type: 'text',
      content: value,
    };
    if (activeChatRoom.isDummy) {
      const newChatRoom = await requestCreateRoom({
        target_id: activePartner?._id,
      });
      setChatData((prev) => {
        const filteredRoom = prev.filter(
          (room) => room._id !== activeChatRoom?._id,
        );
        return filteredRoom;
      });
      payload.chatRoom_id = newChatRoom._id;
      setActiveChatRoomId(newChatRoom._id);
    }
    await handleSendMessage(payload);
    setIsPending(false);
    setInputText('');
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
    handleRequestCall(activeChatRoom._id);
  };

  return (
    <Container>
      <NameContainer>
        <PartnerNameBox>
          <ProfileImage src={activePartner.image_url} size="small" />
          <h1>{activePartner.nickname}</h1>
        </PartnerNameBox>
        <BtnBox>
          <VideoButton>
            <VideocamRoundedIcon
              sx={{ fontSize: 25 }}
              onClick={handleVideoBtnClick}
            />
          </VideoButton>
          <SearchIcon sx={{ fontSize: 25 }} onClick={handleSearchBtnClick} />
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
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow-y: auto;
`;

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

const VideoButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  aspect-ratio: 1;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: #121212;
    svg {
      fill: ${({ theme }) => theme.pointColor};
    }
  }
  svg {
    fill: ${({ theme }) => theme.grayColor};
    aspect-ratio: 1;
  }
`;

const MessageInputContainer = styled.div`
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  height: 4.5rem;
  padding: 1.5rem;
  background-color: #242526;
  border-radius: 1rem;
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
