import { User } from '../../interfaces/user.interface';
import styled from 'styled-components';
import Image from 'next/image';
import { getFlagImage } from '../../library/utils';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

interface Props {
  userCardData: User;
  me?: User;
}

export default function UserCard({ userCardData, me }: Props) {
  const handleLikeButtonClick = () => {
    if (!me) {
      return;
    }
    // TODO : API 연결
  };

  return (
    <Container>
      <UserImageContainer>
        <Image
          src={userCardData.image_url}
          objectFit="cover"
          className="user_img"
          width={117}
          height={117}
          alt={`${userCardData.nickname}'s image cannot be loaded`}
        />
        <LikeButton onClick={handleLikeButtonClick}>
          {me?.liked_users.some(
            (user) => user.nickname === userCardData.nickname,
          ) ? (
            <FavoriteRoundedIcon sx={{ fontSize: 28 }} />
          ) : (
            <FavoriteBorderRoundedIcon sx={{ fontSize: 28 }} />
          )}
        </LikeButton>
      </UserImageContainer>
      <UserInfo>
        <Nickname>{userCardData.nickname}</Nickname>
        <Languages>
          <LearnNative>
            <ContentsText>Learning</ContentsText>
            {userCardData.l_language?.map((item) => (
              <ContentsImg key={item.name}>
                <Image
                  width={23}
                  height={14}
                  alt={item.name}
                  src={getFlagImage(item.name)}
                />
              </ContentsImg>
            ))}
          </LearnNative>
          <LearnNative>
            <ContentsText>Native in</ContentsText>
            {userCardData.n_language?.map((item) => (
              <ContentsImg key={item.name}>
                <Image
                  width={23}
                  height={14}
                  alt={item.name}
                  src={getFlagImage(item.name)}
                />
              </ContentsImg>
            ))}
          </LearnNative>
        </Languages>
      </UserInfo>
    </Container>
  );
}

const Container = styled.div`
  width: 39rem;
  height: 17rem;
  border: 0.1rem solid;
  border-radius: 3rem;
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const UserImageContainer = styled.div`
  position: relative;
  display: flex;
  width: 11.7rem;
  height: 11.7rem;
  .user_img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

const LikeButton = styled.div`
  color: ${({ theme }) => theme.likeIcon};
  position: absolute;
  left: 75%;
  top: 80%;
  cursor: pointer;
`;

const UserInfo = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.fontColor.titleColor};
  padding: 1rem 0;
`;

const Nickname = styled.div`
  font-size: ${({ theme }) => theme.font.subTitleRegular};
  font-weight: 600;
  height: 50%;
`;

const Languages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
  height: 50%;
`;

const LearnNative = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;
const ContentsText = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 2rem;
`;

const ContentsImg = styled.div`
  display: flex;
  align-items: center;
  background-color: #242526;
  width: 4.3rem;
  height: 2.4rem;
  border-radius: 5rem;
  margin: 0rem 0.2rem;
  :nth-child(n) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
