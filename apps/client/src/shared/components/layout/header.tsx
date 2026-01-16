import { useLocation, useNavigate } from 'react-router-dom';

import { Icon } from '@confeti/design-system/icon';

import { useHeaderBackground } from '../../hooks/use-header-background';

import * as styles from './header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';
  const isTimetableLandingPage = location.pathname === '/timetable';
  const isMyPage = location.pathname.startsWith('/my');

  const hasPassedTicketSection = useHeaderBackground(isHomePage);

  const shouldUseTransparentHeader =
    (isHomePage && !hasPassedTicketSection) || isTimetableLandingPage;

  const headerClassName = shouldUseTransparentHeader
    ? styles.container
    : isHomePage
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
