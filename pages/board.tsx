import { ReactElement, useState } from 'react';
import CommonLayout from '../components/layout/CommonLayout';
import StartPost from '../components/board/StartPost';
import styled from 'styled-components';
import { CreatePostModal } from '../components/common/Modal';

export default function Board() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented) {
      return;
    }
    setIsModalOpen(!isModalOpen);
  };

  return (
    <Container>
      <div
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <StartPost />
      </div>
      {isModalOpen && <CreatePostModal toggleModal={toggleModal} />}
    </Container>
  );
}

Board.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Board">{page}</CommonLayout>;
};

const Container = styled.div``;
