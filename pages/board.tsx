import { ReactElement, useState } from 'react';
import CommonLayout from '../components/layout/CommonLayout';
import StartPost from '../components/board/StartPost';
import styled from 'styled-components';
import { CreatePostModal } from '../components/common/Modal';
import { Post } from '../interfaces/board.interface';
import { useQuery } from 'react-query';
import { getPosts } from '../library/api/board';
import PostCard from '../components/board/PostCard';

export default function Board() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const postsData = useQuery<Post[]>(['board'], getPosts);
  console.log(postsData.data);

  const toggleModal = (e: React.MouseEvent<HTMLDivElement | SVGSVGElement>) => {
    if (e.currentTarget !== e.target) {
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
      {isModalOpen && (
        <CreatePostModal
          toggleModal={toggleModal}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {postsData.data?.map((post) => (
        <PostCard key={post._id} postData={post} />
      ))}
    </Container>
  );
}

Board.getLayout = function getLayout(page: ReactElement) {
  return <CommonLayout headerText="Board">{page}</CommonLayout>;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem;
`;
