import styled from 'styled-components';
import ProfileImage from '../common/ProfileImage';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RecommendIcon from '@mui/icons-material/Recommend';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useState } from 'react';
import { DeleteConfirmModal, EditPostModal } from '../common/Modal';
import { Post } from '../../interfaces/board.interface';
import useMe from '../../hooks/useMe';
import Comments from './Comments';

interface Props {
  postData: Post;
}

export default function PostCard({ postData }: Props) {
  const author = postData.author;
  const { data: me } = useMe();
  const createdAt = new Date(postData.createdAt).toString().slice(0, 16);
  const [isBtnBoxOpen, setIsBtnBoxOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const toggleDeleteModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented) {
      return;
    }
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const toggleEditModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented) {
      return;
    }
    setIsEditModalOpen(!isEditModalOpen);
  };

  return (
    <div>
      <Container isCommentsOpen={isCommentsOpen}>
        <ProfileContainer>
          <UserInfoContainer>
            {/* {author && <ProfileImage src={author.image_url} size="small" />} */}
            {me && <ProfileImage src={me.image_url} size="medium" />}
            <UserInfo>
              {/* <h1>{author?.nickname}</h1> */}
              <h1>{me?.nickname}</h1>
              <p>{createdAt}</p>
            </UserInfo>
          </UserInfoContainer>
          <MoreButtonContainer onClick={() => setIsBtnBoxOpen(!isBtnBoxOpen)}>
            <MoreHorizIcon sx={{ fontSize: 30 }} />
          </MoreButtonContainer>
        </ProfileContainer>
        {isBtnBoxOpen && (
          <ToggleBtnBox>
            <BtnBox>
              <BookmarkBorderRoundedIcon /> <p>Save post</p>
            </BtnBox>
            <div onClick={() => setIsEditModalOpen(true)}>
              <BtnBox>
                <EditRoundedIcon />
                <p>Edit post</p>
              </BtnBox>
            </div>
            <div
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
            >
              <BtnBox>
                <DeleteRoundedIcon />
                <p>Delete post</p>
              </BtnBox>
            </div>
          </ToggleBtnBox>
        )}
        {isDeleteModalOpen && (
          <DeleteConfirmModal
            postId={postData._id}
            toggleModal={toggleDeleteModal}
          />
        )}
        <ContentContainer>{postData.contents.text}</ContentContainer>
        <LikeCountContainer>
          <RecommendIcon sx={{ fontSize: 20 }} /> {postData.likes.length}
        </LikeCountContainer>
        <BottomButtonContainer>
          <BottomButtonBox>
            <ThumbUpAltOutlinedIcon sx={{ fontSize: 20 }} /> Like
          </BottomButtonBox>
          <div onClick={() => setIsCommentsOpen(!isCommentsOpen)}>
            <BottomButtonBox>
              <CommentOutlinedIcon sx={{ fontSize: 20 }} /> Comments
            </BottomButtonBox>
          </div>
          <BottomButtonBox>
            <ReplyRoundedIcon sx={{ fontSize: 20 }} /> Share
          </BottomButtonBox>
        </BottomButtonContainer>
        {isEditModalOpen && (
          <EditPostModal
            prevContent={postData}
            toggleModal={toggleEditModal}
            setIsModalOpen={setIsEditModalOpen}
          />
        )}
      </Container>
      {isCommentsOpen && <Comments postId={postData._id} />}
    </div>
  );
}

interface IsCommentsOpen {
  isCommentsOpen: boolean;
}

const Container = styled.div<IsCommentsOpen>`
  display: flex;
  flex-direction: column;
  width: 65rem;
  height: 54rem;
  background-color: #242526;
  margin: 3rem 3rem 0 3rem;
  border-radius: ${(props) =>
    props.isCommentsOpen ? '1rem 1rem 0 0' : '1rem'};
  position: relative;
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem;
`;

const UserInfoContainer = styled.div`
  display: flex;
`;

const UserInfo = styled.div`
  height: 100%;
  padding-left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    color: ${({ theme }) => theme.fontColor.titleColor};
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
  p {
    color: ${({ theme }) => theme.grayColor};
    font-size: 1.2rem;
  }
`;

const MoreButtonContainer = styled.div`
  svg {
    color: ${({ theme }) => theme.fontColor.contentColor};
    cursor: pointer;
  }
`;

const ToggleBtnBox = styled.div`
  width: 15rem;
  height: 10rem;
  border: 1px solid ${({ theme }) => theme.grayColor};
  border-radius: 1rem;
  position: absolute;
  left: 48rem;
  top: 6rem;
  color: ${({ theme }) => theme.fontColor.titleColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  height: 3.3rem;
  padding: 0 1.5rem;
  overflow: hidden;
  border-radius: 0.5rem;
  svg {
    margin-right: 0.8rem;
  }
  p {
    font-size: 1.2rem;
  }
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.grayColor};
  }
`;

const ContentContainer = styled.div`
  height: 35rem;
  padding: 1rem 2.5rem;
  color: ${({ theme }) => theme.fontColor.titleColor};
  font-size: 1.5rem;
`;

const LikeCountContainer = styled.div`
  height: 5rem;
  padding: 2.5rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.fontColor.contentColor};
  svg {
    margin-right: 0.5rem;
  }
`;

const BottomButtonContainer = styled.div`
  border-top: 1px solid ${({ theme }) => theme.grayColor};
  color: ${({ theme }) => theme.fontColor.contentColor};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 1;
`;

const BottomButtonBox = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 1rem;
  }
  :hover {
    cursor: pointer;
    transform: scale(1.1);
    color: ${({ theme }) => theme.fontColor.titleColor};
  }
`;
