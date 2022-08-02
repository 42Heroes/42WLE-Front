import { ReactElement, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import DragDrop from '../../components/common/DragDrop';
import { v4 as uuid } from 'uuid';
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import CommonLayout from '../../components/layout/CommonLayout';
import useInput from '../../hooks/useInput';
import useMe from '../../hooks/useMe';
import languagesBase from '../../library/languages';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '../../components/common/Button';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import { updateMe, updateImage, uploadFileToS3 } from '../../library/api';

import Language from '../../components/language/Language';
import LanguageDropdown from '../../components/common/LanguageDropdown';
import { LanguageInfo } from '../../interfaces/user.interface';
import {
  dataURLtoFile,
  encodeBase64ImageFile,
} from '../../library/ImageConverter';
import media from '../../styles/media';
import ProtectedPage from '../../components/auth/ProtectedPage';

export default function ProfileEdit() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: me, isLoading, error } = useMe();
  const {
    mutate,
    isLoading: isUpdateLoading,
    isError: isUpdateError,
    error: updateError,
    isSuccess: isUpdateSuccess,
  } = useMutation(updateMe, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user', 'me']);
      router.replace('/mypage');
    },
    onError: (error) => console.log(error),
  });

  const { mutate: mutateProfileImage } = useMutation(updateImage, {
    onError: (error) => console.log(error),
  });

  const [languages] = useState(languagesBase);
  const [selectedLLanguages, setSelectedLLanguages] = useState(
    me?.l_language ?? [],
  );
  const [selectedNLanguages, setSelectedNLanguages] = useState(
    me?.n_language ?? [],
  );
  const [isOpenedLLanguageDropDown, setIsOpenedLLanguageDropDown] =
    useState(false);
  const [isOpenedNLanguageDropDown, setIsOpenedNLanguageDropDown] =
    useState(false);

  const handleLLanguageClick = (clickedLanguage: LanguageInfo) => {
    if (selectedLLanguages.length >= 3) {
      return;
    }
    setSelectedLLanguages((prev) => [...prev, clickedLanguage]);
    setIsOpenedLLanguageDropDown((prev) => !prev);
  };
  const handleNLanguageClick = (clickedLanguage: LanguageInfo) => {
    if (selectedNLanguages.length >= 3) {
      return;
    }
    setSelectedNLanguages((prev) => [...prev, clickedLanguage]);
    setIsOpenedNLanguageDropDown((prev) => !prev);
  };
  const handleSelectedLLanguageClick = (clickedLanguage: LanguageInfo) => {
    const filteredLLanguages = selectedLLanguages.filter(
      (language) => language !== clickedLanguage,
    );
    setSelectedLLanguages(filteredLLanguages);
  };
  const handleSelectedNLanguageClick = (clickedLanguage: LanguageInfo) => {
    const filteredNLanguages = selectedNLanguages.filter(
      (language) => language !== clickedLanguage,
    );
    setSelectedNLanguages(filteredNLanguages);
  };

  const commonInputValidator = useCallback((value: string) => {
    return value.length <= 20;
  }, []);

  const [image, setImage] = useState(me?.image_url);
  const [isChangedImage, setIsChangedImage] = useState(false);

  const onChangeImage = async (
    e: React.ChangeEvent<HTMLInputElement> | any,
  ) => {
    let selectedImage;
    if (e.type === 'change') {
      selectedImage = e.target.files[0];
    } else if (e.type === 'drop') {
      selectedImage = e.dataTransfer.files[0];
    }

    if (selectedImage && selectedImage.size <= 2000000) {
      setIsChangedImage(true);

      const encodedImage = await encodeBase64ImageFile(selectedImage);

      setImage(encodedImage);
    }
  };

  const handleHashtagKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput) {
      setHashtags([...hashtags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleHashtagClick = (targetIndex: number) => {
    const filteredHashTags = hashtags.filter(
      (_, index) => index !== targetIndex,
    );
    setHashtags(filteredHashTags);
  };

  const [githubId, onChangeGithubId] = useInput(
    me?.github_id,
    commonInputValidator,
  );

  const [nickname, onChangeNickname] = useInput(
    me?.nickname,
    commonInputValidator,
  );

  const [tagInput, onChangeTagInput, setTagInput] = useInput(
    '',
    commonInputValidator,
  );
  const [hashtags, setHashtags] = useState(me?.hashtags ?? ['']);

  const [introduction, setIntroduction] = useState(me?.introduction ?? '');

  const onChangeIntroduction = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = e;
    if (value.length <= 500) {
      setIntroduction(value);
    }
  };

  const handleSaveButtonClick = async () => {
    if (isChangedImage) {
      const file = dataURLtoFile(image, uuid());
      const uploadUrl = await uploadFileToS3(file, '/profile-image');

      mutateProfileImage(uploadUrl);
    }
    const payload = {
      github_id: githubId,
      nickname,
      hashtags,
      introduction,
      l_language: selectedLLanguages,
      n_language: selectedNLanguages,
    };
    mutate(payload);
  };

  const isPossibleSubmit =
    nickname.trim().length > 3 &&
    introduction.length > 10 &&
    selectedLLanguages.length &&
    selectedNLanguages.length;

  return (
    <ContainerWrapper>
      <Container>
        <LeftContainer>
          <DragDrop image={image} onChangeImage={onChangeImage} />
          <InfoContainer>
            <InfoItem>
              <InputLabel>42 Intra</InputLabel>
              <span>{me?.intra_id}</span>
            </InfoItem>
            <InfoItem>
              <InputLabel>Location</InputLabel>
              <span>{me?.country}</span>
            </InfoItem>
            <InfoItem>
              <InputLabel>Github</InputLabel>
              <GithubContainer>
                <FixedAddress>https://github.com/</FixedAddress>
                <Input
                  type="text"
                  value={githubId}
                  onChange={onChangeGithubId}
                />
              </GithubContainer>
            </InfoItem>
          </InfoContainer>
        </LeftContainer>
        <RightContainer>
          <NicknameContainer>
            <InputLabel>Nickname</InputLabel>
            <Input type="text" value={nickname} onChange={onChangeNickname} />
            <span>{`${nickname.length} / 20`}</span>
          </NicknameContainer>
          <LanguageContainer>
            <div>
              <LanguageTitle>
                <InputLabel>Native in</InputLabel>
                <AddBoxRoundedIcon
                  onClick={() => {
                    setIsOpenedNLanguageDropDown((prev) => !prev);
                    setIsOpenedLLanguageDropDown(false);
                  }}
                />
              </LanguageTitle>
              <StyledLanguageDropdown
                isOpened={isOpenedNLanguageDropDown}
                languages={languages}
                selectedLanguages={[
                  ...selectedNLanguages,
                  ...selectedLLanguages,
                ]}
                onClickLanguage={handleNLanguageClick}
              />
              <SelectedLanguages>
                {selectedNLanguages.map((language) => (
                  <Language
                    key={language.name}
                    language={language}
                    onClickLanguage={handleSelectedNLanguageClick}
                  />
                ))}
              </SelectedLanguages>
            </div>
            <div>
              <LanguageTitle>
                <InputLabel>Learning</InputLabel>
                <AddBoxRoundedIcon
                  onClick={() => {
                    setIsOpenedLLanguageDropDown((prev) => !prev);
                    setIsOpenedNLanguageDropDown(false);
                  }}
                />
              </LanguageTitle>
              <StyledLanguageDropdown
                isOpened={isOpenedLLanguageDropDown}
                languages={languages}
                selectedLanguages={[
                  ...selectedNLanguages,
                  ...selectedLLanguages,
                ]}
                onClickLanguage={handleLLanguageClick}
              />
              <SelectedLanguages>
                {selectedLLanguages.map((language) => (
                  <Language
                    key={language.name}
                    language={language}
                    onClickLanguage={handleSelectedLLanguageClick}
                  />
                ))}
              </SelectedLanguages>
            </div>
          </LanguageContainer>
          <HashtagContainer>
            <InputLabel>Hashtags</InputLabel>
            <Input
              type="text"
              placeholder="ex) React"
              value={tagInput}
              onChange={onChangeTagInput}
              onKeyDown={handleHashtagKeydown}
            />
            <Hashtags>
              {hashtags.map((tag, i) => (
                <HashTag key={tag + i} onClick={() => handleHashtagClick(i)}>
                  #{tag}
                  <IconWrapper>
                    <ClearIcon />
                  </IconWrapper>
                </HashTag>
              ))}
            </Hashtags>
          </HashtagContainer>
          <IntroduceContainer>
            <InputLabel>About me</InputLabel>
            <IntroduceTextarea
              value={introduction}
              onChange={onChangeIntroduction}
            />
            <span>{`${introduction.length} / 500`}</span>
          </IntroduceContainer>
        </RightContainer>
      </Container>
      <StyledSaveButton
        type="button"
        outline
        onClick={handleSaveButtonClick}
        size="large"
        color="blue"
        fullWidth
        disabled={!isPossibleSubmit}
      >
        Save
      </StyledSaveButton>
    </ContainerWrapper>
  );
}

ProfileEdit.getLayout = function getLayout(page: ReactElement) {
  return (
    <CommonLayout headerText="Profile Setting">
      <ProtectedPage>{page}</ProtectedPage>
    </CommonLayout>
  );
};

const ContainerWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 4rem 0rem;
  ${media.large} {
    padding: 0;
  }
`;

const Container = styled.div`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  font-family: JetBrainsMono, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  ${media.large} {
    gap: 17rem;
    flex-direction: row;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: center;
  ${media.large} {
    align-items: stretch;
    flex-direction: column;
  }
`;

const RightContainer = styled.div`
  width: 65rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const InfoContainer = styled.div`
  color: white;
`;

const Input = styled.input`
  width: 100%;
  background-color: inherit;
  border-bottom: 1px solid ${({ theme }) => theme.grayColor};
  color: ${({ theme }) => theme.fontColor.titleColor};
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  padding-bottom: 1rem;
  transition: border-color 0.2s ease-in-out;
  font-size: 1.5rem;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.fontColor.titleColor};
  }
`;

const GithubContainer = styled.div`
  align-items: center;
  display: flex;
`;

const FixedAddress = styled.div`
  color: ${({ theme }) => theme.fontColor.contentColor};
`;

const InputLabel = styled.div`
  color: ${({ theme }) => theme.fontColor.titleColor};
  font-size: 2rem;
  font-weight: bold;
`;

const InfoItem = styled.div`
  ${InputLabel} {
    margin-right: 4rem;
  }
  &:not(:last-child) {
    display: flex;
    margin-bottom: 5rem;
  }
  span {
    color: ${({ theme }) => theme.grayColor};
  }
`;

const NicknameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
  span {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.fontColor.titleColor};
    margin-right: 1rem;
    align-self: flex-end;
  }
`;

const LanguageContainer = styled.div`
  display: flex;
  margin-bottom: 4rem;
  gap: 5rem;
  & > div {
    width: 50%;
    display: flex;
    flex-direction: column;
    position: relative;
    svg {
      font-size: 2.5rem;
      fill: ${({ theme }) => theme.grayColor};
      cursor: pointer;
    }
  }
`;

const LanguageTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const HashtagContainer = styled.div`
  margin-bottom: 4rem;
`;

const StyledLanguageDropdown = styled(LanguageDropdown)`
  left: 100;
  transform: translateX(-100%);
`;

const SelectedLanguages = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  max-width: 16rem;
  grid-gap: 1rem;
`;

const Hashtags = styled.ul`
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
`;

const HashTag = styled.li`
  color: ${({ theme }) => theme.grayColor};
  border: 1px solid ${({ theme }) => theme.grayColor};
  padding: 0.5rem 1rem;
  border-radius: 3rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.fontColor.commentColor};
    color: ${({ theme }) => theme.fontColor.titleColor};
  }
`;

const IconWrapper = styled.div`
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
`;

const IntroduceContainer = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.fontColor.titleColor};
    margin-right: 1rem;
    align-self: flex-end;
  }
`;

const IntroduceTextarea = styled.textarea`
  width: 100%;
  height: 16rem;
  line-height: 2.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  resize: none;
  margin-top: 2rem;
  background-color: ${({ theme }) => theme.fontColor.titleColor};
  ${({ theme }) => theme.font.bodyRegular};
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    width: 1em;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    border-radius: 1rem;
  }
`;

const StyledSaveButton = styled(Button)`
  text-transform: uppercase;
  margin-top: 8rem;
  max-width: 35rem;
  border: 1px solid ${({ theme }) => theme.grayColor};
  color: ${({ theme }) => theme.grayColor};
  border-radius: 1rem;
  &:hover {
    border: 1px solid white;
    background-color: ${({ theme }) => theme.grayColor};
  }
`;
