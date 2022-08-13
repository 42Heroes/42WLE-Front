import styled from 'styled-components';
import Button from './Button';

interface Props {
  toggleModal: (event: React.MouseEvent<HTMLDivElement>) => void;
  mainText: string;
}

export default function Alert({ toggleModal, mainText }: Props) {
  return (
    <Container>
      <TextContainer>{mainText}</TextContainer>
      <ButtonContainer>
        <div onClick={(e) => toggleModal(e)}>
          <StyledCancelButton type="button" size="small">
            OK
          </StyledCancelButton>
        </div>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 35rem;
  height: 12rem;
  background-color: #242526;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
`;

const TextContainer = styled.div`
  height: 75%;
  color: ${({ theme }) => theme.fontColor.titleColor};
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 3rem;
  text-align: center;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
`;

const StyledCancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 1rem;
`;
