import styled from 'styled-components';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import useInput from '../../hooks/useInput';
import socket from '../../library/socket';
import { SocketEvents } from '../../library/socket.events.enum';
import { useSetRecoilState } from 'recoil';
import { chatState } from '../../recoil/atoms';
import { useState } from 'react';
import { Chat, Message } from '../../interfaces/chat.interface';

interface Props {
  activeChatRoom: Chat;
}

export default function ChatInput({ activeChatRoom }: Props) {
  const [value, onChangeInputText, setInputText] = useInput();
  const SendBtnColor = value.length ? '#8083FF' : '#727272';
  const setChatData = useSetRecoilState(chatState);
  const [isPending, setIsPending] = useState(false);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!value || isPending) {
      return;
    }
    if (e.code === 'Enter') {
      setIsPending(true);
      const payload = {
        chatRoom_id: activeChatRoom?._id,
        type: 'text',
        content: value,
      };
      socket.emit(SocketEvents.Message, payload, (message: Message) => {
        setInputText('');
        setIsPending(false);
        setChatData((prev) => {
          const filteredChatRoom = prev.filter(
            (chatRoom) => chatRoom._id !== message.chatRoom_id,
          );
          const target = prev.find(
            (chatRoom) => chatRoom._id === message.chatRoom_id,
          );
          if (target) {
            const targetRoomMessages = [...target.messages, message];
            return [
              { ...target, messages: targetRoomMessages },
              ...filteredChatRoom,
            ];
          }
          return prev;
        });
      });
    }
  };

  return (
    <Container>
      <ImageOutlinedIcon sx={{ color: '#727272', fontSize: 23 }} />
      <input
        value={value}
        onChange={onChangeInputText}
        placeholder="Your messages..."
        onKeyDown={handleInputKeyDown}
      />
      <SendRoundedIcon sx={{ color: SendBtnColor, fontSize: 23 }} />
    </Container>
  );
}

const Container = styled.div`
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
  height: 4.5rem;
  padding: 1.5rem;
  background-color: #242526;
  border-radius: 1rem;
  input {
    width: 100%;
    background-color: inherit;
    margin-left: 1rem;
    color: ${({ theme }) => theme.fontColor.contentColor};
    ::placeholder {
      color: ${({ theme }) => theme.fontColor.contentColor};
    }
    &:focus {
      outline: none;
    }
  }
  svg {
    &:last-child {
      transform: rotateZ(-45deg);
      margin-bottom: 0.5rem;
    }
  }
`;
