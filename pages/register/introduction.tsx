import { ReactElement, useEffect, useState } from 'react';
import Title from '../../components/common/Title';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import { useRouter } from 'next/router';
import { useRegister } from '../../hooks/useRegister';
import RegisterLayout from '../../components/layout/RegisterLayout';

export default function Introduction() {
  const router = useRouter();

  const maximumLength = 500;
  const [registerUser, setRegisterUser] = useRegister();
  const [introduction, setIntroduction] = useState('');

  const onChangeInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = e;
    if (value.length <= maximumLength) {
      setIntroduction(value);
    }
  };

  const handleButtonClick = () => {
    if (introduction.length < 10 || introduction.length > maximumLength) {
      return;
    }
    setRegisterUser({ ...registerUser, introduction });
    router.push('/register/extra-info');
  };

  useEffect(() => {
    setIntroduction(registerUser.introduction);
  }, [registerUser]);

  return (
    <Container>
      <Title>Tell us about yourself!</Title>
      <InputContainer>
        <Input value={introduction} onChange={onChangeInput} />
        <span>{`${introduction.length} / ${maximumLength}`}</span>
      </InputContainer>
      <StyledButton
        type="button"
        size="medium"
        color="blue"
        disabled={!introduction.length || introduction.length < 10}
        onClick={handleButtonClick}
      >
        NEXT
      </StyledButton>
    </Container>
  );
}

Introduction.getLayout = function getLayout(page: ReactElement) {
  return <RegisterLayout>{page}</RegisterLayout>;
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
  margin-bottom: 20rem;
  align-items: flex-end;
  span {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.fontColor.titleColor};
    margin-right: 1rem;
  }
`;

const Input = styled.textarea`
  width: 100%;
  height: 16rem;
  line-height: 2.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  resize: none;
  background-color: ${({ theme }) => theme.fontColor.titleColor};
  ${({ theme }) => theme.font.bodyRegular};
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    width: 1em;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 1rem;
  }
`;
