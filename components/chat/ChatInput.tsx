import styled from 'styled-components';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import useInput from '../../hooks/useInput';
import socket from '../../library/socket';
import { SocketEvents } from '../../library/socket.events.enum';
import { useSetRecoilState } from 'recoil';
import { chatState } from '../../recoil/atoms';
import { useState } from 'react';
import { Chat, Message } from '../../interfaces/chat.interface';
import { encodeBase64ImageFile } from '../../library/ImageConverter';
import Image from 'next/image';

interface Props {
  activeChatRoom: Chat;
}

export default function ChatInput({ activeChatRoom }: Props) {
  const [value, onChangeInputText, setInputText] = useInput();
  const setChatData = useSetRecoilState(chatState);
  const [isPending, setIsPending] = useState(false);
  const [isImageExist, setIsImageExist] = useState(false);
  const [image, setImage] = useState('');
  const SendBtnColor = value.length || isImageExist ? '#8083FF' : '#727272';

  const onChangeImage = async (
    e: React.ChangeEvent<HTMLInputElement> | any,
  ) => {
    const selectedImage = e.target.files[0];

    if (selectedImage && selectedImage.size <= 2000000) {
      const encodedImage = await encodeBase64ImageFile(selectedImage);
      setImage(encodedImage);
      setIsImageExist(true);
    }
  };

  const removeImage = () => {
    setImage('');
    setIsImageExist(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      sendMessage();
    }
  };

  const handleSendButtonClick = () => sendMessage();

  const sendMessage = () => {
    if ((!value && !isImageExist) || isPending) {
      return;
    }

    setIsPending(true);
    const payload = isImageExist
      ? {
          chatRoom_id: activeChatRoom?._id,
          type: 'image',
          content: image,
        }
      : {
          chatRoom_id: activeChatRoom?._id,
          type: 'text',
          content: value,
        };

    socket.emit(SocketEvents.Message, payload, (message: Message) => {
      setInputText('');
      setImage('');
      setIsImageExist(false);
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
  };

  return (
    <Container isImageExist={isImageExist}>
      <InputContainer isImageExist={isImageExist}>
        {isImageExist ? (
          <ImageWrapper>
            <Image src={image} width="100" height="100" alt="image" />
            <CancelIcon fontSize="large" onClick={() => removeImage()} />
          </ImageWrapper>
        ) : (
          <>
            <ImageIconWrapper as="label" htmlFor="image_send">
              <ImageOutlinedIcon sx={{ color: '#727272', fontSize: 23 }} />
            </ImageIconWrapper>
            <InputWrapper>
              <input
                id="image_send"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={onChangeImage}
              />
            </InputWrapper>
            <input
              value={value}
              onChange={onChangeInputText}
              placeholder="Your messages..."
              onKeyDown={handleInputKeyDown}
            />
          </>
        )}
        <SendButtonWrapper
          isButtonActive={SendBtnColor === '#8083FF' ? true : false}
          onClick={handleSendButtonClick}
        >
          <SendRoundedIcon sx={{ color: SendBtnColor, fontSize: 23 }} />
        </SendButtonWrapper>
      </InputContainer>
    </Container>
  );
}

interface isImageExist {
  isImageExist: boolean;
}

interface isButtonActive {
  isButtonActive: boolean;
}

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  img {
    object-fit: cover;
    border-radius: 1rem;
  }
  svg {
    border-radius: 50%;
    background-color: ${({ theme }) => theme.fontColor.titleColor};
    color: ${({ theme }) => theme.bgColor};
    position: absolute;
    top: 4rem;
    right: 2rem;
    cursor: pointer;
  }
`;

const Container = styled.div<isImageExist>`
  border-top: 1px solid ${({ theme }) => theme.grayColor};
  ${(props) => (props.isImageExist ? 'height: 12rem;' : '')};
`;

const InputContainer = styled.div<isImageExist>`
  height: ${(props) => (props.isImageExist ? '10rem' : '4.5rem')};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem;
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
`;

const ImageIconWrapper = styled.div`
  cursor: pointer;
`;

const InputWrapper = styled.div`
  input {
    display: none;
  }
`;

const SendButtonWrapper = styled.div<isButtonActive>`
  transform: rotateZ(-45deg);
  margin-bottom: 0.5rem;
  ${(props) => (props.isButtonActive ? 'cursor: pointer;' : '')};
`;
