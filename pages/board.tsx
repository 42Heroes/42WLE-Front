import { ReactElement } from 'react';
import CommonLayout from '../components/layout/CommonLayout';
import StartPost from '../components/board/StartPost';
import styled from 'styled-components';

export default function Board() {
  return (
    <Container>
      <StartPost />
    </Container>
  );
}

Board.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Board">{page}</CommonLayout>;
};

const Container = styled.div``;
