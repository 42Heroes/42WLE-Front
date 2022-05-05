import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import languages from '../../library/languages';
import Image from 'next/image';

interface LanguageInfo {
  flag: string;
  language: string;
}

interface Props {
  onClickLanguage: (item: LanguageInfo) => void;
}

export default function LanguageDropdown({ onClickLanguage }: Props) {
  const [toggle, setToggle] = useState(false);
  const [inputText, setInputText] = useState('');
  const [searchedItems, setSearchedItems] = useState<LanguageInfo[]>([]);

  const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setSearchedItems(
      languages.filter((item: LanguageInfo) =>
        item.language.toLowerCase().includes(inputText.toLowerCase()),
      ),
    );
  };

  return (
    <div>
      <PlusButton onClick={() => setToggle(!toggle)}>+</PlusButton>
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
              ? searchedItems.map((item: LanguageInfo) => (
                  <LanguageList
                    key={item.language}
                    onClick={() => onClickLanguage(item)}
                  >
                    <Image
                      alt={item.language}
                      src={item.flag}
                      width={18}
                      height={11}
                    />
                    <LanguageName>{item.language}</LanguageName>
                  </LanguageList>
                ))
              : languages.map((item: LanguageInfo) => (
                  <LanguageList
                    key={item.language}
                    onClick={() => onClickLanguage(item)}
                  >
                    <Image
                      alt={item.language}
                      src={item.flag}
                      width={18}
                      height={11}
                    />
                    <LanguageName>{item.language}</LanguageName>
                  </LanguageList>
                ))}
          </ul>
        </Container>
      )}
    </div>
  );
}

const PlusButton = styled.button`
  color: white;
`;

const Container = styled.div`
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
  cursor: pointer;

  span {
    color: ${({ theme }) => theme.fontColor.titleColor};
  }
  &:hover {
    color: ${({ theme }) => theme.fontColor.titleColor};
    background-color: ${({ theme }) => theme.fontColor.commentColor};
  }
`;
