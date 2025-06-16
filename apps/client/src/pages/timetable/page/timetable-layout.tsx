import { Outlet, useLocation } from 'react-router-dom';

import NavigationTabs from '@shared/components/navigation-tabs';
import { routePath } from '@shared/router/path';

import { TAB_MENU } from '@pages/home/constants/menu';

const TimetableLayout = () => {
  const location = useLocation();

  const isNavHidden =
    location.pathname ===
      `${routePath.TIME_TABLE_OUTLET}/${routePath.ADD_FESTIVAL}` ||
    location.pathname ===
      `${routePath.TIME_TABLE_OUTLET}/${routePath.DELETE_FESTIVAL}` ||
    location.pathname ===
      `${routePath.TIME_TABLE_OUTLET}/${routePath.NO_UPCOMING_FESTIVAL}`;
  return (
    <>
      {!isNavHidden && <NavigationTabs defaultActiveTab={TAB_MENU.TIMETABLE} />}
      <Outlet />
    </>
  );
};

export default TimetableLayout;
