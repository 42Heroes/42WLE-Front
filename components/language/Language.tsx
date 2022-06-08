import styled from 'styled-components';
import { LanguageInfo } from '../../interfaces/user.interface';
import ClearIcon from '@mui/icons-material/Clear';
import { getFlagImage } from '../../library/utils';
import Image from 'next/image';

interface Props {
  language: LanguageInfo;
  onClickLanguage: (language: LanguageInfo) => void;
}

export default function Language({ language, onClickLanguage }: Props) {
  return (
    <Container onClick={() => onClickLanguage(language)}>
      <Contents>
        <Image
          alt={language?.name}
          src={getFlagImage(language?.name)}
          width={23}
          height={14}
        />
        <LanguageName>{language?.name.toUpperCase()}</LanguageName>
      </Contents>
      <ClearIcon />
    </Container>
  );
}

const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border: 0.1rem solid ${({ theme }) => theme.grayColor};
  border-radius: 0.5rem;
  height: 2.4rem;
  min-width: 12.5rem;
  font-family: JetBrainsMono, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: ${({ theme }) => theme.grayColor};
  transition: all 0.2s ease-in-out;
  transition-property: background-color, color, fill;

  cursor: pointer;
  svg {
    font-size: 1.5rem !important;
  }
  &:hover {
    background-color: ${({ theme }) => theme.fontColor.commentColor};
    color: ${({ theme }) => theme.fontColor.titleColor};
    svg {
      fill: ${({ theme }) => theme.fontColor.titleColor};
    }
  }
`;

const Contents = styled.div`
  display: flex;
`;

const LanguageName = styled.div`
  margin-left: 1rem;
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.font.subTitleBold};
  font-size: 1rem;
  font-weight: bold;
`;
