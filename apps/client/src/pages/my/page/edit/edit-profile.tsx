import { useReducer, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button, toast } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { USER_MUTATION_OPTIONS } from '@shared/apis/user/user-mutations';
import { DetailHeader } from '@shared/components';
import { USER_QUERY_KEY } from '@shared/constants/query-key';
import { useUserProfile } from '@shared/hooks/queries/use-user-profile-query';

import EditNameInput from '@pages/my/components/edit/edit-name-input';
import LinkedAccount from '@pages/my/components/edit/linked-account';
import UserInfo from '@pages/my/components/profile/user-info';

import * as styles from './edit-profile.css';

type State = {
  name: string;
  profileFile: File | null;
  previewImgUrl: string;
};

type Action =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_PROFILE_FILE'; payload: File }
  | { type: 'SET_PREVIEW_URL'; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_PROFILE_FILE':
      return { ...state, profileFile: action.payload };
    case 'SET_PREVIEW_URL':
      return { ...state, previewImgUrl: action.payload };
    default:
      return state;
  }
};

const EditProfile = () => {
  const { data: profileData } = useUserProfile();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    ...USER_MUTATION_OPTIONS.PATCH_PROFILE(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY.PROFILE() });
      toast({ text: '성공적으로 저장되었어요!', position: 'middleCenter' });
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const triggerFileInput = () => fileInputRef.current?.click();

  const [state, dispatch] = useReducer(reducer, {
    name: '',
    profileFile: null,
    previewImgUrl: profileData?.profileUrl || '',
  });

  if (!profileData) return null;

  const showToastForNameLength = () => {
    if (state.name.length > 9) {
      toast({
        text: '2~10자로 입력해 주세요',
        icon: <Icon name="toast-info" size="1.6rem" color="confeti_red" />,
        position: 'middleCenter',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_NAME', payload: e.target.value });
    showToastForNameLength();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      dispatch({ type: 'SET_PROFILE_FILE', payload: file });
      dispatch({ type: 'SET_PREVIEW_URL', payload: URL.createObjectURL(file) });
    }
  };

  const handleSave = () => {
    const newName = state.name || profileData.name;
    const formData = new FormData();
    formData.append('name', newName);
    if (state.profileFile) {
      formData.append('profileFile', state.profileFile);
    }

    mutate(formData);
  };

  const isNameInvalid =
    (state.name.length > 0 && state.name.length < 2) || state.name.length > 10;
  const isImageChanged = !!state.profileFile;
  const isButtonDisabled =
    (state.name.length < 2 || isNameInvalid) && !isImageChanged;

  return (
    <>
      <DetailHeader title="프로필 편집" />
      <div className={styles.editProfileContainer}>
        <div className={styles.userInfo}>
          <UserInfo
            name={profileData.name}
            profileUrl={state.previewImgUrl || profileData.profileUrl}
            showArrow={false}
            showEditBtn
            onEditImage={triggerFileInput}
            disableClick
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className={styles.editProfileContent}>
          <EditNameInput
            name={state.name}
            onChange={handleInputChange}
            isInvalid={isNameInvalid}
          />
          <LinkedAccount />
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            variant="add"
            text="저장하기"
            disabled={isButtonDisabled}
            onClick={handleSave}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
