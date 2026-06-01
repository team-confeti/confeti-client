import { useNavigate } from 'react-router-dom';

import { Icon, type IconName } from '@confeti/design-system/icon';

import type { ClickEventPayload } from '@shared/analytics/events/types';
import { LogClickEvent, logClickEvent } from '@shared/analytics/logging';
import { routePath } from '@shared/router/path';

import { usePageScrollState } from '../../hooks/use-page-scroll-state';

import * as styles from './header.css';

type HeaderAction = {
  event: ClickEventPayload;
  label: string;
  icon: IconName;
  to: string;
};

const Header = () => {
  const navigate = useNavigate();

  const { pathname, isHomePage, isTimetableLandingPage, isMyPage, isScrolled } =
    usePageScrollState();

  const isMyPageRoot = pathname === routePath.MY;

  const shouldUseTransparentHeader =
    (isHomePage || isTimetableLandingPage) && !isScrolled;

  const headerClassName = shouldUseTransparentHeader
    ? styles.container
    : isHomePage || isTimetableLandingPage
      ? styles.containerWhite
      : styles.containerSticky;

  const iconColor = shouldUseTransparentHeader ? 'gray300' : 'gray700';

  const handleNavigation = (path: string) => navigate(path);

  const rightAction: HeaderAction | null = isMyPageRoot
    ? {
        event: { name: 'click_my_profile_setting' },
        label: '설정',
        icon: 'setting',
        to: `${routePath.MY}/${routePath.MY_SETTING}`,
      }
    : !isMyPage
      ? {
          event: { name: 'click_navigation_search' },
          label: '검색',
          icon: 'header-search',
          to: routePath.SEARCH,
        }
      : null;

  return (
    <header className={headerClassName}>
      <LogClickEvent name="click_navigation_logo">
        <Icon
          name="logo-symbol"
          width="3.4rem"
          height="2.8rem"
          className={styles.logo}
          onClick={() => handleNavigation(routePath.ROOT)}
        />
      </LogClickEvent>

      {rightAction && (
        <div className={styles.iconSection}>
          <button
            className={styles.button}
            aria-label={rightAction.label}
            onClick={() => {
              logClickEvent(rightAction.event);
              handleNavigation(rightAction.to);
            }}
          >
            <Icon name={rightAction.icon} size="2.8rem" color={iconColor} />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
