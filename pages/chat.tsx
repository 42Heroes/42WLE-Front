import styled from 'styled-components';
import { ReactElement } from 'react';
import CommonLayout from '../components/layout/CommonLayout';

export default function Chat() {
  return (
    <Container>
      <LeftContainer>
        <SearchContainer>
          <input placeholder="Search" />
        </SearchContainer>
      </LeftContainer>
      <RightContainer>
        <NameContainer></NameContainer>
        <MessageContainer></MessageContainer>
        <MessageInputContainer>
          <input placeholder="Your messages..." />
        </MessageInputContainer>
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
  width: 40%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.grayColor};
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 6rem;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
  input {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.bgColor};
    padding: 2rem;
    color: ${({ theme }) => theme.grayColor};
    &:focus {
      outline: none;
    }
  }
`;

const RightContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const NameContainer = styled.div`
  color: white;
  height: 6rem;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
`;

const MessageContainer = styled.div`
  flex: 1;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
`;

const MessageInputContainer = styled.div`
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    width: 95%;
    height: 4.5rem;
    border-radius: 1rem;
    padding: 2rem;
    background-color: #242526;
    color: ${({ theme }) => theme.fontColor.contentColor};
    ::placeholder {
      color: ${({ theme }) => theme.fontColor.contentColor};
    }
  }
`;
