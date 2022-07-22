import styled, { keyframes } from 'styled-components';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { activeChatRoomIdState } from '../../recoil/atoms';
import usePeerConnection from '../../hooks/usePeerConnection';

interface Props {
  callInfo: {
    roomNo: string;
  };
}

export default function CallCard({ callInfo }: Props) {
  const router = useRouter();
  const setActiveChatRoomId = useSetRecoilState(activeChatRoomIdState);
  const { handleAcceptCall, handleRejectCall } = usePeerConnection();
  return (
    <Container>
      <CallCardTitle>{callInfo.roomNo}</CallCardTitle>
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
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
