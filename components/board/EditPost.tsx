import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import useMe from '../../hooks/useMe';
import ProfileImage from '../common/ProfileImage';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import Button from '../common/Button';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Router from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { createPost, updatePost } from '../../library/api/board';
import { Post } from '../../interfaces/board.interface';

interface Props {
  prevContent: Post;
  toggleModal: (event: React.MouseEvent<HTMLDivElement>) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function EditPost({
  prevContent,
  toggleModal,
  setIsModalOpen,
}: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['board']);
      Router.reload();
    },
    onError: (error) => console.log(error),
  });

  const [content, setContent] = useState(prevContent.contents.text);
  const handleContentChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setContent(value);
  };

  const { data: me, isError, isLoading } = useMe();
  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading</div>;

  const handleEditButtonClick = () => {
    const payload = {
      boardId: prevContent._id,
      contents: { text: content, img: [] },
    };
    mutate(payload);
  };

  return (
    <Container>
      <TopLabel>
        <p>Edit</p>
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
        <textarea onChange={handleContentChange} value={content} />
      </ContentContainer>
      <ButtonContainer>
        <ImageOutlinedIcon sx={{ fontSize: '3.5rem' }} />
        <StyledPostButton
          type="button"
          size="medium"
          onClick={handleEditButtonClick}
        >
          Edit
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
    cursor: pointer;
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
