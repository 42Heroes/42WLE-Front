import styled from 'styled-components';
import Image from 'next/image';
import ClearIcon from '@mui/icons-material/Clear';

interface LanguageInfo {
  flag: string;
  language: string;
}

interface Props {
  onClickLanguage: (item: LanguageInfo) => void;
  selectedLanguages: LanguageInfo[];
}
export default function LanguageSelected({
  onClickLanguage,
  selectedLanguages,
}: Props) {
  return (
    <ul>
      {selectedLanguages.map((item: LanguageInfo) => (
        <SelectedList key={item.language} onClick={() => onClickLanguage(item)}>
          <Contents>
            <Image alt={item.language} src={item.flag} width={23} height={14} />
            <LanguageName>{item.language.toUpperCase()}</LanguageName>
          </Contents>
          <ClearIcon fontSize="large" />
        </SelectedList>
      ))}
    </ul>
  );
}

const SelectedList = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border: 0.1rem solid ${({ theme }) => theme.grayColor};
  border-radius: 0.5rem;
  height: 5rem;
  width: 34rem;
  margin-bottom: 2rem;
  font-family: JetBrainsMono, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: ${({ theme }) => theme.grayColor};
  cursor: pointer;
`;

const Contents = styled.div`
  display: flex;
`;
const LanguageName = styled.div`
  margin-left: 1rem;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.font.subTitleBold};
  font-size: 2.5rem;
  font-weight: bold;
`;
