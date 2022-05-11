import { useRouter } from 'next/router';
import styled from 'styled-components';

function getHeaderText(pathname: string) {
  if (pathname.includes('/find')) return 'Find';
  if (pathname.includes('/chat')) return 'Chat';
  if (pathname.includes('/board')) return 'Board';
  if (pathname.includes('/mypage')) return 'My Page';
  if (pathname.includes('/profile-setting')) return 'Profile Setting';
}

export default function Header() {
  const router = useRouter();
  const headerText = getHeaderText(router.pathname);

  return <Container>{headerText}</Container>;
}

const Container = styled.header`
  margin-left: -1px;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
  ${({ theme }) => theme.font.subTitleBold};
  color: ${({ theme }) => theme.fontColor.titleColor};
  display: flex;
  align-items: center;
  padding-left: 3rem;
  white-space: nowrap;
`;
