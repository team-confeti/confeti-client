import { Outlet, useLocation } from 'react-router-dom';

import { NavigationTabs } from '@shared/components';
import { routePath } from '@shared/router/path';

import { TAB_MENU } from '@pages/home/constants/tab';

const MyHistoryPage = () => {
  const location = useLocation();

  const isNavShow =
    location.pathname === `${routePath.MY_HISTORY}` ||
    location.pathname ===
      `${routePath.MY_HISTORY}/${routePath.MY_HISTORY_REQUIRE_LOGIN}`;

  return (
    <>
      {isNavShow && (
        <NavigationTabs defaultActiveTab={TAB_MENU.MY_HISTORY} theme="white" />
      )}
      <Outlet />
    </>
  );
};

export default MyHistoryPage;
