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
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import { useCallback, useRef, useState } from 'react';
import { ConfirmModal, EditPostModal } from '../common/Modal';
import { Post } from '../../interfaces/board.interface';
import useMe from '../../hooks/useMe';
import CommentsList from './CommentList';
import { useMutation, useQueryClient } from 'react-query';
import { deletePost, likePost } from '../../library/api/board';
import PostImage from './PostImage';
import OutsideClickHandler from 'react-outside-click-handler';
import useToggle from '../../hooks/useToggle';
import showCreatedAt from '../../library/showCreatedAt';

interface Props {
  postData: Post;
}

export default function PostCard({ postData }: Props) {
  const author = postData.author;
  const { data: me } = useMe();
  const createdAt = showCreatedAt(postData.createdAt);
  const [isBtnBoxOpen, toggleBtnBox] = useToggle(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const ButtonBoxRef = useRef<HTMLDivElement>(null);
  const MoreButtonRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (!ButtonBoxRef.current || !MoreButtonRef.current) return;
      if (
        ButtonBoxRef.current.contains(e.target as any) ||
        MoreButtonRef.current.contains(e.target as any)
      )
        return;
      toggleBtnBox();
    },
    [toggleBtnBox],
  );

  const toggleDeleteModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented) {
      return;
    }
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const toggleEditModal = (
    e: React.MouseEvent<HTMLDivElement | SVGSVGElement>,
  ) => {
    if (e.currentTarget !== e.target) {
      return;
    }
    setIsEditModalOpen(!isEditModalOpen);
  };

  const queryClient = useQueryClient();

  const { mutate: likePostMutate } = useMutation(likePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['board']);
    },
    onError: (error) => console.log(error),
  });

  const { mutate: deletePostMutate } = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['board']);
    },
    onError: (error) => console.log(error),
  });

  const handleLikeButtonClick = () => {
    likePostMutate(postData._id);
  };

  const handleDeleteButtonClick = () => {
    deletePostMutate(postData._id);
  };

  return (
    <div>
      <Container isCommentsOpen={isCommentsOpen}>
        <ProfileContainer>
          <UserInfoContainer>
            {author && <ProfileImage src={author.image_url} size="medium" />}
            <UserInfo>
              <h1>{author?.nickname}</h1>
              <p>{createdAt}</p>
            </UserInfo>
          </UserInfoContainer>
          <MoreButtonContainer
            ref={MoreButtonRef}
            onClick={() => toggleBtnBox()}
          >
            <MoreHorizIcon sx={{ fontSize: 30 }} />
          </MoreButtonContainer>
        </ProfileContainer>
        {isBtnBoxOpen && (
          <OutsideClickHandler onOutsideClick={handleOutsideClick}>
            <ToggleBtnBox ref={ButtonBoxRef}>
              <BtnBox>
                <BookmarkBorderRoundedIcon /> <p>Save post</p>
              </BtnBox>
              {me?._id === author._id && (
                <div>
                  <div
                    onClick={() => {
                      setIsEditModalOpen(true);
                      toggleBtnBox();
                    }}
                  >
                    <BtnBox>
                      <EditRoundedIcon />
                      <p>Edit post</p>
                    </BtnBox>
                  </div>
                  <div
                    onClick={() => {
                      {
                        setIsDeleteModalOpen(true);
                        toggleBtnBox();
                      }
                    }}
                  >
                    <BtnBox>
                      <DeleteRoundedIcon />
                      <p>Delete post</p>
                    </BtnBox>
                  </div>
                </div>
              )}
            </ToggleBtnBox>
          </OutsideClickHandler>
        )}
        {isDeleteModalOpen && (
          <ConfirmModal
            toggleModal={toggleDeleteModal}
            mainText="Are you sure you want to delete this post?"
            buttonText="Delete"
            handleButtonClick={handleDeleteButtonClick}
            targetId={postData._id}
          />
        )}
        <ContentContainer>
          {postData.contents.text}
          {postData.contents.img && (
            <ImageContainer>
              {postData.contents.img.map((image, i) => (
                <PostImage imgUrl={image} key={i} />
              ))}
            </ImageContainer>
          )}
        </ContentContainer>

        <LikeCommentCountContainer>
          <RecommendIcon sx={{ fontSize: 20 }} /> <p>{postData.likes.length}</p>
          <ArticleRoundedIcon sx={{ fontSize: 20 }} />
          <p>{postData.comments.length}</p>
        </LikeCommentCountContainer>

        <BottomButtonContainer>
          <div onClick={handleLikeButtonClick}>
            <BottomButtonBox>
              <ThumbUpAltOutlinedIcon sx={{ fontSize: 20 }} /> Like
            </BottomButtonBox>
          </div>
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
      {isCommentsOpen && <CommentsList postData={postData} />}
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
  align-items: center;
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
    margin-bottom: 0.8rem;
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
  background-color: inherit;
  width: 15rem;
  border: 1px solid ${({ theme }) => theme.grayColor};
  border-radius: 1rem;
  position: absolute;
  left: 48rem;
  top: 6rem;
  color: ${({ theme }) => theme.fontColor.titleColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
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

const ImageContainer = styled.div`
  display: flex;
  margin-top: 3rem;
`;

const LikeCommentCountContainer = styled.div`
  height: 5rem;
  padding: 2.5rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.fontColor.contentColor};
  svg {
    margin-right: 0.5rem;
  }
  p {
    margin-right: 1.5rem;
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
