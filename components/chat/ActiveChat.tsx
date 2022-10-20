import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import ChatContent from './ChatContent';
import VideocamRoundedIcon from '@mui/icons-material/VideocamRounded';
import PhoneDisabledRoundedIcon from '@mui/icons-material/PhoneDisabledRounded';
import {
  activeChatPartnerState,
  activeChatRoomState,
} from '../../recoil/selectors';
import ProfileImage from '../common/ProfileImage';
import { useCallback, useEffect, useRef, useState } from 'react';
import usePeerConnection from '../../hooks/usePeerConnection';
import ChatInput from './ChatInput';
import toast from 'react-hot-toast';
import { isCallingState } from '../../recoil/atoms';
import * as _ from 'lodash';
import ShowLastMessageButton from './ShowLastMessageButton';
import { CostExplorer } from 'aws-sdk';

export default function ActiveChat() {
  const activePartner = useRecoilValue(activeChatPartnerState);
  const activeChatRoom = useRecoilValue(activeChatRoomState);
  const isCalling = useRecoilValue(isCallingState);

  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const { handleRequestCall, handleEndCall } = usePeerConnection();

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [scrollState, setScrollState] = useState(true);
  const [isShowLastMessageButton, setIsShowLastMessageButton] = useState(false);

  const scrollEvent = _.debounce(() => {
    const scrollTop = messageContainerRef.current?.scrollTop; // 스크롤 위치(스크롤바에 의해 가려져 보이지 않는 위쪽 콘텐츠의 높이)
    const clientHeight = messageContainerRef.current?.clientHeight; // 요소의 높이
    const scrollHeight = messageContainerRef.current?.scrollHeight; // 스크롤의 높이

    if (!scrollTop || !clientHeight || !scrollHeight) return;

    const isAtBottom =
      scrollTop + clientHeight >= scrollHeight - 100 ? true : false;

    setScrollState(isAtBottom);
    if (isAtBottom) setIsShowLastMessageButton(false);
  }, 100);

  const scroll = useCallback(scrollEvent, [scrollEvent]);

  useEffect(() => {
    // 스크롤이 맨 아래에 있거나 내가 보낸 메시지면 -> 메시지 왔을 때 스크롤 맨 아래로 내리기
    if (
      scrollState ||
      activeChatRoom?.messages.slice(-1)[0].user_id !== activePartner?._id
    ) {
      scrollRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      // 스크롤이 맨 아래에 있지 않고 상대방이 보낸 메시지면 -> showLastMessageButton 띄우기
    } else {
      setIsShowLastMessageButton(true);
    }
  }, [activeChatRoom?.messages]);

  useEffect(() => {
    messageContainerRef.current?.addEventListener('scroll', scroll);
  });

  if (!activeChatRoom || !activePartner) {
    return null;
  }

  const handleLastMessageBtnClick = () => {
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
    setScrollState(true);
    setIsShowLastMessageButton(false);
  };

  const handleVideoButtonClick = () => {
    toast.promise(handleRequestCall(activeChatRoom._id), {
      loading: 'Calling...',
      success: 'Calling...',
      error: 'Failed to call, check the network or camera permission',
    });
  };

  const handleEndButtonClick = () => {
    toast.promise(handleEndCall(), {
      loading: 'Please wait...',
      success: 'Success to call end',
      error: 'Failed to end call',
    });
  };

  return (
    <Container>
      <NameContainer>
        <PartnerNameBox>
          <ProfileImage src={activePartner.image_url} size="small" />
          <h1>{activePartner.nickname}</h1>
        </PartnerNameBox>
        <ButtonContainer>
          {isCalling ? (
            <VideoButton onClick={handleEndButtonClick} isCalling>
              <PhoneDisabledRoundedIcon sx={{ fontSize: 25 }} />
            </VideoButton>
          ) : (
            <VideoButton onClick={handleVideoButtonClick}>
              <VideocamRoundedIcon sx={{ fontSize: 25 }} />
            </VideoButton>
          )}
        </ButtonContainer>
      </NameContainer>
      <MessageContainer ref={messageContainerRef}>
        <ChatContent
          messages={activeChatRoom.messages}
          activePartner={activePartner}
        />
        {isShowLastMessageButton && (
          <ShowLastMessageButton onClick={handleLastMessageBtnClick} />
        )}
        <div ref={scrollRef} />
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

const ButtonContainer = styled.div`
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
  overflow: auto;
  width: 100%;
  position: relative;
`;

const VideoButton = styled.button<{ isCalling?: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  aspect-ratio: 1;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: #242526;

    svg {
      fill: ${({ isCalling }) => (isCalling ? '#eb4d4b' : '#2ecc71')};
    }
  }
  svg {
    fill: ${({ theme }) => theme.grayColor};
    aspect-ratio: 1;
  }
`;
