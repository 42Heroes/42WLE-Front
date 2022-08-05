import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import useMe from '../../hooks/useMe';
import ProfileImage from '../common/ProfileImage';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { createComment } from '../../library/api/board';
import { useMutation, useQueryClient } from 'react-query';
import { Post } from '../../interfaces/board.interface';
import Comment from './CommentContent';

interface Props {
  postData: Post;
}

export default function CommentList({ postData }: Props) {
  const { data: me } = useMe();
  const [value, onChangeInputText, setInputText] = useInput();

  const SendBtnColor = value.length ? '#8083FF' : '#727272';
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries(['board']);
      setInputText('');
    },
    onError: (error) => console.log(error),
  });

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      postComment();
    }
  };

  const postComment = () => {
    if (!value || isLoading) {
      return;
    }
    const payload = {
      boardId: postData._id,
      content: value,
    };
    mutate(payload);
  };

  return (
    <Container>
      <WriteCommentContainer>
        {me && <ProfileImage src={me.image_url} size="small" />}
        <WriteCommentBox disabled={!value}>
          <input
            placeholder="Write a comment"
            value={value}
            onChange={onChangeInputText}
            onKeyDown={handleInputKeyDown}
          />
          <SendRoundedIcon
            sx={{ color: SendBtnColor, fontSize: 23 }}
            onClick={postComment}
          />
        </WriteCommentBox>
      </WriteCommentContainer>
      {postData.comments.map((comment) => {
        return (
          <Comment
            key={comment._id}
            postData={postData}
            commentData={comment}
          />
        );
      })}
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

const WriteCommentBox = styled.div<{ disabled: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  background-color: #3a3b3c;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  input {
    word-break: break-all;
    word-wrap: break-word;
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
    ${({ disabled }) =>
      !disabled &&
      `
    cursor: pointer;
  `}
  }
`;
