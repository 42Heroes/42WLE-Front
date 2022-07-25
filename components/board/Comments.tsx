import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import useMe from '../../hooks/useMe';
import ProfileImage from '../common/ProfileImage';

export default function Comments() {
  const { data: me } = useMe();
  const [value, onChangeInputText, setInputText] = useInput();
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {};
  return (
    <Container>
      <WriteCommentContainer>
        {me && <ProfileImage src={me.image_url} size="small" />}
        <input
          placeholder="Write a comment"
          value={value}
          onChange={onChangeInputText}
          onKeyDown={handleInputKeyDown}
        />
      </WriteCommentContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 65rem;
  margin: 0 3rem;
  padding: 2rem 3rem;
  background-color: #242526;
  border-top: 1px solid ${({ theme }) => theme.grayColor};
  border-radius: 0 0 1rem 1rem;
`;

const WriteCommentContainer = styled.div`
  display: flex;
  align-items: center;
  input {
    width: 100%;
    background-color: #3a3b3c;
    margin-left: 1rem;
    color: ${({ theme }) => theme.fontColor.contentColor};
    border-radius: 1rem;
    padding: 1rem;
    ::placeholder {
      color: ${({ theme }) => theme.fontColor.contentColor};
    }
    &:focus {
      outline: none;
    }
  }
`;
