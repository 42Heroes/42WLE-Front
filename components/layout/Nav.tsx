import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';
import { chatState, loginState, unreadMessageState } from '../../recoil/atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { logoutUser } from '../../library/api';

interface Prop {
  isActive: boolean;
}

export default function Nav() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const setChatData = useSetRecoilState(chatState);
  const unreadMessages = useRecoilValue(unreadMessageState);

  const handleLogoutButtonClick = async () => {
    await logoutUser();
    queryClient.removeQueries(['user', 'me']);
    router.replace('/find');
    setChatData([]);
    setIsLoggedIn(false);
  };

  const handleLoginButtonClick = () => {
    router.push('/login');
  };

  return (
    <Container>
      <UpperNav>
        <Link href="/find" passHref>
          <IconContainer isActive={router.pathname.includes('/find')}>
            <PersonAddAltOutlinedIcon sx={{ fontSize: 25 }} />
          </IconContainer>
        </Link>
        {isLoggedIn && (
          <Link href="/chat" passHref>
            <IconContainer isActive={router.pathname.includes('/chat')}>
              <ChatRoundedIcon sx={{ fontSize: 25 }} />
              {unreadMessages.length > 0 && <ChatNotification />}
            </IconContainer>
          </Link>
        )}
        <Link href="/board" passHref>
          <IconContainer isActive={router.pathname.includes('/board')}>
            <LibraryBooksRoundedIcon sx={{ fontSize: 25 }} />
          </IconContainer>
        </Link>
      </UpperNav>
      <LowerNav>
        {isLoggedIn && (
          <Link href="/mypage" passHref>
            <IconContainer isActive={router.pathname.includes('/mypage')}>
              <AccountCircleOutlinedIcon sx={{ fontSize: 25 }} />
            </IconContainer>
          </Link>
        )}
        {isLoggedIn ? (
          <IconContainer
            isActive={false}
            as="button"
            onClick={handleLogoutButtonClick}
          >
            <LogoutIcon sx={{ fontSize: 25 }} />
          </IconContainer>
        ) : (
          <IconContainer
            isActive={false}
            as="button"
            onClick={handleLoginButtonClick}
          >
            <LoginIcon sx={{ fontSize: 25 }} />
          </IconContainer>
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
  padding: 1rem 1.6rem;
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
  justify-content: center;
  align-items: center;
`;

const ChatNotification = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.newChat};
  border-radius: 50%;
  position: absolute;
  right: 2rem;
`;
