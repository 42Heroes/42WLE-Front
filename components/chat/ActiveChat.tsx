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
import { useCallback, useEffect, useRef, useState } from 'react';
import usePeerConnection from '../../hooks/usePeerConnection';
import ChatInput from './ChatInput';
import * as _ from 'lodash';
import ShowLastMessageButton from './ShowLastMessageButton';

export default function ActiveChat() {
  const activePartner = useRecoilValue(activeChatPartnerState);
  const activeChatRoom = useRecoilValue(activeChatRoomState);
  const { handleRequestCall } = usePeerConnection();

  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [scrollState, setScrollState] = useState(true);
  const [isShowLastMessageButton, setIsShowLastMessageButton] = useState(false);

  const scrollEvent = _.debounce(() => {
    const scrollTop = messageContainerRef.current?.scrollTop; // 스크롤 위치(스크롤바에 의해 가려져 보이지 않는 위쪽 콘텐츠의 높이)
    const clientHeight = messageContainerRef.current?.clientHeight; // 요소의 높이
    const scrollHeight = messageContainerRef.current?.scrollHeight; // 스크롤의 높이
    if (!scrollTop || !clientHeight || !scrollHeight) return;

    const isBottomCondition = scrollTop + clientHeight >= scrollHeight - 100;
    // 스크롤이 맨 아래에 있을때
    setScrollState(isBottomCondition);
    setIsShowLastMessageButton(false);
  }, 100);
  console.log(isShowLastMessageButton);
  const scroll = useCallback(scrollEvent, [scrollEvent]);

  useEffect(() => {
    // 스크롤이 맨 아래에 있으면 -> 메시지 왔을 때스크롤 맨 아래로 내리기
    if (
      scrollState ||
      activeChatRoom?.messages.slice(-1)[0].user_id !== activePartner?._id
    ) {
      scrollRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
      // 스크롤이 맨 아래에 있지 않으면
    } else {
      // 상대방의 메시지면 -> showLastMessageButton 띄우기
      if (
        activeChatRoom?.messages.slice(-1)[0].user_id === activePartner?._id
      ) {
        setIsShowLastMessageButton(true);
      }
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
  overflow: auto;
  width: 100%;
  position: relative;
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
