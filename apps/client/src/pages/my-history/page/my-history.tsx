import { Outlet, useLocation } from 'react-router-dom';
import { TAB_MENU } from '@pages/home/constants/menu';

import NavigationTabs from '@shared/components/navigation-tabs';
import { routePath } from '@shared/router/path';

const MyHistoryPage = () => {
  const location = useLocation();

  const isNavShow =
    location.pathname === `${routePath.MY_HISTORY}` ||
    location.pathname ===
      `${routePath.MY_HISTORY}/${routePath.MY_HISTORY_REQUIRE_LOGIN}`;

  return (
    <>
      {isNavShow && <NavigationTabs defaultActiveTab={TAB_MENU.MY_HISTORY} />}
      <Outlet />
    </>
  );
};

export default MyHistoryPage;
