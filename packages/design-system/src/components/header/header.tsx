import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  BtnAccountGray28,
  BtnArrowLeft20,
  BtnSettings24,
  IcNewSearch28,
  LogoMain,
} from '../../icons/src';

import * as styles from './header.css';

interface HeaderProps {
  variant?: 'default' | 'detail';
  title?: string;
  icon?: ReactNode;
  isBackToHome?: boolean;
  handleNavigateToSettings?: () => void;
}

const Header = ({
  variant = 'default',
  title = '',
  icon,
  isBackToHome = false,
  handleNavigateToSettings,
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    window.location.reload();
  };

  if (variant === 'detail') {
    return (
      <header className={styles.container({ variant })}>
        <button
          className={styles.button({ variant: 'back' })}
          onClick={() => (isBackToHome ? navigate('/') : navigate(-1))}
          aria-label="뒤로가기"
        >
          {icon || <BtnArrowLeft20 className={styles.icon} />}
        </button>
        <h1 className={styles.title}>{title}</h1>

        {handleNavigateToSettings && (
          <button
            className={styles.settingsIcon}
            onClick={handleNavigateToSettings}
          >
            <BtnSettings24 className={styles.icon} />
          </button>
        )}
      </header>
    );
  }

  return (
    <header className={styles.container({ variant: 'default' })}>
      <LogoMain className={styles.logo} onClick={() => handleNavigation('/')} />
      <div className={styles.iconSection}>
        <button
          className={styles.button({ variant: 'default' })}
          aria-label="검색"
          onClick={() => handleNavigation('/search')}
        >
          <IcNewSearch28 className={styles.icon} />
        </button>
        <button
          className={styles.button({ variant: 'default' })}
          aria-label="프로필"
          onClick={() => handleNavigation('/my')}
        >
          <BtnAccountGray28 className={styles.icon} />
        </button>
      </div>
    </header>
  );
};

export default Header;
