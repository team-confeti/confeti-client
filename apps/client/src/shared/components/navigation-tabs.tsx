import { useNavigate } from 'react-router-dom';

import { Navigation } from '@confeti/design-system';
import { themeVars } from '@confeti/design-system/styles';

import { LogClickEvent } from '@shared/analytics/logging';
import { usePageScrollState } from '@shared/hooks/use-page-scroll-state';
import { routePath } from '@shared/router/path';

import { TAB_MENU } from '@pages/home/constants/tab';

interface Props {
  defaultActiveTab: TAB_MENU;
  hidden?: boolean;
}

const NavigationTabs = ({ defaultActiveTab, hidden = false }: Props) => {
  const navigate = useNavigate();

  const { isHomePage, isTimetableLandingPage, isScrolled } =
    usePageScrollState();

  if (hidden) {
    return null;
  }

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  /**
   * 네비게이션 테마 결정 로직
   * - 홈/타임테이블 랜딩: 스크롤 전 transparent, 스크롤 후 white
   * - 기타 페이지: white
   */
  const shouldBeTransparent =
    (isHomePage || isTimetableLandingPage) && !isScrolled;

  const theme = shouldBeTransparent ? 'transparent' : 'white';

  return (
    <div
      style={{
        position: 'fixed',
        top: 'calc(5.4rem + var(--safe-area-top))',
        left: 0,
        right: 0,
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        zIndex: themeVars.zIndex.navigation.content,
      }}
    >
      <Navigation.Root defaultActiveTab={defaultActiveTab} theme={theme}>
        <Navigation.List>
          <LogClickEvent
            name="click_navigation_tab"
            params={{
              tab: 'home',
            }}
          >
            <Navigation.Item
              index={TAB_MENU.HOME}
              onClick={() => handleNavigation(routePath.ROOT)}
            >
              {'홈'}
            </Navigation.Item>
          </LogClickEvent>
          <LogClickEvent
            name="click_navigation_tab"
            params={{
              tab: 'timetable',
            }}
          >
            <Navigation.Item
              index={TAB_MENU.TIMETABLE}
              onClick={() => handleNavigation(routePath.TIME_TABLE_OUTLET)}
            >
              {'타임테이블'}
            </Navigation.Item>
          </LogClickEvent>
          <LogClickEvent
            name="click_navigation_tab"
            params={{
              tab: 'setlist',
            }}
          >
            <Navigation.Item
              index={TAB_MENU.MY_HISTORY}
              onClick={() => handleNavigation(routePath.SETLIST_MAINTENANCE)}
            >
              {'셋리스트'}
            </Navigation.Item>
          </LogClickEvent>
        </Navigation.List>
      </Navigation.Root>
    </div>
  );
};

export default NavigationTabs;
