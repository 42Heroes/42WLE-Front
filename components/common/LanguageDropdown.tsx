import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import useInput from '../../hooks/useInput';
import LanguageDropdownItem from './LanguageDropdownList';
import { LanguageInfo } from '../../interfaces/user.interface';

interface Props {
  onClickLanguage: (item: LanguageInfo) => void;
  languages: LanguageInfo[];
  selectedLanguages: LanguageInfo[];
  isOpened: boolean;
  className?: string;
}

export default function LanguageDropdown({
  onClickLanguage,
  languages,
  selectedLanguages,
  isOpened,
  className,
}: Props) {
  const [inputText, onChangeInputText] = useInput('');
  const [searchedItems, setSearchedItems] = useState<LanguageInfo[]>([]);

  const removedDuplicateLanguages = useMemo(
    () =>
      languages.map((item) =>
        selectedLanguages.some(
          (selectedItem) => selectedItem.name === item.name,
        )
          ? null
          : item,
      ),
    [selectedLanguages, languages],
  );

  const removedDuplicateSearchLanguages = useMemo(
    () =>
      searchedItems.map((item) =>
        selectedLanguages.some(
          (selectedItem) => selectedItem.name === item.name,
        )
          ? null
          : item,
      ),
    [selectedLanguages, searchedItems],
  );

  useEffect(() => {
    setSearchedItems(
      languages.filter((language) =>
        language.name.toLowerCase().includes(inputText.toLowerCase()),
      ),
    );
  }, [inputText]);

  return (
    <>
      {isOpened && (
        <Container className={className}>
          <Input
            value={inputText}
            onChange={onChangeInputText}
            type="text"
            placeholder="Enter your language"
          />
          <ul>
            {inputText
              ? removedDuplicateSearchLanguages.map(
                  (language) =>
                    language && (
                      <LanguageDropdownItem
                        key={language.name}
                        language={language}
                        onClickLanguage={onClickLanguage}
                      />
                    ),
                )
              : removedDuplicateLanguages.map(
                  (language) =>
                    language && (
                      <LanguageDropdownItem
                        key={language.name}
                        language={language}
                        onClickLanguage={onClickLanguage}
                      />
                    ),
                )}
          </ul>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 105%;
  top: 0;
  width: 17rem;
  height: 14rem;
  background-color: ${({ theme }) => theme.grayColor + '20'};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  border-top-left-radius: 0;
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
