import { User } from '../../interfaces/user.interface';
import styled from 'styled-components';
import Image from 'next/image';
import { getFlagImage } from '../../library/utils';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useMutation, useQueryClient } from 'react-query';
import { addLikeUser, deleteLikeUser } from '../../library/api';

interface Props {
  userCardData: User;
  me: User | null | undefined;
}

export default function UserCard({ userCardData, me }: Props) {
  const queryClient = useQueryClient();
  const { mutate: mutateAddLikeUser } = useMutation(addLikeUser, {
    onSuccess: () => queryClient.invalidateQueries(['user', 'me']),
  });
  const { mutate: mutateDeleteLikeUser } = useMutation(deleteLikeUser, {
    onSuccess: () => queryClient.invalidateQueries(['user', 'me']),
  });

  const isLikedUser =
    me?.liked_users.some((user) => user._id === userCardData._id) ?? false;

  const handleLikeButtonClick: React.MouseEventHandler<HTMLDivElement> = (
    e,
  ) => {
    e.stopPropagation();
    if (isLikedUser) {
      return mutateDeleteLikeUser(userCardData._id);
    }
    mutateAddLikeUser(userCardData._id);
  };

  const isNicknameLong = userCardData.nickname.length > 11;

  return (
    <Container>
      <UserImageContainer>
        <Image
          src={userCardData.image_url}
          objectFit="cover"
          className="user_img"
          width={117}
          height={117}
          alt={userCardData.nickname}
        />
        <LikeButton liked={isLikedUser} onClick={handleLikeButtonClick}>
          {isLikedUser ? (
            <FavoriteRoundedIcon sx={{ fontSize: 28 }} />
          ) : (
            <FavoriteBorderOutlinedIcon sx={{ fontSize: 28 }} />
          )}
        </LikeButton>
      </UserImageContainer>
      <UserInfo>
        <Nickname isNicknameLong={isNicknameLong}>
          {userCardData.nickname}
        </Nickname>
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
  border: 0.1rem solid ${({ theme }) => theme.grayColor};
  border-radius: 3rem;
  padding: 2rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: transform 0.3s;

  :hover {
    transform: scale(1.05);
    background-color: #262626;
  }
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

const LikeButton = styled.div<{ liked: boolean }>`
  color: ${({ theme }) => theme.likeIcon};
  position: absolute;
  left: 75%;
  top: 80%;
  cursor: pointer;
`;

const UserInfo = styled.div`
  height: 100%;
  width: 57%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.fontColor.titleColor};
  padding: 1rem 0;
`;

const Nickname = styled.div<{ isNicknameLong: boolean }>`
  font-size: ${({ isNicknameLong }) => (isNicknameLong ? '2.3rem' : '3.3rem')};
  line-height: ${({ isNicknameLong }) => (isNicknameLong ? '1.2' : '')};
  font-weight: 600;
  height: 50%;
  word-break: break-all;
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
  width: 7rem;
  display: flex;
  align-items: center;
  margin-right: 0.1rem;
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
