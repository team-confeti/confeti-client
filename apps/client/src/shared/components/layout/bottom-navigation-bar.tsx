import { Link, useLocation } from 'react-router-dom';

import { BottomNavigation } from '@confeti/design-system';
import { Icon, type IconName } from '@confeti/design-system/icon';
import { hapticImpact } from '@confeti/platform';

import type { ClickEventPayload } from '@shared/analytics/events/types';
import { logClickEvent } from '@shared/analytics/logging';
import { routePath } from '@shared/router/path';

import * as styles from './bottom-navigation-bar.css';

type NavTab = {
  label: string;
  icon: IconName;
  to: string;
  event: ClickEventPayload;
};

const TABS: readonly NavTab[] = [
  {
    label: '홈',
    icon: 'home',
    to: routePath.ROOT,
    event: { name: 'click_navigation_tab', params: { tab: 'home' } },
  },
  {
    label: '타임테이블',
    icon: 'timetable',
    to: routePath.TIME_TABLE_OUTLET,
    event: { name: 'click_navigation_tab', params: { tab: 'timetable' } },
  },
  {
    label: '셋리스트',
    icon: 'setlist',
    to: routePath.SETLIST_MAINTENANCE,
    event: { name: 'click_navigation_tab', params: { tab: 'setlist' } },
  },
  {
    label: '마이페이지',
    icon: 'mypage',
    to: routePath.MY,
    event: { name: 'click_navigation_my' },
  },
];

const AUXILIARY_ROUTES: readonly string[] = [routePath.SEARCH];

const BAR_ROUTES = new Set<string>([
  ...TABS.map((tab) => tab.to),
  ...AUXILIARY_ROUTES,
]);

const handleTabSelect = (tab: NavTab, isActive: boolean) => {
  logClickEvent(tab.event);
  if (!isActive) {
    hapticImpact('light');
  }
};

const BottomNavigationBar = () => {
  const { pathname } = useLocation();

  if (!BAR_ROUTES.has(pathname)) {
    return null;
  }

  return (
    <>
      <div className={styles.spacer} aria-hidden />
      <div className={styles.fixedWrapper}>
        <BottomNavigation.Root value={pathname} ariaLabel="앱 하단 메뉴">
          {TABS.map((tab) => (
            <BottomNavigation.Item
              key={tab.to}
              value={tab.to}
              label={tab.label}
              asChild
            >
              {({ isActive }) => (
                <Link
                  to={tab.to}
                  onClick={() => handleTabSelect(tab, isActive)}
                >
                  <Icon
                    name={tab.icon}
                    weight={isActive ? 'fill' : 'regular'}
                    size={24}
                  />
                </Link>
              )}
            </BottomNavigation.Item>
          ))}
        </BottomNavigation.Root>
      </div>
    </>
  );
};

export default BottomNavigationBar;
