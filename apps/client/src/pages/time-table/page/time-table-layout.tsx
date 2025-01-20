import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Navigation } from '@confeti/design-system';
import { TAB_MENU } from '@pages/home/constants/menu';
import { routePath } from '@shared/constants/path';

const TimeTableLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoHome = () => navigate(routePath.ROOT);
  const handleGoToTimeTable = () => navigate(routePath.TIME_TABLE_OUTLET);

  const isNavHidden =
    location.pathname ===
    `${routePath.TIME_TABLE_OUTLET}/${routePath.ADDFESTIVAL}`;

  return (
    <>
      {!isNavHidden && (
        <>
          <Navigation.Root defaultActiveTab={1}>
            <Navigation.List>
              <Navigation.Item index={0} handleTabClick={handleGoHome}>
                {TAB_MENU.HOME}
              </Navigation.Item>
              <Navigation.Item index={1} handleTabClick={handleGoToTimeTable}>
                {TAB_MENU.TIMETABLE}
              </Navigation.Item>
            </Navigation.List>
          </Navigation.Root>
        </>
      )}

      <Outlet />
    </>
  );
};

export default TimeTableLayout;
