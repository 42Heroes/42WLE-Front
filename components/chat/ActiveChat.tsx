import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ChatContent from './ChatContent';
import SearchIcon from '@mui/icons-material/Search';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import {
  activeChatPartnerState,
  activeChatRoomState,
} from '../../recoil/selectors';
import ProfileImage from '../common/ProfileImage';
import { useEffect, useRef, useState } from 'react';
import usePeerConnection from '../../hooks/usePeerConnection';
import ChatInput from './ChatInput';

export default function ActiveChat() {
  const activePartner = useRecoilValue(activeChatPartnerState);
  const activeChatRoom = useRecoilValue(activeChatRoomState);

  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const { handleRequestCall } = usePeerConnection();

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
        <div ref={messageContainerRef} />
      </MessageContainer>
      <ChatInput activeChatRoom={activeChatRoom} />
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
