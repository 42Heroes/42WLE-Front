import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import useMe from '../../hooks/useMe';
import ProfileImage from '../common/ProfileImage';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import Button from '../common/Button';

interface Props {
  toggleModal: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function CreatePost({ toggleModal }: Props) {
  const { data: me, isError, isLoading } = useMe();
  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading</div>;
  return (
    <Container>
      <TopLabel>
        <p>Create a post</p>
        <div onClick={(e) => toggleModal(e)}>
          <ClearIcon fontSize="large" />
        </div>
      </TopLabel>
      <ProfileContainer>
        {me && <ProfileImage src={me.image_url} size="medium" />}
        <UserInfo>
          <h1>{me?.nickname}</h1>
          <p>
            {me?.campus} • {me?.country}
          </p>
        </UserInfo>
      </ProfileContainer>
      <ContentContainer>
        <textarea placeholder="What do you want to talk about?" />
      </ContentContainer>
      <ButtonContainer>
        <ImageOutlinedIcon sx={{ fontSize: '3.5rem' }} />
        <StyledPostButton type="button" size="medium">
          Post
        </StyledPostButton>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 50rem;
  height: 40rem;
  background-color: #242526;
  border-radius: 1rem;
  margin: 2rem;
`;

const TopLabel = styled.div`
  width: 100%;
  height: 15%;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  p {
    color: ${({ theme }) => theme.fontColor.titleColor};
    font-size: 2.5rem;
    font-weight: 800;
  }
  svg {
    color: ${({ theme }) => theme.grayColor};
  }
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 22%;
  display: flex;
  padding: 2rem;
`;

const UserInfo = styled.div`
  height: 100%;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    color: ${({ theme }) => theme.fontColor.titleColor};
    font-size: 1.7rem;
    margin-bottom: 0.7rem;
  }
  p {
    color: ${({ theme }) => theme.grayColor};
    font-size: 1.2rem;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 50%;
  textarea {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding: 0 2rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.fontColor.contentColor};
    background-color: transparent;
    resize: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  svg {
    color: ${({ theme }) => theme.grayColor};
  }
`;

const StyledPostButton = styled(Button)`
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 1.5rem;
`;
