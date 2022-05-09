import styled from 'styled-components';
import Image from 'next/image';

interface LanguageInfo {
  flag: string;
  language: string;
}

interface Props {
  onClickDelete: (item: LanguageInfo) => void;
  selectedLanguages: LanguageInfo[];
}
export default function LanguageSelected({
  onClickDelete,
  selectedLanguages,
}: Props) {
  return (
    <ul>
      {selectedLanguages?.map((item: LanguageInfo) => (
        <SelectedList key={item.language} onClick={() => onClickDelete(item)}>
          <Image alt={item.language} src={item.flag} width={18} height={11} />
          <LanguageName>{item.language.toUpperCase()}</LanguageName>
        </SelectedList>
      ))}
    </ul>
  );
}

const SelectedList = styled.li`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 0.1rem solid;
  border-color: ${({ theme }) => theme.grayColor};
  height: 5rem;
  width: 34rem;
  margin: 3rem 0rem;
  cursor: pointer;
`;
const LanguageName = styled.div`
  margin-left: 0.7rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.grayColor};
  font-size: ${({ theme }) => theme.font.subTitleBold};
`;
