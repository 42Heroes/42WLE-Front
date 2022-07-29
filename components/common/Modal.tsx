import React from 'react';
import ModalPortal from './Portal';
import Profile from '../profile/Profile';
import styled from 'styled-components';
import { User } from '../../interfaces/user.interface';
import CreatePost from '../board/CreatePost';
import Confirm from './Confirm';
import { Post } from '../../interfaces/board.interface';
import EditPost from '../board/EditPost';

interface Props {
  user: User;
  toggleModal: (event: React.MouseEvent<HTMLDivElement>) => void;
}

interface CreatePostModalProps {
  toggleModal: (event: React.MouseEvent<HTMLDivElement>) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

interface EditPostModalProps {
  prevContent: Post;
  toggleModal: (event: React.MouseEvent<HTMLDivElement>) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

interface ConfirmModalProps {
  toggleModal: (event: React.MouseEvent<HTMLDivElement>) => void;
  mainText: string;
  buttonText: string;
  handleButtonClick: () => void;
  targetId?: string;
}

export const ProfileModal = ({ user, toggleModal }: Props) => {
  return (
    <ModalPortal>
      <Background onClick={toggleModal}>
        <div onClick={(e) => e.preventDefault()}>
          <Profile user={user} />
        </div>
      </Background>
    </ModalPortal>
  );
};

export const CreatePostModal = ({
  toggleModal,
  setIsModalOpen,
}: CreatePostModalProps) => {
  return (
    <ModalPortal>
      <Background onClick={toggleModal}>
        <div onClick={(e) => e.preventDefault()}>
          <CreatePost
            toggleModal={toggleModal}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </Background>
    </ModalPortal>
  );
};

export const EditPostModal = ({
  prevContent,
  toggleModal,
  setIsModalOpen,
}: EditPostModalProps) => {
  return (
    <ModalPortal>
      <Background onClick={toggleModal}>
        <div onClick={(e) => e.preventDefault()}>
          <EditPost
            prevContent={prevContent}
            toggleModal={toggleModal}
            setIsModalOpen={setIsModalOpen}
          />
        </div>
      </Background>
    </ModalPortal>
  );
};

export const ConfirmModal = ({
  toggleModal,
  mainText,
  buttonText,
  handleButtonClick,
  targetId,
}: ConfirmModalProps) => {
  return (
    <ModalPortal>
      <Background onClick={toggleModal}>
        <div onClick={(e) => e.preventDefault()}>
          <Confirm
            toggleModal={toggleModal}
            mainText={mainText}
            buttonText={buttonText}
            handleButtonClick={handleButtonClick}
            postId={targetId}
          />
        </div>
      </Background>
    </ModalPortal>
  );
};

const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
