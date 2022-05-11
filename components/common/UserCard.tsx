import { UserCardProps } from '../../interfaces/user_interfaces';
import styled from 'styled-components';
import Image from 'next/image';
let userCardProps: UserCardProps;
export default function UserCard(userCardData: UserCardProps) {
  return (
    <Container>
      <Userimg>
        <Image src="/" width={11} height={11} />
      </Userimg>
      <Userinfo>
        <Nickname>{userCardData.nickname}</Nickname>
        <Languages>
          <LearnNative>
            <ContentsText>Learning</ContentsText>
            <ContentsImg>
              {userCardData.l_language.map((item) => (
                <Image
                  width={23}
                  height={14}
                  alt={item.language}
                  key={item.flag}
                  src={item.flag}
                />
              ))}
            </ContentsImg>
          </LearnNative>
          <LearnNative>
            <ContentsText>Native in</ContentsText>
            <ContentsImg>
              {userCardData.n_language.map((item) => (
                <Image
                  width={23}
                  height={14}
                  alt={item.language}
                  key={item.flag}
                  src={item.flag}
                />
              ))}
            </ContentsImg>
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
  border-radius: 0.5rem;
  padding: 2rem 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Userimg = styled.div``;

const Userinfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${({ theme }) => theme.fontColor.titleColor};
`;

const Nickname = styled.div`
  font-size: ${({ theme }) => theme.font.subTitleBold};
`;

const Languages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: center;
`;

const LearnNative = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const ContentsText = styled.div`
  margin-right: 2rem;
`;

const ContentsImg = styled.div`
  display: flex;
  margin-left: 1rem;
  :nth-child() {
    width: 4.3rem;
    height: 2.4rem;
    background-color: ${({ theme }) => theme.grayColor};
    border-radius: 3rem;
  }
`;
