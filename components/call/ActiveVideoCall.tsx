import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { isOverlayOpenState, localStreamState } from '../../recoil/atoms';
import { activeChatRoomState, callInfoState } from '../../recoil/selectors';
import media from '../../styles/media';
import LocalVideo from './LocalVideo';
import RemoteVideo from './RemoteVideo';

export default function ActiveVideoCall() {
  const localStream = useRecoilValue(localStreamState);
  const { users } = useRecoilValue(callInfoState);
  const callInfo = useRecoilValue(callInfoState);
  const activeChatRoom = useRecoilValue(activeChatRoomState);
  const isOverlayOpen = useRecoilValue(isOverlayOpenState);

  return callInfo.isCalling &&
    callInfo.roomNo === activeChatRoom?._id &&
    !isOverlayOpen ? (
    <Container>
      {users.map((user) => (
        <RemoteVideo
          key={user.socketId}
          stream={user.stream}
          playsInline
          autoPlay
        />
      ))}
      <LocalVideo stream={localStream} playsInline autoPlay />
    </Container>
  ) : null;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${media.small} {
    flex-direction: row;
  }
`;
