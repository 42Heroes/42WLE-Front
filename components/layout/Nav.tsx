import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface Prop {
  isActive: boolean;
}

export default function Nav() {
  const router = useRouter();

  return (
    <Container>
      <UpperNav>
        <Link href="/find" passHref>
          <IconContainer isActive={router.pathname === '/find' ? true : false}>
            <PersonAddAltOutlinedIcon sx={{ fontSize: 25 }} />
          </IconContainer>
        </Link>
        <Link href="/chat" passHref>
          <IconContainer isActive={router.pathname === '/chat' ? true : false}>
            <ChatRoundedIcon sx={{ fontSize: 25 }} />
          </IconContainer>
        </Link>
        <Link href="/board" passHref>
          <IconContainer isActive={router.pathname === '/board' ? true : false}>
            <LibraryBooksRoundedIcon sx={{ fontSize: 25 }} />
          </IconContainer>
        </Link>
      </UpperNav>
      <LowerNav>
        <IconContainer isActive={router.pathname === '/mypage' ? true : false}>
          <AccountCircleOutlinedIcon sx={{ fontSize: 25 }} />
        </IconContainer>
        <IconContainer isActive={false}>
          <ExitToAppOutlinedIcon sx={{ fontSize: 25 }} />
        </IconContainer>
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
  color: ${(props) =>
    props.isActive
      ? ({ theme }) => theme.pointColor
      : ({ theme }) => theme.fontColor.contentColor};
  background-color: ${(props) => (props.isActive ? '#242526' : 'none')};
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
const LowerNav = styled.div``;
