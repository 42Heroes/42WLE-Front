import { ReactElement } from 'react';
import CommonLayout from '../components/layout/CommonLayout';
import StartPost from '../components/board/StartPost';
import styled from 'styled-components';
import CreatePost from '../components/board/CreatePost';

export default function Board() {
  return (
    <Container>
      <StartPost />
      <CreatePost />
    </Container>
  );
}

Board.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Board">{page}</CommonLayout>;
};

const Container = styled.div``;
