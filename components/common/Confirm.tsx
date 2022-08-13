import styled from 'styled-components';
import Button from './Button';

interface Props {
  toggleModal: (event: React.MouseEvent<HTMLDivElement>) => void;
  mainText: string;
  buttonText: string;
  handleButtonClick: () => void;
  postId?: string;
}

export default function Confirm({
  toggleModal,
  mainText,
  buttonText,
  handleButtonClick,
  postId,
}: Props) {
  return (
    <Container>
      <TextContainer>{mainText}</TextContainer>
      <ButtonContainer>
        <div onClick={(e) => toggleModal(e)}>
          <StyledCancelButton type="button" size="small">
            Cancel
          </StyledCancelButton>
        </div>
        <div onClick={handleButtonClick}>
          <StyledDeleteButton type="button" size="small">
            {buttonText}
          </StyledDeleteButton>
        </div>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 28rem;
  height: 15rem;
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
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const StyledCancelButton = styled(Button)`
  background-color: ${({ theme }) => theme.bgColor};
  border-radius: 1rem;
`;

const StyledDeleteButton = styled(Button)`
  background-color: ${({ theme }) => theme.pointColor};
  border-radius: 1rem;
`;
