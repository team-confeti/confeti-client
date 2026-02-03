import { useNavigate } from 'react-router-dom';

import { Icon } from '@confeti/design-system/icon';

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
      <Icon
        name="logo-symbol"
        width="3.4rem"
        height="2.8rem"
        className={styles.logo}
        onClick={() => handleNavigation('/')}
      />

      {!isMyPage && (
        <div className={styles.iconSection}>
          <button
            className={styles.button}
            aria-label="검색"
            onClick={() => handleNavigation('/search')}
          >
            <Icon name="header-search" size="2.8rem" color={iconColor} />
          </button>

          <button
            className={styles.button}
            aria-label="프로필"
            onClick={() => handleNavigation('/my')}
          >
            <Icon name="profile" size="2.8rem" color={iconColor} />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
