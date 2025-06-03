import React, { useRef, useState } from 'react';
import EditNameInput from '@pages/my/components/edit/edit-name-input';
import LinkedAccount from '@pages/my/components/edit/linked-account';
import UserInfo from '@pages/my/components/profile/user-info';
import { useUserProfile } from '@pages/my/hooks/use-user-info';

import { Button, Header, toast } from '@confeti/design-system';
import { IcToastInfo16 } from '@confeti/design-system/icons';
import { useUserProfileMutation } from '@shared/hooks/use-info-mutation';

import * as styles from './edit-profile.css';

const EditProfile = () => {
  const { data: profileData } = useUserProfile();
  const { mutate: updateUserInfo } = useUserProfileMutation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState('');
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [previewImgUrl, setPreviewImgUrl] = useState(
    profileData?.profileUrl || '',
  );
  const [hasShownToast, setHasShownToast] = useState(false);

  if (!profileData) return null;

  const isNameInvalid =
    (name.length > 0 && name.length < 2) || name.length > 10;
  const isImageChanged = !!profileFile;
  const isButtonDisabled =
    (name.length < 2 || isNameInvalid) && !isImageChanged;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    const shouldShowToast = showToastForNameLength(name, hasShownToast);
    setHasShownToast(shouldShowToast);
  };

  const showToastForNameLength = (
    name: string,
    hasShownToast: boolean,
  ): boolean => {
    if (name.length > 9 && !hasShownToast) {
      toast({
        text: '2~10자로 입력해 주세요',
        icon: <IcToastInfo16 width={'1.6rem'} height={'1.6rem'} />,
        position: 'middleCenter',
      });
      return true;
    } else if (name.length <= 10 && hasShownToast) {
      return false;
    }
    return hasShownToast;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file);
      setPreviewImgUrl(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    const newName = name || profileData.name;

    const payload = profileFile
      ? { name: newName, profileFile }
      : { name: newName, profileUrl: profileData.profileUrl };

    updateUserInfo(payload);
  };

  return (
    <>
      <Header variant="detail" title="프로필 편집" />
      <div className={styles.editProfileContainer}>
        <div className={styles.userInfo}>
          <UserInfo
            name={profileData.name}
            profileUrl={previewImgUrl || profileData.profileUrl}
            showArrow={false}
            showEditBtn={true}
            onEditImage={triggerFileInput}
            disableClick={true}
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
            name={name}
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
