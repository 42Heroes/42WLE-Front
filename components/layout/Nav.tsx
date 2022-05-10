import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import styled from 'styled-components';

export default function Nav() {
  return (
    <Container>
      <UpperNav>
        <IconContainer>
          <PersonAddAltOutlinedIcon sx={{ fontSize: 25 }} />
        </IconContainer>
        <IconContainer>
          <ChatRoundedIcon sx={{ fontSize: 25 }} />
        </IconContainer>
        <IconContainer>
          <LibraryBooksRoundedIcon sx={{ fontSize: 25 }} />
        </IconContainer>
      </UpperNav>
      <LowerNav>
        <IconContainer>
          <AccountCircleOutlinedIcon sx={{ fontSize: 25 }} />
        </IconContainer>
        <IconContainer>
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

const IconContainer = styled.div`
  color: ${({ theme }) => theme.fontColor.contentColor};
  margin-top: 3rem;
  padding: 1rem 1.5rem;
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
