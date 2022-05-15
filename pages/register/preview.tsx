import { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Title from '../../components/common/Title';
import LoginLayout from '../../components/layout/LoginLayout';
import Profile from '../../components/profile/Profile';
import { useRegister } from '../../hooks/useRegister';
import { User } from '../../interfaces/user.interface';

export default function Preview() {
  const [registerUser] = useRegister();
  const [isMount, setIsMount] = useState(false);

  // TODO: 가회원가입되어 있는 정보와 registerUser 정보 조합하여 아래 Profile 컴포넌트 렌더링 필요 (데이터 요청 후 해당 데이터로 settRegisterUser)

  const handleStartButtonClick = () => {
    // TODO: 버튼 누를시 useQuery mutation 필요 (회원가입 마무리) && 응답 핸들링 필요 (이미 회원가입이 된 유저나 데이터 검증)
  };

  useEffect(() => {
    setIsMount(true);
  }, []);

  return (
    <Container>
      <Title>
        Great! <br />
        Now you are ready to explore 42WLE
      </Title>
      {isMount && <Profile user={registerUser as User} />}
      <StyledButton
        type="button"
        size="medium"
        color="blue"
        onClick={handleStartButtonClick}
      >
        START 42WLE
      </StyledButton>
    </Container>
  );
}

Preview.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.pointColor};
  border-radius: 1rem;
  padding: 0 10rem;
  margin-top: 7rem;
`;
