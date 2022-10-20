import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import useMe from '../../hooks/useMe';
import usePeerConnection from '../../hooks/usePeerConnection';
import CallList from '../call/CallList';
import Header from './Header';
import Nav from './Nav';
import { Toaster } from 'react-hot-toast';

interface Props {
  children: React.ReactElement;
  headerText: string;
}

export default function CommonLayout({ children, headerText }: Props) {
  usePeerConnection();

  const { data } = useMe();
  const router = useRouter();

  if (typeof window !== 'undefined' && data?.isRegisterDone === false) {
    router.replace('/register/learn');
  }

  return (
    <Container>
      <EmptyBox />
      <Header headerText={headerText} />
      <Nav />
      <Main>{children}</Main>
      <CallList />
      <Toaster />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 8rem 1fr;
  grid-template-rows: 8rem 1fr;
  height: 100vh;
  width: 100vw;
`;

const Main = styled.main`
  min-width: 100%;
  min-height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const EmptyBox = styled.div`
  position: relative;
  ::before {
    content: '';
    position: absolute;
    height: 0.1rem;
    width: 50%;
    background-color: ${({ theme }) => theme.grayColor};
    bottom: 0;
    transform: translate(50%, -50%);
  }
  ::after {
    content: '';
    position: absolute;
    right: 0;
    height: 50%;
    width: 0.1rem;
    background-color: ${({ theme }) => theme.grayColor};
    transform: translate(50%, 50%);
  }
`;
