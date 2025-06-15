import { useNavigate } from 'react-router-dom';
import { TAB_MENU } from '@pages/home/constants/menu';

import { Navigation } from '@confeti/design-system';

import { routePath } from '@shared/router/path';

interface Props {
  defaultActiveTab: TAB_MENU;
  hidden?: boolean;
}

const NavigationTabs = ({ defaultActiveTab, hidden = false }: Props) => {
  const navigate = useNavigate();

  if (hidden) {
    return null;
  }

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Navigation.Root defaultActiveTab={defaultActiveTab}>
      <Navigation.List>
        <Navigation.Item
          index={TAB_MENU.HOME}
          handleTabClick={() => handleNavigation(routePath.ROOT)}
        >
          {'홈'}
        </Navigation.Item>
        <Navigation.Item
          index={TAB_MENU.TIMETABLE}
          handleTabClick={() => handleNavigation(routePath.TIME_TABLE_OUTLET)}
        >
          {'타임테이블'}
        </Navigation.Item>
        <Navigation.Item
          index={TAB_MENU.MY_HISTORY}
          handleTabClick={() => handleNavigation(routePath.MY_HISTORY)}
        >
          {'내 공연'}
        </Navigation.Item>
      </Navigation.List>
    </Navigation.Root>
  );
};

export default NavigationTabs;
