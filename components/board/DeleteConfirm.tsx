import styled from 'styled-components';
import Button from '../common/Button';

interface Props {
  toggleModal: (event: React.MouseEvent<HTMLDivElement>) => void;
}

export default function DeleteConfirm({ toggleModal }: Props) {
  return (
    <Container>
      <TextContainer>Are you sure you want to delete this post?</TextContainer>
      <ButtonContainer>
        <div onClick={(e) => toggleModal(e)}>
          <StyledCancelButton type="button" size="small">
            Cancel
          </StyledCancelButton>
        </div>
        <StyledDeleteButton type="button" size="small">
          Delete
        </StyledDeleteButton>
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
