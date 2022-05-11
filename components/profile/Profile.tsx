import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import media from '../../styles/media';
import Button from '../common/Button';
import FTLogo from '../../public/assets/icons/42Logo.svg';
import Language from '../common/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GitHubIcon from '@mui/icons-material/GitHub';

interface LanguageInfo {
  language: string;
  flag: string;
}

interface Props {
  userData: {
    nickname: string;
    intra_id: string;
    image_url: string;
    hashtags: string[];
    country: string;
    github_id: string;
    n_language: LanguageInfo[];
    l_language: LanguageInfo[];
    introduction: string;
  };
  className?: string;
}

export default function Profile({ userData, className }: Props) {
  const router = useRouter();
  const isUserModal = router.asPath !== '/register/preview';
  // TODO: isModal 로 변경 or preview 페이지나 myProfile 페이지 예외처리 필요
  return (
    <Container className={className}>
      <UserInfo>
        <UserImageWrapper>
          <Image
            className="profile-image"
            src={userData.image_url}
            alt="Profile Image"
            objectFit="cover"
            width={250}
            height={250}
          />
        </UserImageWrapper>
        <UserInfoContainer>
          <h2>{userData.nickname}</h2>
          <LanguageContainer>
            <div>
              <h3>Native in</h3>
              <LanguageList>
                {userData.n_language.map((language) => (
                  <Language key={language.language} language={language} />
                ))}
              </LanguageList>
            </div>
            <div>
              <h3>Learning</h3>
              <LanguageList>
                {userData.l_language.map((language) => (
                  <Language key={language.language} language={language} />
                ))}
              </LanguageList>
            </div>
          </LanguageContainer>
          {userData.hashtags.length ? (
            <HashTags>
              <h3>Hashtags</h3>
              <div>
                {userData.hashtags.map((hashTag) => (
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
          {userData.intra_id}
        </SocialInfo>
        <SocialInfo>
          <LocationOnIcon sx={{ fontSize: 25 }} />
          {userData.country}
        </SocialInfo>
        <SocialInfo>
          <GitHubIcon sx={{ fontSize: 25 }} />
          <Link href={`https://github.com/${userData.github_id}`}>
            <a target="_blank">https://github.com/{userData.github_id}</a>
          </Link>
        </SocialInfo>
      </SocialInfoContainer>
      <Introduction>{userData.introduction}</Introduction>
      {isUserModal && (
        <ButtonContainer>
          <MessageButton type="button" size="medium" color="gray6" outline>
            Message
          </MessageButton>
          <LikeButton type="button" size="medium" color="gray6" outline>
            gkxm
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
`;

const LikeButton = styled(Button)`
  color: ${({ theme }) => theme.grayColor};
  border-radius: 1rem;
`;
