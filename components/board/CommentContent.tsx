import styled from 'styled-components';
import { Comment, Post } from '../../interfaces/board.interface';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import ProfileImage from '../common/ProfileImage';
import useMe from '../../hooks/useMe';
import { useCallback, useRef, useState } from 'react';
import { ConfirmModal } from '../common/Modal';
import { useMutation, useQueryClient } from 'react-query';
import { deleteComment, updateComment } from '../../library/api/board';
import useInput from '../../hooks/useInput';
import showCreatedAt from '../../library/showCreatedAt';
import OutsideClickHandler from 'react-outside-click-handler';
import useToggle from '../../hooks/useToggle';

interface Props {
  postData: Post;
  commentData: Comment;
}

export default function CommentContent({ postData, commentData }: Props) {
  const { data: me } = useMe();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditInputOpen, setIsEditInputOpen] = useState(false);
  const [value, onChangeInputText, setValue] = useInput(commentData.content);
  const SendBtnColor = value.length ? '#8083FF' : '#727272';
  const commentCreatedAt = showCreatedAt(commentData.createdAt);
  const ButtonBoxRef = useRef<HTMLDivElement>(null);
  const MoreButtonRef = useRef<HTMLDivElement>(null);
  const [isBtnBoxOpen, toggleBtnBox] = useToggle(false);

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

  const cancelEdit = () => {
    setIsEditInputOpen(false);
    setValue(commentData.content);
  }

  const queryClient = useQueryClient();
  const { mutate: deleteCommentMutate } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['board']);
    },
    onError: (error) => console.log(error),
  });

  const { mutate: updateCommentMutate, isLoading: isUpdateCommentLoading } =
    useMutation(updateComment, {
      onSuccess: () => {
        queryClient.invalidateQueries(['board']);
        setIsEditInputOpen(false);
      },
      onError: (error) => console.log(error),
    });

  const toggleDeleteModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.defaultPrevented) {
      return;
    }
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDeleteButtonClick = () => {
    const payload = {
      commentId: commentData._id,
      boardId: postData._id,
    };
    deleteCommentMutate(payload);
    setIsDeleteModalOpen(false);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      postUpdatedComment();
    }
  };

  const postUpdatedComment = () => {
    if (!value || isUpdateCommentLoading) {
      return;
    }
    const payload = {
      boardId: postData._id,
      content: value,
      commentId: commentData._id,
    };
    updateCommentMutate(payload);
  };
  return (
    <Container key={commentData._id}>
      <ProfileImageWrapper>
        <ProfileImage src={commentData.author.image_url} size="small" />
      </ProfileImageWrapper>
      {!isEditInputOpen && (
        <CommentContainer>
          <CommentWrapper>
            <CommentBox>
              <AuthorInfo>
                <p>{commentData.author.nickname}</p>
                <span>
                  {commentData.author.campus} • {commentData.author.country}
                </span>
              </AuthorInfo>
              <h1>{commentData.content}</h1>
            </CommentBox>
            <ButtonTimeContainer>
              <ButtonWrapper>Like</ButtonWrapper>
              <ButtonWrapper>Reply</ButtonWrapper>
              <TimeWrapper>{commentCreatedAt}</TimeWrapper>
            </ButtonTimeContainer>
          </CommentWrapper>
          {me?._id === commentData.author._id && (
            <MoreButtonContainer
              ref={MoreButtonRef}
              onClick={() => toggleBtnBox()}
            >
              <MoreHorizIcon sx={{ fontSize: 17 }} />
            </MoreButtonContainer>
          )}
        </CommentContainer>
      )}

      {isBtnBoxOpen && (
        <OutsideClickHandler onOutsideClick={handleOutsideClick}>
          <ToggleBtnBox ref={ButtonBoxRef}>
            <BtnBox
              onClick={() => {
                setIsEditInputOpen(true);
                toggleBtnBox();
              }}
            >
              <EditRoundedIcon sx={{ fontSize: 13 }} />
              <p>Edit</p>
            </BtnBox>

            <BtnBox
              onClick={() => {
                setIsDeleteModalOpen(true);
                toggleBtnBox();
              }}
            >
              <DeleteRoundedIcon sx={{ fontSize: 13 }} />
              <p>Delete</p>
            </BtnBox>
          </ToggleBtnBox>
        </OutsideClickHandler>
      )}
      {isDeleteModalOpen && (
        <ConfirmModal
          toggleModal={toggleDeleteModal}
          mainText="Are you sure you want to delete this comment?"
          buttonText="Delete"
          handleButtonClick={handleDeleteButtonClick}
          targetId={commentData._id}
        />
      )}
      {isEditInputOpen && (
        <WriteCommentBox disabled={!value}>
          <input
            placeholder="Write a comment"
            value={value}
            onChange={onChangeInputText}
            onKeyDown={handleInputKeyDown}
          />
          <CancelIcon id='cancelBtn' onClick={() => cancelEdit()}/>
          <SendRoundedIcon
              id='sendBtn'
            sx={{ color: SendBtnColor, fontSize: 23 }}
            onClick={postUpdatedComment}
          />
        </WriteCommentBox>
      )}
    </Container>
  );
}

const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  position: relative;
  svg {
    cursor: pointer;
    margin-left: 0.5rem;
  }
`;

const ProfileImageWrapper = styled.div`
  min-width: 4rem;
`;

const CommentContainer = styled.div`
  display: flex;
`;

const CommentWrapper = styled.div``;

const CommentBox = styled.div`
  background-color: #3a3b3c;
  margin-left: 1rem;
  border-radius: 1rem;
  padding: 0.5rem 1.5rem;
  line-height: 1.5;
  p {
    color: ${({ theme }) => theme.fontColor.titleColor};
    font-size: 1.3rem;
    font-weight: bold;
  }
  span {
    margin-left: 1rem;
    color: ${({ theme }) => theme.fontColor.contentColor};
    font-size: 1rem;
  }
  h1 {
    margin-top: 0.7rem;
    color: ${({ theme }) => theme.fontColor.titleColor};
    font-size: 1.3rem;
    font-weight: 400;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonTimeContainer = styled.div`
  display: flex;
  font-size: 1.1rem;
  padding: 0.5rem 1.5rem;
`;

const ButtonWrapper = styled.div`
  margin-right: 1.1rem;
  color: ${({ theme }) => theme.fontColor.contentColor};
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.fontColor.titleColor};
    transform: scale(1.05);
  }
`;

const TimeWrapper = styled.div`
  color: ${({ theme }) => theme.fontColor.commentColor};
`;

const ToggleBtnBox = styled.div`
  width: 9rem;
  height: 5rem;
  border: 1px solid ${({ theme }) => theme.grayColor};
  border-radius: 1rem;
  margin-left: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  height: 3.3rem;
  padding: 0 0.8rem;
  overflow: hidden;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.fontColor.contentColor};
  svg {
    margin-right: 0.8rem;
  }
  p {
    font-size: 1rem;
  }
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.grayColor};
  }
`;

const WriteCommentBox = styled.div<{ disabled: boolean }>`
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
  #cancelBtn {
    border-radius: 50%;
    background-color: #727272;
    color: #242526;
    cursor: pointer;
    margin-right: 0.5rem;
  }
  #sendBtn {
    &:last-child {
      transform: rotateZ(-45deg);
      margin-bottom: 0.5rem;
    }
    ${({ disabled }) =>
      !disabled &&
      `
    cursor: pointer;
  `}
  }
`;

const MoreButtonContainer = styled.div`
  svg {
    color: ${({ theme }) => theme.fontColor.contentColor};
    cursor: pointer;
  }
`;
