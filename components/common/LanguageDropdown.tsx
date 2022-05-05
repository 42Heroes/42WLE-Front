import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import languages from '../../library/languages';
import Image from 'next/image';

interface Props {
  flag: string;
  language: string;
}

export default function LanguageDropdown() {
  const [toggle, setToggle] = useState(false);
  const [inputText, setInputText] = useState('');
  const [searchedItems, setSearchedItems] = useState([
    { flag: '', language: '' },
  ]);
  const handleInputText = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setSearchedItems(
      languages.filter((item: Props) =>
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
              ? searchedItems.map((item: Props) => (
                  <LanguageBox key={item.language}>
                    <Image
                      alt={item.language}
                      src={item.flag}
                      width={18}
                      height={11}
                    />
                    <List>{item.language}</List>
                  </LanguageBox>
                ))
              : languages.map((language: Props) => (
                  <LanguageBox key={language.language}>
                    <Image
                      alt={language.language}
                      src={language.flag}
                      width={18}
                      height={11}
                    />
                    <List>{language.language}</List>
                  </LanguageBox>
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
`;

const Input = styled.input`
  background-color: inherit;
  color: ${({ theme }) => theme.fontColor.titleColor};
  border: 1px solid ${({ theme }) => theme.grayColor};
  font-size: 0.9rem;
`;

const List = styled.li`
  color: ${({ theme }) => theme.fontColor.titleColor};
  margin-left: 0.7rem;
  text-transform: uppercase;
`;

const LanguageBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;
