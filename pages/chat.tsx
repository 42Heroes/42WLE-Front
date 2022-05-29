import styled from 'styled-components';
import { ReactElement } from 'react';
import CommonLayout from '../components/layout/CommonLayout';
import SearchIcon from '@mui/icons-material/Search';
import { useRecoilValue } from 'recoil';
import { chatState } from '../recoil/atoms';
import ChatRoomList from '../components/chat/ChatRoomList';
import ActiveChat from '../components/chat/ActiveChat';

export default function Chat() {
  const chatRooms = useRecoilValue(chatState);

  return (
    <Container>
      <LeftContainer>
        <SearchContainer>
          <input placeholder="Search" />
          <SearchIcon sx={{ fontSize: 25 }} />
        </SearchContainer>
        <ChatRoomList chatRooms={chatRooms} />
      </LeftContainer>
      <RightContainer>
        <ActiveChat />
      </RightContainer>
    </Container>
  );
}

Chat.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Chat">{page}</CommonLayout>;
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
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  color: ${({ theme }) => theme.grayColor};
  input {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.grayColor};
    ::placeholder {
      font-weight: 600;
    }
    &:focus {
      outline: none;
    }
  }
`;

const RightContainer = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
`;
