import { TAB_MENU } from '@pages/home/constants/menu';

import NavigationTabs from '@shared/components/navigation-tabs';

const MyRecord = () => {
  return (
    <div>
      <NavigationTabs defaultActiveTab={TAB_MENU.MY_HISTORY} />
    </div>
  );
};

export default MyRecord;
