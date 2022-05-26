import React from 'react';
import ModalPortal from './Portal';
import Profile from '../profile/Profile';
import styled from 'styled-components';
import { User } from '../../interfaces/user.interface';

export const ProfileModal = ({ user }: User) => {
  return (
    <ModalPortal>
      <Background>
        <Content>
          <Profile user={user} />
        </Content>
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
  text-align: center;
`;

const Content = styled.div`
  height: 60%;
  width: 40%;
  /* margin-top: 70px; */
  position: relative;
  overflow: scroll;
  background: #141414;
  p {
    color: white;
  }
`;
