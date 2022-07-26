import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import useMe from '../../hooks/useMe';
import ProfileImage from '../common/ProfileImage';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { createComment } from '../../library/api/board';
import { useMutation, useQueryClient } from 'react-query';
import { Post } from '../../interfaces/board.interface';

interface Props {
  postData: Post;
}

export default function Comments({ postData }: Props) {
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
    if (!value) {
      return;
    }
    if (e.code === 'Enter') {
      const payload = {
        boardId: postData._id,
        content: value,
      };
      mutate(payload);
    }
  };
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
      {postData.comments.map((comment) => {
        const createdAt = new Date(comment.createdAt).toString().slice(4, 21);
        return (
          <CommentContainer key={comment._id}>
            {/* 이후 코멘트 작성자 이미지로 변경 필요 */}
            <ProfileImage src={me.image_url} size="small" />
            <CommentBox>
              <AuthorInfo>
                <p>{me.nickname}</p>
                <span>
                  {me?.campus} • {me?.country}
                </span>
              </AuthorInfo>
              <h1>{comment.content}</h1>
            </CommentBox>
          </CommentContainer>
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

const CommentContainer = styled.div`
  margin-top: 1.8rem;
  display: flex;
`;

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
