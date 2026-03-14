import { useNavigate } from 'react-router-dom';

import { Icon } from '@confeti/design-system/icon';

import { LogClickEvent } from '@shared/analytics/logging';

import { usePageScrollState } from '../../hooks/use-page-scroll-state';

import * as styles from './header.css';

const Header = () => {
  const navigate = useNavigate();

  const { isHomePage, isTimetableLandingPage, isMyPage, isScrolled } =
    usePageScrollState();

  const shouldUseTransparentHeader =
    (isHomePage || isTimetableLandingPage) && !isScrolled;

  const headerClassName = shouldUseTransparentHeader
    ? styles.container
    : isHomePage || isTimetableLandingPage
      ? styles.containerWhite
      : styles.containerSticky;

  const iconColor = shouldUseTransparentHeader ? 'gray300' : 'gray700';

  const handleNavigation = (path: string) => navigate(path);

  return (
    <header className={headerClassName}>
      <LogClickEvent name="click_navigation_logo">
        <Icon
          name="logo-symbol"
          width="3.4rem"
          height="2.8rem"
          className={styles.logo}
          onClick={() => handleNavigation('/')}
        />
      </LogClickEvent>

      {!isMyPage && (
        <div className={styles.iconSection}>
          <LogClickEvent name="click_navigation_search">
            <button
              className={styles.button}
              aria-label="검색"
              onClick={() => handleNavigation('/search')}
            >
              <Icon name="header-search" size="2.8rem" color={iconColor} />
            </button>
          </LogClickEvent>

          <LogClickEvent name="click_navigation_my">
            <button
              className={styles.button}
              aria-label="프로필"
              onClick={() => handleNavigation('/my')}
            >
              <Icon name="profile" size="2.8rem" color={iconColor} />
            </button>
          </LogClickEvent>
        </div>
      )}
    </header>
  );
};

export default Header;
