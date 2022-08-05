import styled from 'styled-components';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useRouter } from 'next/router';
import useMe from '../../hooks/useMe';

interface Props {
  children: React.ReactNode;
}

export default function LoginLayout({ children }: Props) {
  const router = useRouter();

  const { data: me, isLoading } = useMe();

  if (typeof window !== 'undefined' && !isLoading && me?.isRegisterDone) {
    router.push('/find');
  }

  return (
    <Container>
      <UpperNav>
        <span
          onClick={() => {
            router.back();
          }}
        >
          <ArrowBackIosNewRoundedIcon />
        </span>
      </UpperNav>
      {children}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UpperNav = styled.nav`
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 3rem;
  span {
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: #2c2d2e;
    }
  }
  svg {
    font-size: 3rem;
    color: #fff;
  }
`;
