import React, { useEffect, useRef, useState } from 'react';
import EditName from '@pages/my/components/edit/edit-name';
import LinkedAccount from '@pages/my/components/edit/linked-account';
import UserInfo from '@pages/my/components/profile/user-info';
import { useUserProfile } from '@pages/my/hooks/use-user-info';

import { Button, Footer, Header, toast } from '@confeti/design-system';
import { IcToastInfo16 } from '@confeti/design-system/icons';
import { useUserProfileMutation } from '@shared/hooks/use-info-mutation';
import { urlToFile } from '@shared/utils/url-to-file';

import * as styles from './edit-profile.css';

const EditProfile = () => {
  const { data: profileData } = useUserProfile();
  const { mutate: updateUserInfo } = useUserProfileMutation();

  const [name, setName] = useState('');

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [previewImgUrl, setPreviewImgUrl] = useState(
    profileData?.profileUrl || '',
  );

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (name.length > 10 && !hasShownToast) {
      toast({
        text: '2~10자로 입력해 주세요',
        icon: <IcToastInfo16 width={16} height={16} />,
      });
      setHasShownToast(true);
    } else if (name.length <= 10 && hasShownToast) {
      setHasShownToast(false);
    }
  }, [name, hasShownToast]);

  useEffect(() => {
    if (profileData?.profileUrl) {
      setPreviewImgUrl(profileData.profileUrl);
    }
  }, [profileData]);

  if (!profileData) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const isNameInvalid =
    (name.length > 0 && name.length < 2) || name.length > 10;
  const isImageChanged = !!profileFile;

  const isButtonDisabled =
    (name.length < 2 || isNameInvalid) && !isImageChanged;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileFile(file); // 저장
      setPreviewImgUrl(URL.createObjectURL(file)); // 화면 미리보기
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    const fileToSend = profileFile
      ? profileFile
      : await urlToFile(profileData.profileUrl, 'current-profile.jpg');

    updateUserInfo({
      name: name || profileData.name,
      profileFile: fileToSend,
    });
  };

  return (
    <>
      <Header variant="detail" title="프로필 편집" />
      <div className={styles.pageWrapper}>
        <div className={styles.content}>
          <UserInfo
            name={profileData.name}
            profileUrl={previewImgUrl}
            showArrow={false}
            showEditBtn={true}
            onEditImage={triggerFileInput}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <EditName
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
        <Footer />
      </div>
    </>
  );
};

export default EditProfile;
