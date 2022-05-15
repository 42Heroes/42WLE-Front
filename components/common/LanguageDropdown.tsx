import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { getFlagImage } from '../../library/utils';
import { LanguageInfo } from '../../interfaces/user.interface';

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
  const [inputText, setInputText] = useState('');
  const [searchedItems, setSearchedItems] = useState<LanguageInfo[]>([]);

  const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setSearchedItems(
      languages.filter((item: LanguageInfo) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase()),
      ),
    );
  };

  const htmlPrint = (item: LanguageInfo) => {
    const { name } = item;
    return (
      <LanguageList
        key={name}
        onClick={() => {
          onClickLanguage(item);
        }}
      >
        <Image alt={name} src={getFlagImage(name)} width={18} height={11} />
        <LanguageName>{name}</LanguageName>
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
                    (selectedItem) => selectedItem.name === item.name,
                  )
                    ? null
                    : htmlPrint(item),
                )
              : languages.map((item) =>
                  selectedLanguages.some(
                    (selectedItem) => selectedItem.name === item.name,
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
