import styled from 'styled-components';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import useInput from '../../hooks/useInput';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeChatRoomIdState, chatState } from '../../recoil/atoms';
import { useState } from 'react';
import { Chat, Message } from '../../interfaces/chat.interface';
import useMessage from '../../hooks/useMessage';
import { activeChatPartnerState } from '../../recoil/selectors';

interface Props {
  activeChatRoom: Chat;
}

export default function ChatInput({ activeChatRoom }: Props) {
  const activePartner = useRecoilValue(activeChatPartnerState);
  const setActiveChatRoomId = useSetRecoilState(activeChatRoomIdState);
  const [value, onChangeInputText, setInputText] = useInput();
  const SendBtnColor = value.length ? '#8083FF' : '#727272';
  const setChatData = useSetRecoilState(chatState);
  const [isPending, setIsPending] = useState(false);
  const { handleSendMessage, requestCreateRoom } = useMessage();

  const handleInputKeyDown = async (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (
      !value ||
      isPending ||
      e.code !== 'Enter' ||
      !activeChatRoom ||
      !activePartner
    ) {
      return;
    }
    setIsPending(true);
    const payload = {
      chatRoom_id: activeChatRoom?._id,
      type: 'text',
      content: value,
    };
    if (activeChatRoom.isDummy) {
      const newChatRoom = await requestCreateRoom({
        target_id: activePartner?._id,
      });
      setChatData((prev) => {
        const filteredRoom = prev.filter(
          (room) => room._id !== activeChatRoom?._id,
        );
        return filteredRoom;
      });
      payload.chatRoom_id = newChatRoom._id;
      setActiveChatRoomId(newChatRoom._id);
    }
    await handleSendMessage(payload);
    setIsPending(false);
    setInputText('');
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
