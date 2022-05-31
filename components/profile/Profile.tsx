import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import media from '../../styles/media';
import Button from '../common/Button';
import FTLogo from '../../public/assets/icons/42Logo.svg';
import Language from '../common/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { User } from '../../interfaces/user.interface';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  activeChatRoomIdState,
  chatState,
  userState,
} from '../../recoil/atoms';
import socket from '../../library/socket';
import { SocketEvents } from '../../library/socket.events.enum';
import { useRouter } from 'next/router';

interface Props {
  user: User;
  className?: string;
}

export default function Profile({ user, className }: Props) {
  const router = useRouter();
  const me = useRecoilValue(userState);
  const setChatData = useSetRecoilState(chatState);
  const setActiveChatRoomId = useSetRecoilState(activeChatRoomIdState);
  const isUserModal = user._id !== me?._id;

  const isLikedUser = me?.liked_users.some((liked) => liked._id === user?._id);

  const handleLikeButtonClick = () => {
    // TODO: mutation
  };

  /*
    1. ReqCreateRoom 요청 보내기 (target_id) <- 서버측에서 확인
    2. 없다면 ChatData 에 추가, 있다면 패스
    3. activeChatRoomId 상태를 방금 받은 roomId 로 변경
    4. /chat 페이지로 라우트 이동
  */
  const handleMessageButtonClick = () => {
    const payload = {
      target_id: user._id,
    };
    socket.emit(SocketEvents.ReqCreateRoom, payload, (res) => {
      if (res.status === 'ok') {
        setChatData((prev) => {
          if (prev.some((chatRoom) => chatRoom._id === res.chatRoom._id)) {
            return prev;
          }
          return [...prev, res.chatRoom];
        });
        setActiveChatRoomId(res.chatRoom._id);
      }
    });
    router.push('/chat');
  };

  return (
    <Container className={className}>
      <UserInfo>
        <UserImageWrapper>
          <Image
            className="profile-image"
            src={user.image_url}
            alt="Profile Image"
            objectFit="cover"
            width={250}
            height={250}
          />
        </UserImageWrapper>
        <UserInfoContainer>
          <h2>{user.nickname}</h2>
          <LanguageContainer>
            <div>
              <h3>Native in</h3>
              <LanguageList>
                {user.n_language.map((language) => (
                  <Language key={language.name} language={language} />
                ))}
              </LanguageList>
            </div>
            <div>
              <h3>Learning</h3>
              <LanguageList>
                {user.l_language.map((language) => (
                  <Language key={language.name} language={language} />
                ))}
              </LanguageList>
            </div>
          </LanguageContainer>
          {user.hashtags.length ? (
            <HashTags>
              <h3>Hashtags</h3>
              <div>
                {user.hashtags.map((hashTag) => (
                  <HashTag key={hashTag}>#{hashTag}</HashTag>
                ))}
              </div>
            </HashTags>
          ) : null}
        </UserInfoContainer>
      </UserInfo>
      <SocialInfoContainer>
        <SocialInfo>
          <FTLogo />
          {user.intra_id}
        </SocialInfo>
        <SocialInfo>
          <LocationOnIcon sx={{ fontSize: 25 }} />
          {user.country}
        </SocialInfo>
        <SocialInfo>
          <GitHubIcon sx={{ fontSize: 25 }} />
          <Link href={`https://github.com/${user.github_id}`}>
            <a target="_blank">https://github.com/{user.github_id}</a>
          </Link>
        </SocialInfo>
      </SocialInfoContainer>
      <Introduction>{user.introduction}</Introduction>
      {isUserModal && (
        <ButtonContainer>
          <MessageButton
            type="button"
            size="medium"
            color="gray6"
            outline
            onClick={handleMessageButtonClick}
          >
            <EmailRoundedIcon sx={{ fontSize: 25 }} />
            Message
          </MessageButton>
          <LikeButton type="button" size="medium" color="gray6" outline>
            {isLikedUser ? (
              <FavoriteRoundedIcon sx={{ fontSize: 22 }} />
            ) : (
              <FavoriteBorderRoundedIcon sx={{ fontSize: 22 }} />
            )}
          </LikeButton>
        </ButtonContainer>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 75rem;
  padding: 5rem;
  border: 1px solid ${({ theme }) => theme.grayColor};
  border-radius: 1rem;
  color: ${({ theme }) => theme.fontColor.contentColor};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
  gap: 2rem;
  ${media.small} {
    justify-content: space-between;
    flex-direction: row;
    gap: 6rem;
  }
`;

const UserImageWrapper = styled.div`
  width: 15rem;
  ${media.small} {
    width: auto;
  }
  .profile-image {
    border-radius: 50rem;
  }
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: 26rem;
  color: ${({ theme }) => theme.grayColor};
  ${media.small} {
    align-items: flex-start;
  }
  h2 {
    ${({ theme }) => theme.font.subTitleRegular};
    line-height: 4rem;
    margin-bottom: 2rem;
  }
  &:not(h2) {
    font-family: JetBrainsMono, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    font-size: 1rem;
  }
  h2,
  h3 {
    color: ${({ theme }) => theme.fontColor.titleColor};
    text-align: center;
    ${media.small} {
      text-align: left;
    }
  }
`;

const LanguageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  h3 {
    margin-bottom: 0.5rem;
  }
  ${media.small} {
    margin-bottom: 2rem;
    gap: 1rem;
  }
`;

const LanguageList = styled.ul`
  display: flex;
  li + li {
    margin-left: 0.5rem;
  }
`;

const SocialInfoContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
  color: ${({ theme }) => theme.grayColor};
`;

const SocialInfo = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  svg {
    width: 2.3rem;
    fill: white;
  }
`;

const HashTags = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    margin-bottom: 0.8rem;
  }
`;

const HashTag = styled.span`
  font-weight: bold;
  border-radius: 3rem;
  padding: 0.3rem 0.8rem;
  border: 1px solid ${({ theme }) => `${theme.grayColor}`};
  & + & {
    margin-left: 0.5rem;
  }
`;

const Introduction = styled.p`
  font-size: 1.4rem;
  line-height: 1.8rem;
`;

const ButtonContainer = styled.div`
  margin-top: 3rem;
  display: flex;
`;

const MessageButton = styled(Button)`
  color: ${({ theme }) => theme.grayColor};
  width: 100%;
  border-radius: 1rem;
  justify-content: center;
  svg {
    margin-right: 1rem;
  }
`;

const LikeButton = styled(Button)`
  color: ${({ theme }) => theme.grayColor};
  border-radius: 1rem;
  svg {
    fill: #ff9999;
  }
`;
