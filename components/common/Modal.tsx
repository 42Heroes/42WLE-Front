import React from 'react';
import ModalPortal from './Portal';
import Profile from '../profile/Profile';
import styled from 'styled-components';
import { User } from '../../interfaces/user.interface';
import CreatePost from '../board/CreatePost';

interface Props {
  user: User;
  toggleModal: (event: React.MouseEvent<HTMLDivElement>) => void;
}

interface CreatePostModalProps {
  toggleModal: (event: React.MouseEvent<HTMLDivElement>) => void;
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

export const CreatePostModal = ({ toggleModal }: CreatePostModalProps) => {
  return (
    <ModalPortal>
      <Background onClick={toggleModal}>
        <div onClick={(e) => e.preventDefault()}>
          <CreatePost toggleModal={toggleModal} />
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
