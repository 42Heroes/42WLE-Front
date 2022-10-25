import styled from 'styled-components';
import { ReactElement } from 'react';
import CommonLayout from '../components/layout/CommonLayout';
import { useRecoilValue } from 'recoil';
import { chatState } from '../recoil/atoms';
import ChatRoomList from '../components/chat/ChatRoomList';
import ActiveChat from '../components/chat/ActiveChat';
import ActiveVideoCall from '../components/call/ActiveVideoCall';
import ProtectedPage from '../components/auth/ProtectedPage';

export default function Chat() {
  const chatRooms = useRecoilValue(chatState);

  return (
    <Container>
      <LeftContainer>
        <ChatRoomList chatRooms={chatRooms} />
      </LeftContainer>
      <RightContainer>
        <ActiveVideoCall />
        <ActiveChat />
      </RightContainer>
    </Container>
  );
}

Chat.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout headerText="Chat">
      <ProtectedPage>{page}</ProtectedPage>
    </CommonLayout>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const LeftContainer = styled.div`
  width: 35%;
  min-width: 30rem;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.grayColor};
  display: flex;
  flex-direction: column;
`;

const RightContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;
