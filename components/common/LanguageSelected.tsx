import styled from 'styled-components';
import Image from 'next/image';

interface LanguageInfo {
  flag: string;
  language: string;
}

interface Props {
  onClickDelete: (item: LanguageInfo, index: number) => void;
  selectedLanguages: LanguageInfo[];
}
export default function LanguageSelected({
  onClickDelete,
  selectedLanguages,
}: Props) {
  console.log(selectedLanguages);
  return (
    <ul>
      {selectedLanguages?.map((item: LanguageInfo, index: number) => (
        <SelectedList
          key={item.language}
          onClick={() => onClickDelete(item, index)}
        >
          <div>
            <Image alt={item.language} src={item.flag} width={18} height={11} />
            <LanguageName>{item.language.toUpperCase()}</LanguageName>
          </div>
        </SelectedList>
      ))}
    </ul>
  );
}

const SelectedList = styled.li`
  div {
    border: 20rem 10rem;
    border-color: ${({ theme }) => theme.grayColor};
  }
`;
const LanguageName = styled.div`
  margin-left: 0.7rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.grayColor};
`;
