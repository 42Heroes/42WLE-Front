import { useRouter } from 'next/router';
import { ReactElement, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Title from '../../components/common/Title';
import LoginLayout from '../../components/layout/LoginLayout';
import useInput from '../../hooks/useInput';

export default function Nickname() {
  const router = useRouter();

  const maximumLength = 20;
  const nicknameValidator = useCallback((value: string) => {
    if (value.length > maximumLength) {
      return false;
    }
    return true;
  }, []);

  const [nickname, onChangeNickname, setNickname] = useInput(
    '',
    nicknameValidator,
  );

  const handleClickNextButton = () => {
    if (nickname.length === 0 || nickname.length > 20) {
      return;
    }
    localStorage.setItem('sign_up-nickname', nickname);
    router.push('/register/photo');
  };

  useEffect(() => {
    const persistNickname = localStorage.getItem('Nickname');
    if (persistNickname) {
      setNickname(persistNickname);
    }
  }, []);

  return (
    <Container>
      <Title>Please enter your nickname</Title>
      <InputContainer>
        <Input type="text" value={nickname} onChange={onChangeNickname} />
        <span>{`${nickname.length} / ${maximumLength}`}</span>
      </InputContainer>
      <StyledButton
        type="button"
        size="medium"
        color="blue"
        disabled={!nickname.length}
        onClick={handleClickNextButton}
      >
        NEXT
      </StyledButton>
    </Container>
  );
}

Nickname.getLayout = function getLayout(page: ReactElement) {
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
`;

const InputContainer = styled.div`
  width: 100%;
  max-width: 64rem;
  display: flex;
  flex-direction: column;
  margin-top: 6rem;
  margin-bottom: 15rem;
  align-items: flex-end;
  span {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.fontColor.titleColor};
    margin-right: 1rem;
  }
`;

const Input = styled.input`
  width: 100%;
  background-color: inherit;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
  text-align: center;
  color: ${({ theme }) => theme.fontColor.titleColor};
  margin-bottom: 1rem;
  transition: border-color 0.2s ease-in-out;
  padding-bottom: 1rem;
  ${({ theme }) => theme.font.bodyRegular};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.fontColor.titleColor};
  }
`;
