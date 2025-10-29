import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Icon } from '@confeti/design-system/icon';

import * as styles from './header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);

  const isHomePage = location.pathname === '/';
  const isMyPage =
    location.pathname === '/my' || location.pathname.startsWith('/my/');

  // 56.4rem = 564px (1rem = 10px 기준)
  const CAROUSEL_HEIGHT = 564;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (!hasScrolled) {
        setHasScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  // 페이지 변경 시 hasScrolled 리셋
  useEffect(() => {
    setHasScrolled(false);
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const getHeaderClassName = () => {
    if (isHomePage) {
      if (scrollY === 0) {
        return styles.container; // 투명
      } else if (scrollY < CAROUSEL_HEIGHT) {
        return styles.containerScrolled; // 블러
      } else {
        return styles.containerWhite; // 흰색
      }
    }
    return styles.containerSticky;
  };

  const shouldShowBlur = isHomePage && scrollY > 0 && scrollY < CAROUSEL_HEIGHT;

  const iconColor =
    isHomePage && scrollY < CAROUSEL_HEIGHT ? 'gray300' : 'gray700';

  return (
    <header
      className={getHeaderClassName()}
      style={{
        transition:
          isHomePage && hasScrolled
            ? 'background-color 0.3s ease, backdrop-filter 0.3s ease'
            : undefined,
      }}
    >
      {shouldShowBlur && <div className={styles.blurBackground} />}
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
