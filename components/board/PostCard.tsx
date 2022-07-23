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

interface Props {
  postData: object;
}

export default function PostCard({ postData }: Props) {
  // const author = postData.author;
  const [isBtnBoxOpen, setIsBtnBoxOpen] = useState(false);
  return (
    <Container>
      <ProfileContainer>
        <UserInfoContainer>
          {/* {author && <ProfileImage src={author.image_url} size="small" />} */}
          <UserInfo>
            {/* <h1>{author?.nickname}</h1>
            <p>{postData.createdAt}</p> */}
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
          <BtnBox>
            <EditRoundedIcon />
            <p>Edit post</p>
          </BtnBox>
          <BtnBox>
            <DeleteRoundedIcon />
            <p>Delete post</p>
          </BtnBox>
        </ToggleBtnBox>
      )}
      <ContentContainer>{postData.content}</ContentContainer>
      <LikeCountContainer>
        {/* <RecommendIcon sx={{ fontSize: 20 }} /> {postData.likes.length} */}
      </LikeCountContainer>
      <BottomButtonContainer>
        <BottomButtonBox>
          <ThumbUpAltOutlinedIcon sx={{ fontSize: 20 }} /> Like
        </BottomButtonBox>
        <BottomButtonBox>
          <CommentOutlinedIcon sx={{ fontSize: 20 }} /> Comments
        </BottomButtonBox>
        <BottomButtonBox>
          <ReplyRoundedIcon sx={{ fontSize: 20 }} /> Share
        </BottomButtonBox>
      </BottomButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 65rem;
  height: 55rem;
  background-color: #242526;
  margin: 3rem;
  border-radius: 1rem;
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
    font-size: 1.7rem;
    margin-bottom: 0.7rem;
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
  height: 33.3%;
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
`;
