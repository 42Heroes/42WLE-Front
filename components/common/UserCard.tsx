import { User } from '../../interfaces/user.interface';
import styled from 'styled-components';
import Image from 'next/image';
import { getFlagImage } from '../../library/utils';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

interface Props {
  userCardData: User;
  myData: User;
}

export default function UserCard({ userCardData, myData }: Props) {
  // const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <Container>
      <Userimg>
        <Image
          src={getFlagImage('korean')}
          objectFit="cover"
          className="userimg"
          width={117}
          height={117}
          alt={UserCard.name}
        />
        <LikeButton
          liked={myData.liked_users.some(
            (user) => user.nickname === userCardData.nickname,
          )}
          onClick={() => {
            myData.liked_users.push(userCardData);
          }}
        >
          <FavoriteRoundedIcon sx={{ fontSize: 28 }} />
        </LikeButton>
      </Userimg>
      <Userinfo>
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
      </Userinfo>
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
`;

const Userimg = styled.div`
  position: relative;
  display: flex;
  width: 11.7rem;
  height: 11.7rem;
  .userimg {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
`;

const LikeButton = styled.div<{ liked: boolean }>`
  color: ${({ theme, liked }) => (liked ? theme.likeIcon : theme.grayColor)};
  position: absolute;
  left: 75%;
  top: 80%;
  cursor: pointer;
`;

const Userinfo = styled.div`
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
