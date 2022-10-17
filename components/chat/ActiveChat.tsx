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
    // 스크롤이 맨 아래에 있을때
    setScrollState(
      scrollTop + clientHeight >= scrollHeight - 100 ? true : false,
    );
    setIsShowLastMessageButton(false);
  }, 100);

  const scroll = useCallback(scrollEvent, [scrollEvent]);

  useEffect(() => {
    if (scrollState) {
      scrollRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    } else {
      setIsShowLastMessageButton(true);
    }
  }, [activeChatRoom?.messages, scrollState]);

  useEffect(() => {
    messageContainerRef.current?.addEventListener('scroll', scroll);
  });

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
      <MessageContainer ref={messageContainerRef}>
        <ChatContent
          messages={activeChatRoom.messages}
          activePartner={activePartner}
        />
        {isShowLastMessageButton && (
          <ShowLastMessageButton onClick={() => setScrollState(true)}>
            <ProfileImage src={activePartner.image_url} size="small" />
            <LastMessageWrapper>
              <LastMessageUsername>
                {activePartner.nickname}
              </LastMessageUsername>
              <LastMessageContent>
                {
                  activeChatRoom.messages[activeChatRoom.messages.length - 1]
                    .content
                }
              </LastMessageContent>
            </LastMessageWrapper>
          </ShowLastMessageButton>
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

const ShowLastMessageButton = styled.div`
  background-color: pink;
  position: fixed;
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  cursor: pointer;
  // 채팅 인풋에 이미지가 있을 때 위치를 조정해주어야 함
  bottom: 6.5rem;
`;

const LastMessageWrapper = styled.div`
  margin-left: 1rem;
`;

const LastMessageUsername = styled.div`
  font-weight: 600;
`;

const LastMessageContent = styled.div``;
