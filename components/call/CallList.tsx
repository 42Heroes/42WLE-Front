import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import usePeerConnection from '../../hooks/usePeerConnection';
import { callListState } from '../../recoil/atoms/callAtom';
import CallCard from './CallCard';

export default function CallList() {
  const callList = useRecoilValue(callListState);
  const { handleAcceptCall, handleRejectCall } = usePeerConnection();

  return (
    <Container>
      {callList.map((callInfo) => (
        <CallCard
          key={callInfo.roomNo}
          callInfo={callInfo}
          onAcceptClick={handleAcceptCall}
          onRejectClick={handleRejectCall}
        />
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  gap: 2rem;
  top: 0;
  right: 0;
  z-index: 100;
`;
