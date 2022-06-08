import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { axiosInstance } from '../../library/api/axios-instance';
import { loginState } from '../../recoil/atoms';
import { useRecoilState } from 'recoil';

interface Prop {
  isActive: boolean;
}

export default function Nav() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);

  const handleLogoutButtonClick = async () => {
    const { status } = await axiosInstance.post('/users/me/logout');
    if (status === 200) {
      axiosInstance.defaults.headers.common['Authorization'] = '';
      queryClient.removeQueries('me');
      router.replace('/find');
      setIsLoggedIn(false);
    }
  };

  return (
    <Container>
      <UpperNav>
        <Link href="/find" passHref>
          <IconContainer isActive={router.pathname.includes('/find')}>
            <PersonAddAltOutlinedIcon sx={{ fontSize: 25 }} />
          </IconContainer>
        </Link>
        <Link href="/chat" passHref>
          <IconContainer isActive={router.pathname.includes('/chat')}>
            <ChatRoundedIcon sx={{ fontSize: 25 }} />
          </IconContainer>
        </Link>
        <Link href="/board" passHref>
          <IconContainer isActive={router.pathname.includes('/board')}>
            <LibraryBooksRoundedIcon sx={{ fontSize: 25 }} />
          </IconContainer>
        </Link>
      </UpperNav>
      <LowerNav>
        <Link href="/mypage" passHref>
          <IconContainer isActive={router.pathname.includes('/mypage')}>
            <AccountCircleOutlinedIcon sx={{ fontSize: 25 }} />
          </IconContainer>
        </Link>
        {isLoggedIn ? (
          <IconContainer
            isActive={false}
            as="button"
            onClick={handleLogoutButtonClick}
          >
            <ExitToAppOutlinedIcon sx={{ fontSize: 25 }} />
          </IconContainer>
        ) : (
          'login'
        )}
      </LowerNav>
    </Container>
  );
}

const Container = styled.nav`
  display: grid;
  grid-template-rows: 2fr 1fr;
  border-right: 1px solid ${({ theme }) => theme.grayColor};
`;

const IconContainer = styled.div<Prop>`
  display: flex;
  justify-content: center;
  color: ${({ isActive, theme }) =>
    isActive ? theme.pointColor : theme.fontColor.contentColor};
  background-color: ${(prop) => (prop.isActive ? '#242526' : 'none')};
  margin-top: 3rem;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  cursor: pointer;
`;

const UpperNav = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  ::before {
    content: '';
    position: absolute;
    height: 0.1rem;
    width: 50%;
    background-color: ${({ theme }) => theme.grayColor};
    bottom: 0;
  }
`;
const LowerNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
