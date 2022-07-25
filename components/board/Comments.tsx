import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import useMe from '../../hooks/useMe';
import ProfileImage from '../common/ProfileImage';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

export default function Comments() {
  const { data: me } = useMe();
  const [value, onChangeInputText, setInputText] = useInput();
  const SendBtnColor = value.length ? '#8083FF' : '#727272';
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {};
  return (
    <Container>
      <WriteCommentContainer>
        {me && <ProfileImage src={me.image_url} size="small" />}
        <WriteCommentBox>
          <input
            placeholder="Write a comment"
            value={value}
            onChange={onChangeInputText}
            onKeyDown={handleInputKeyDown}
          />
          <SendRoundedIcon sx={{ color: SendBtnColor, fontSize: 23 }} />
        </WriteCommentBox>
      </WriteCommentContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 65rem;
  margin: 0 3rem;
  padding: 2rem 2.5rem;
  background-color: #242526;
  border-top: 1px solid ${({ theme }) => theme.grayColor};
  border-radius: 0 0 1rem 1rem;
`;

const WriteCommentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const WriteCommentBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  background-color: #3a3b3c;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  input {
    width: 100%;
    margin-left: 1rem;
    background-color: inherit;
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
