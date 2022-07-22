import styled, { keyframes } from 'styled-components';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { useRouter } from 'next/router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeChatRoomIdState, chatState } from '../../recoil/atoms';
import usePeerConnection from '../../hooks/usePeerConnection';
import useMe from '../../hooks/useMe';
import ProfileImage from '../common/ProfileImage';

interface Props {
  callInfo: {
    roomNo: string;
  };
}

export default function CallCard({ callInfo }: Props) {
  const router = useRouter();
  const setActiveChatRoomId = useSetRecoilState(activeChatRoomIdState);
  const { handleAcceptCall, handleRejectCall } = usePeerConnection();
  const { data: me } = useMe();
  const currentChatRoom = useRecoilValue(chatState)?.find(
    (chatRoom) => chatRoom._id === callInfo.roomNo,
  );

  const callCardTitle = currentChatRoom?.users
    .filter((user) => user._id !== me?._id)
    .map((user) => user.nickname)
    .join(', ');

  const callPartner = currentChatRoom?.users.find(
    (user) => user._id !== me?._id,
  );

  return (
    <Container>
      <CallCardTitle>
        <ProfileImage src={callPartner?.image_url ?? ''} size="small" />
        {callCardTitle}
      </CallCardTitle>
      <ButtonContainer>
        <Button
          color="#2ecc71"
          onClick={() => {
            if (router.pathname !== '/chat') {
              router.push('/chat');
            }
            setActiveChatRoomId(callInfo.roomNo);
            handleAcceptCall(callInfo.roomNo);
          }}
        >
          <CallIcon />
        </Button>
        <Button
          color="#e74c3c"
          onClick={() => handleRejectCall(callInfo.roomNo)}
        >
          <CallEndIcon />
        </Button>
      </ButtonContainer>
    </Container>
  );
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const vibrate = keyframes`
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
  100% {
    transform: translate(0);
  }
`;

const Button = styled.button<{ color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ color }) => color};
  border: none;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 100%;
  color: white;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  &:first-child {
    animation: ${vibrate} 0.5s linear infinite both;
    animation-delay: 5s;
  }
  &:last-child:hover {
    animation: ${vibrate} 0.5s linear infinite both;
  }
  &:hover {
    background-color: ${({ color }) => `${color}cc`};
  }
  &:active {
    background-color: ${({ color }) => `${color}80`};
  }
`;

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  background-color: #121212;
  border-radius: 1rem;
  border: 1px solid white;
  width: 30rem;
  padding: 2rem;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const CallCardTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 2rem;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
