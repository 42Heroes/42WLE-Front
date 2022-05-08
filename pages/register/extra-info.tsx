import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import Title from '../../components/common/Title';
import LoginLayout from '../../components/layout/LoginLayout';

export default function ExtraInfo() {
  const [github, setGithub] = useState('https://github.com/');
  const [inputTag, setInputTag] = useState('');
  const [hashTags, setHashTags] = useState<string[]>([]);

  const addHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputTag) {
      setHashTags((prevTags) => {
        return [...prevTags, '#' + inputTag];
      });
      setInputTag('');
      console.log(inputTag);
      console.log(hashTags);
    }
  };

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
          onChange={(e) => setInputTag(e.target.value)}
          onKeyDown={addHashTag}
        />
        <HashTagContainer>
          {hashTags.map((tag) => (
            <HashTag key={tag}>{tag}</HashTag>
          ))}
        </HashTagContainer>
      </InputContainer>
      <InputContainer>
        <InputLabel>Github</InputLabel>
        <Input
          type="text"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
      </InputContainer>
      <NextButton
        type="button"
        size="medium"
        // disabled={!nickname.length}
        // onClick={handleClickButton}
      >
        NEXT
      </NextButton>
      <SkipButton
        type="button"
        size="medium"
        // onClick={handleClickButton}
      >
        SKIP
      </SkipButton>
    </Container>
  );
}

ExtraInfo.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const HashTag = styled.div`
  color: ${({ theme }) => theme.grayColor};
  border: 1px solid ${({ theme }) => theme.grayColor};
  padding: 0.5rem 1rem;
  border-radius: 3rem;
  margin-right: 1rem;
`;
