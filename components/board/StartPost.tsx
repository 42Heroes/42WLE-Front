import styled from 'styled-components';
import useMe from '../../hooks/useMe';
import ProfileImage from '../common/ProfileImage';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

export default function StartPost() {
  const { data: me, isError, isLoading } = useMe();
  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading</div>;

  return (
    <Container>
      {me && <ProfileImage src={me.image_url} size="medium" />}
      <InputContainer>
        <input placeholder="Start a new post..." />
        <ImageOutlinedIcon sx={{ color: '#727272', fontSize: 23 }} />
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 65rem;
  height: 8rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #242526;
  border-radius: 1rem;
  margin-bottom: 3rem;
`;

const InputContainer = styled.div`
  width: 80%;
  height: 60%;
  background-color: #3a3b3c;
  border-radius: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;

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
