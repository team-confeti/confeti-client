import React, { useEffect, useState } from 'react';
import EditName from '@pages/my/components/edit/edit-name';
import UserInfo from '@pages/my/components/profile/user-info';
import { useMyConfeti } from '@pages/my/hooks/use-my-favorites';
import { useUserProfile } from '@pages/my/hooks/use-user-info';

import { Button, Footer, Header, toast } from '@confeti/design-system';
import { IcToastInfo16 } from '@confeti/design-system/icons';
import { ARTISTS_DATA } from '@shared/mocks/artists-data';

import * as styles from './edit-profile.css';

const EditProfile = () => {
  const { data: profileData } = useUserProfile();

  const artistData = ARTISTS_DATA;

  const [name, setName] = useState('');
  const [hasShownToast, setHasShownToast] = useState(false);

  useEffect(() => {
    if (name.length > 10 && !hasShownToast) {
      toast({
        text: '2~10자로 입력해 주세요',
        position: 'middleCenter',
        icon: <IcToastInfo16 width={16} height={16} />,
      });

      setHasShownToast(true);
    } else if (name.length <= 10 && hasShownToast) {
      setHasShownToast(false);
    }
  }, [name, hasShownToast]);

  const { data: performanceData } = useMyConfeti();

  if (!profileData || !artistData || !performanceData) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const isNameInvalid =
    (name.length > 0 && name.length < 2) || name.length > 10;
  const isButtonDisabled = name.length < 2 || isNameInvalid;

  return (
    <>
      <Header variant="detail" title="프로필 편집" />
      <UserInfo
        name={profileData.name}
        profileUrl={profileData.profileUrl}
        showArrow={false}
      />
      <EditName
        name={name}
        onChange={handleInputChange}
        isInvalid={isNameInvalid}
      />
      <div className={styles.buttonSection}>
        <Button variant="add" text={'저장하기'} disabled={isButtonDisabled} />
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
