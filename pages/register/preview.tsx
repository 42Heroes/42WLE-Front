import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import Button from '../../components/common/Button';
import LoadingIndicator from '../../components/common/LoadingIndicator';
import Title from '../../components/common/Title';
import RegisterLayout from '../../components/layout/RegisterLayout';
import Profile from '../../components/profile/Profile';
import useMe from '../../hooks/useMe';
import { useRegister } from '../../hooks/useRegister';
import { User } from '../../interfaces/user.interface';
import { updateMe } from '../../library/api';

export default function Preview() {
  const [{ image_url, ...rest }] = useRegister();
  const { data: me, isLoading } = useMe();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: updateUser, isLoading: isUpdateLoading } = useMutation(
    updateMe,
    {
      onSuccess: (data) => {
        queryClient.setQueryData(['user', 'me'], data);
        router.replace('/find');
      },
      onError: (error) => console.log(error),
    },
  );

  const userData = {
    ...me,
    ...rest,
  };

  const handleStartButtonClick = () => {
    updateUser({ ...rest });
  };

  if (isLoading || isUpdateLoading) {
    return <LoadingIndicator />;
  }

  return (
    <Container>
      <Title>
        Great! <br />
        Now you are ready to explore 42WLE
      </Title>
      <Profile user={userData as User} />
      <StyledButton
        type="button"
        size="medium"
        color="blue"
        onClick={handleStartButtonClick}
      >
        START 42WLE
      </StyledButton>
    </Container>
  );
}

Preview.getLayout = function getLayout(page: ReactElement) {
  return <RegisterLayout>{page}</RegisterLayout>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.pointColor};
  border-radius: 1rem;
  padding: 0 10rem;
  margin-top: 7rem;
`;
