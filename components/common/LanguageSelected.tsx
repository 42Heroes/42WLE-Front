import styled from 'styled-components';
import Image from 'next/image';
import { getFlagImage } from '../../library/utils';
import { LanguageInfo } from '../../interfaces/user.interface';

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
      {selectedLanguages.map(({ name }: LanguageInfo) => (
        <SelectedList key={name} onClick={() => onClickDelete({ name })}>
          <Image alt={name} src={getFlagImage(name)} width={18} height={11} />
          <LanguageName>{name.toUpperCase()}</LanguageName>
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
