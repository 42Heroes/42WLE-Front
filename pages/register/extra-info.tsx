import { ReactElement, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import Button from '../../components/common/Button';
import Title from '../../components/common/Title';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from 'next/router';
import { useRegister } from '../../hooks/useRegister';
import RegisterLayout from '../../components/layout/RegisterLayout';

export default function ExtraInfo() {
  const router = useRouter();

  const inputTagValidator = useCallback((value: string) => {
    return value.length <= 20;
  }, []);

  const [registerUser, setRegisterUser] = useRegister();
  const [inputTag, onChangeInputTag, setInputTag] = useInput(
    '',
    inputTagValidator,
  );
  const [hashTags, setHashTags] = useState(['']);
  const [githubId, onChangeGithubId, setGithubId] = useInput('');

  const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputTag) {
      setHashTags([...hashTags, inputTag.trim()]);
      setInputTag('');
    }
  };

  const handleHashtagClick = (targetIndex: number) => {
    const filteredHashTags = hashTags.filter(
      (_, index) => index !== targetIndex,
    );
    setHashTags(filteredHashTags);
  };

  const handleNextButtonClick = () => {
    setRegisterUser({
      ...registerUser,
      github_id: githubId,
      hashtags: hashTags,
    });
    router.push('/register/preview');
  };

  const handleSkipButtonClick = () => {
    router.push('/register/preview');
  };

  useEffect(() => {
    setGithubId(registerUser.github_id);
    setHashTags(registerUser.hashtags);
  }, [registerUser]);

  return (
    <Container>
      <Title>
        Tell us about yourself
        <br />a little more!
      </Title>
      <InputContainer>
        <InputLabel>Hashtags</InputLabel>
        <Input
          type="text"
          placeholder="ex) React"
          value={inputTag}
          onChange={onChangeInputTag}
          onKeyDown={handleKeydown}
        />
        <HashTagContainer>
          {hashTags.map((tag, i) => (
            <HashTag key={tag + i} onClick={() => handleHashtagClick(i)}>
              #{tag}
              <IconWrapper>
                <ClearIcon />
              </IconWrapper>
            </HashTag>
          ))}
        </HashTagContainer>
      </InputContainer>
      <InputContainer>
        <InputLabel>Github</InputLabel>
        <GithubContainer>
          <FixedAddress>https://github.com/</FixedAddress>
          <Input type="text" value={githubId} onChange={onChangeGithubId} />
        </GithubContainer>
      </InputContainer>
      <ButtonContainer>
        <NextButton
          type="button"
          size="medium"
          fullWidth
          disabled={!hashTags.length && !githubId.length}
          onClick={handleNextButtonClick}
        >
          NEXT
        </NextButton>
        <SkipButton
          type="button"
          size="medium"
          fullWidth
          disabled={hashTags.length > 0 || githubId.length > 0}
          onClick={handleSkipButtonClick}
        >
          SKIP
        </SkipButton>
      </ButtonContainer>
    </Container>
  );
}

ExtraInfo.getLayout = function getLayout(page: ReactElement) {
  return <RegisterLayout>{page}</RegisterLayout>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  width: 50%;
`;

const NextButton = styled(Button)`
  background-color: ${({ theme }) => theme.pointColor};
  border-radius: 1rem;
  padding: 0 10rem;
  margin-bottom: 2rem;
`;

const SkipButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.grayColor};
  border-radius: 1rem;
  color: ${({ theme }) => theme.grayColor};
  padding: 0 10rem;
  &:hover {
    background-color: ${({ theme }) => theme.grayColor};
    color: ${({ theme }) => theme.fontColor.commentColor};
  }
`;

const InputContainer = styled.div`
  width: 70%;
  max-width: 64rem;
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  margin-bottom: 7rem;
  span {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.fontColor.titleColor};
    margin-right: 1rem;
  }
`;

const InputLabel = styled.div`
  color: ${({ theme }) => theme.fontColor.titleColor};
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  background-color: inherit;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
  color: ${({ theme }) => theme.fontColor.titleColor};
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  transition: border-color 0.2s ease-in-out;
  ${({ theme }) => theme.font.bodyRegular};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.fontColor.titleColor};
  }
`;

const HashTagContainer = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
`;

const HashTag = styled.div`
  color: ${({ theme }) => theme.grayColor};
  border: 1px solid ${({ theme }) => theme.grayColor};
  padding: 0.5rem 1rem;
  border-radius: 3rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.fontColor.commentColor};
    color: ${({ theme }) => theme.fontColor.titleColor};
  }
`;

const GithubContainer = styled.div`
  display: flex;
`;

const FixedAddress = styled.div`
  color: ${({ theme }) => theme.fontColor.contentColor};
`;
