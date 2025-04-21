import React, { useState } from 'react';
import EditName from '@pages/my/components/edit/edit-name';
import UserInfo from '@pages/my/components/profile/user-info';
import { useMyConfeti } from '@pages/my/hooks/use-my-favorites';
import { useUserProfile } from '@pages/my/hooks/use-user-info';

import { Button, Footer, Header } from '@confeti/design-system';
import { ARTISTS_DATA } from '@shared/mocks/artists-data';

import * as styles from './edit-profile.css';

const EditProfile = () => {
  const { data: profileData } = useUserProfile();

  const artistData = ARTISTS_DATA;

  const [name, setName] = useState('');

  const { data: performanceData } = useMyConfeti();

  if (!profileData || !artistData || !performanceData) {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const isNameInvalid = name.length < 2 || name.length > 10;

  return (
    <>
      <Header variant="detail" title="프로필 편집" />
      <UserInfo
        name={profileData.name}
        profileUrl={profileData.profileUrl}
        showArrow={false}
      />
      <EditName name={name} onChange={handleInputChange} />
      <div className={styles.buttonSection}>
        <Button variant="add" text={'저장하기'} disabled={isNameInvalid} />
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
