import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {
  activeChatPartnerState,
  activeChatRoomState,
} from '../../recoil/selectors';
import ProfileImage from '../common/ProfileImage';

interface Props {
  onClick: () => void;
}

export default function ShowLastMessageButton({ onClick }: Props) {
  const activePartner = useRecoilValue(activeChatPartnerState);
  const activeChatRoom = useRecoilValue(activeChatRoomState);

  if (!activeChatRoom || !activePartner) {
    return null;
  }

  return (
    <Container onClick={onClick}>
      <ProfileImageWrapper>
        <ProfileImage src={activePartner.image_url} size="small" />
      </ProfileImageWrapper>
      <LastMessageWrapper>
        <LastMessageUsername>{activePartner.nickname}</LastMessageUsername>
        <LastMessageContent>
          <p>
            {
              activeChatRoom.messages[activeChatRoom.messages.length - 1]
                .content
            }
          </p>
        </LastMessageContent>
      </LastMessageWrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: #242526;
  color: ${({ theme }) => theme.fontColor.contentColor};
  position: sticky;
  bottom: 1rem;
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  margin: 1rem;
  border-radius: 1rem;
  cursor: pointer;
`;

const ProfileImageWrapper = styled.div`
  min-width: 3rem;
`;

const LastMessageWrapper = styled.div`
  margin-left: 1rem;
`;

const LastMessageUsername = styled.div`
  font-weight: 600;
`;

const LastMessageContent = styled.div`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
`;
