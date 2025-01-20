import { Outlet, useNavigate } from 'react-router-dom';
import { Navigation } from '@confeti/design-system';
import { TAB_MENU } from '@pages/home/constants/menu';

const TimeTableLayout = () => {
  const navigate = useNavigate();

  const handleGoHome = () => navigate('/');
  const handleGoToTimeTable = () => navigate('/timetable');

  return (
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
      <Outlet />
    </>
  );
};

export default TimeTableLayout;
