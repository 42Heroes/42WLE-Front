import styled from 'styled-components';
import useMe from '../../hooks/useMe';
import ProfileImage from '../common/ProfileImage';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RecommendIcon from '@mui/icons-material/Recommend';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';

export default function PostCard() {
  const { data: me, isError, isLoading } = useMe();
  if (isError) return <div>Error</div>;
  if (isLoading) return <div>Loading</div>;
  return (
    <Container>
      <ProfileContainer>
        <UserInfoContainer>
          {me && <ProfileImage src={me.image_url} size="small" />}
          <UserInfo>
            <h1>{me?.nickname}</h1>
            <p>3 hours ago</p>
          </UserInfo>
        </UserInfoContainer>
        <MoreButtonContainer>
          <MoreHorizIcon sx={{ fontSize: 30 }} />
        </MoreButtonContainer>
      </ProfileContainer>
      <ContentContainer>Hello world!</ContentContainer>
      <LikeCountContainer>
        <RecommendIcon sx={{ fontSize: 20 }} /> 1.3K
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
