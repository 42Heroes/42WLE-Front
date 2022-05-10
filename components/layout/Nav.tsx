import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import styled from 'styled-components';

export default function Nav() {
  return <Container></Container>;
}

const Container = styled.nav`
  /* background-color: #ff9999; */
  border-right: 1px solid ${({ theme }) => theme.grayColor};
`;
