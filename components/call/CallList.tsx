import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { callListState } from '../../recoil/atoms/callAtom';
import CallCard from './CallCard';

export default function CallList() {
  const callList = useRecoilValue(callListState);

  return (
    <Container>
      {callList.map((callInfo) => (
        <CallCard key={callInfo.roomNo} callInfo={callInfo} />
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
  margin-right: 2rem;
  margin-top: 2rem;
`;
