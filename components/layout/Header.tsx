import styled from 'styled-components';

interface Props {
  headerText: string;
}

export default function Header({ headerText }: Props) {
  return <Container>{headerText}</Container>;
}

const Container = styled.header`
  margin-left: -1px;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
  ${({ theme }) => theme.font.subTitleBold};
  color: ${({ theme }) => theme.fontColor.titleColor};
  display: flex;
  align-items: center;
  padding-left: 3rem;
  white-space: nowrap;
`;
