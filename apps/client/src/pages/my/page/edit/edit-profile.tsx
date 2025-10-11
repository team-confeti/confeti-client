import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button, toast } from '@confeti/design-system';
import { Icon } from '@confeti/design-system/icon';

import { USER_MUTATION_OPTIONS } from '@shared/apis/user/user-mutations';
import { DetailHeader } from '@shared/components';
import { USER_QUERY_KEY } from '@shared/constants/query-key';
import { useUserProfile } from '@shared/hooks/queries/use-user-profile-query';

import EditNameInput from '@pages/my/components/edit/edit-name-input';
import LinkedAccount from '@pages/my/components/edit/linked-account';
import UserEditInfo from '@pages/my/components/edit/user-edit-info';
import { useEditProfile } from '@pages/my/hooks/use-edit-profile';

import * as styles from './edit-profile.css';

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

  const {
    state,
    fileInputRef,
    triggerFileInput,
    handleInputChange,
    handleFileChange,
  } = useEditProfile(profileData?.profileUrl || '');
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

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e.target.value);
    showToastForNameLength();
  };

  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    handleFileChange(file);
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
    state.name.length > 0 && (state.name.length < 2 || state.name.length > 10);

  return (
    <>
      <DetailHeader title="프로필 편집" />
      <div className={styles.editProfileContainer}>
        <div className={styles.userInfo}>
          <UserEditInfo
            name={profileData.name}
            profileUrl={state.previewImgUrl || profileData.profileUrl}
            onEditImage={triggerFileInput}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={onChangeFile}
            style={{ display: 'none' }}
          />
        </div>
        <div className={styles.editProfileContent}>
          <EditNameInput
            name={state.name}
            onChange={onChangeName}
            isInvalid={isNameInvalid}
          />
          <LinkedAccount />
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            variant="add"
            text="저장하기"
            disabled={isNameInvalid}
            onClick={handleSave}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
