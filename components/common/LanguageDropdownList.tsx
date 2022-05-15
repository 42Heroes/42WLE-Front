import Image from 'next/image';
import styled from 'styled-components';
import { LanguageInfo } from '../../interfaces/user.interface';
import { getFlagImage } from '../../library/utils';

interface Props {
  language: LanguageInfo;
  onClickLanguage: (item: LanguageInfo) => void;
}

export default function LanguageDropdownItem({
  language,
  onClickLanguage,
}: Props) {
  return (
    <LanguageList
      key={language.name}
      onClick={() => {
        onClickLanguage(language);
      }}
    >
      <Image
        alt={language.name}
        src={getFlagImage(language.name)}
        width={18}
        height={11}
      />
      <LanguageName>{language.name}</LanguageName>
    </LanguageList>
  );
}

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
