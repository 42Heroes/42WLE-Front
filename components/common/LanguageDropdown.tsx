import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface LanguageInfo {
  flag: string;
  language: string;
}

interface Props {
  onClickLanguage: (item: LanguageInfo) => void;
  languages: LanguageInfo[];
  selectedLanguages: LanguageInfo[];
}

export default function LanguageDropdown({
  onClickLanguage,
  languages,
  selectedLanguages,
}: Props) {
  const [toggle, setToggle] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [searchedItems, setSearchedItems] = useState<LanguageInfo[]>([]);

  const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setSearchedItems(
      languages.filter((item: LanguageInfo) =>
        item.language.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
  };

  const htmlPrint = (item: LanguageInfo) => {
    return (
      <LanguageList
        key={item.language}
        onClick={() => {
          onClickLanguage(item);
        }}
      >
        <Image alt={item.language} src={item.flag} width={18} height={11} />
        <LanguageName>{item.language}</LanguageName>
      </LanguageList>
    );
  };

  return (
    <TopContainer>
      <AddBox onClick={() => setToggle(!toggle)}>ADD LANGUAGE</AddBox>
      {toggle && (
        <Container>
          <Input
            value={inputText}
            onChange={handleInputText}
            type="text"
            placeholder="Enter your language"
          />
          <ul>
            {inputText
              ? searchedItems.map((item) =>
                  selectedLanguages.some(
                    (selectedItem) => selectedItem.language === item.language,
                  )
                    ? null
                    : htmlPrint(item),
                )
              : languages.map((item) =>
                  selectedLanguages.some(
                    (selectedItem) => selectedItem.language === item.language,
                  )
                    ? null
                    : htmlPrint(item),
                )}
          </ul>
        </Container>
      )}
    </TopContainer>
  );
}

const TopContainer = styled.div`
  cursor: pointer;
  position: relative;
  width: 34rem;
`;

const AddBox = styled.div`
  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.grayColor};
  height: 5rem;
  /* width: 34rem; */
  color: ${({ theme }) => theme.grayColor};
  font-size: ${({ theme }) => theme.font.subTitleBold};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5rem;
`;

const Container = styled.div`
  position: absolute;
  left: 100%;
  top: 0;
  width: 17rem;
  height: 14rem;
  background-color: ${({ theme }) => theme.grayColor + '20'};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border-top-left-radius: 0;
  display: flex;
  flex-direction: column;
  ul {
    overflow-y: scroll;
  }
`;

const Input = styled.input`
  background-color: inherit;
  color: ${({ theme }) => theme.fontColor.titleColor};
  border: 1px solid ${({ theme }) => theme.grayColor};
  font-size: 0.9rem;
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  font-family: JetBrainsMono, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &:focus {
    outline: none;
  }
`;

const LanguageName = styled.div`
  margin-left: 0.7rem;
  text-transform: uppercase;
`;

const LanguageList = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  color: ${({ theme }) => theme.fontColor.commentColor};

  span {
    color: ${({ theme }) => theme.fontColor.titleColor};
  }
  &:hover {
    color: ${({ theme }) => theme.fontColor.titleColor};
    background-color: ${({ theme }) => theme.fontColor.commentColor};
  }
`;
