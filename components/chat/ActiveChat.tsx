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
import { useEffect, useRef } from 'react';
import usePeerConnection from '../../hooks/usePeerConnection';
import ChatInput from './ChatInput';
import toast from 'react-hot-toast';
import { isCallingState } from '../../recoil/atoms';

export default function ActiveChat() {
  const activePartner = useRecoilValue(activeChatPartnerState);
  const activeChatRoom = useRecoilValue(activeChatRoomState);
  const isCalling = useRecoilValue(isCallingState);

  const messageContainerRef = useRef<HTMLDivElement | null>(null);
  const { handleRequestCall, handleEndCall } = usePeerConnection();

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
