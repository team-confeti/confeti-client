import { TAB_MENU } from '@pages/home/constants/menu';
import { useUserProfile } from '@pages/my/hooks/use-user-info';
import RecordIntroduce from '@pages/my-history/components/record/record-introduce';

import NavigationTabs from '@shared/components/navigation-tabs';

const MyRecord = () => {
  const { data: profileData } = useUserProfile();

  if (!profileData) {
    return null;
  }

  return (
    <div>
      <NavigationTabs defaultActiveTab={TAB_MENU.MY_HISTORY} />

      <RecordIntroduce
        name={profileData.name}
        profileUrl={profileData.profileUrl}
      />
    </div>
  );
};

export default MyRecord;
