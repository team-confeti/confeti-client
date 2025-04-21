import EditName from '@pages/my/components/edit/edit-name';
import UserInfo from '@pages/my/components/profile/user-info';
import { useMyConfeti } from '@pages/my/hooks/use-my-favorites';
import { useUserProfile } from '@pages/my/hooks/use-user-info';

import { Footer, Header } from '@confeti/design-system';
import { ARTISTS_DATA } from '@shared/mocks/artists-data';

const EditProfile = () => {
  const { data: profileData } = useUserProfile();

  const artistData = ARTISTS_DATA;

  const { data: performanceData } = useMyConfeti();

  if (!profileData || !artistData || !performanceData) {
    return null;
  }

  return (
    <>
      <Header variant="detail" title="프로필 편집" />
      <UserInfo
        name={profileData.name}
        profileUrl={profileData.profileUrl}
        showArrow={false}
      />
      <EditName />
      <Footer />
    </>
  );
};

export default EditProfile;
