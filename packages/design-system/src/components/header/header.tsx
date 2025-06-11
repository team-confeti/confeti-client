import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icon } from '../../icons';

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
  };

  if (variant === 'detail') {
    return (
      <header className={styles.container({ variant })}>
        <button
          className={styles.button}
          onClick={() => (isBackToHome ? navigate('/') : navigate(-1))}
          aria-label="뒤로가기"
        >
          {icon || <Icon name="arrow-horizontal" size="2.2rem" rotate={180} />}
        </button>
        <h1 className={styles.title}>{title}</h1>

        {handleNavigateToSettings && (
          <button
            className={styles.settingsIcon}
            onClick={handleNavigateToSettings}
          >
            <Icon name="setting" size="2.4rem" />
          </button>
        )}
      </header>
    );
  }

  return (
    <header className={styles.container({ variant: 'default' })}>
      <Icon
        name="logo-symbol"
        width="3.4rem"
        height="2.8rem"
        className={styles.logo}
        onClick={() => handleNavigation('/')}
      />
      <div className={styles.iconSection}>
        <button
          className={styles.button}
          aria-label="검색"
          onClick={() => handleNavigation('/search')}
        >
          <Icon name="search" size="2.8rem" />
        </button>
        <button
          className={styles.button}
          aria-label="프로필"
          onClick={() => handleNavigation('/my')}
        >
          <Icon name="account" size="2.8rem" />
        </button>
      </div>
    </header>
  );
};

export default Header;
