import { cn } from '../../utils';
import {
  LogoMain,
  BtnSearchG90024,
  BtnAccountGray24,
  BtnArrowLeft20,
} from '../../icons/src';
import * as styles from './header.css';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  variant?: 'default' | 'detail';
  title?: string;
  icon?: React.ReactNode;
  className?: string;
}

const Header = ({
  variant = 'default',
  title = '',
  icon,
  className,
}: HeaderProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    window.location.reload();
  };

  const handleSearchClick = () => handleNavigation('/search');
  const handleLogoClick = () => handleNavigation('/');
  const handleProfileClick = () => handleNavigation('/my');

  if (variant === 'detail') {
    return (
      <header
        className={cn(styles.container({ variant: 'detail' }), className)}
      >
        <button
          className={styles.button({ variant: 'back' })}
          onClick={handleBackClick}
          aria-label="뒤로가기"
        >
          {icon ? icon : <BtnArrowLeft20 className={styles.icon} />}
        </button>
        <h1 className={styles.title}>{title}</h1>
      </header>
    );
  }

  return (
    <header className={styles.container({ variant: 'default' })}>
      <LogoMain className={styles.logo} onClick={handleLogoClick} />
      <div className={styles.iconSection}>
        <button
          className={styles.button({ variant: 'default' })}
          aria-label="검색"
          onClick={handleSearchClick}
        >
          <BtnSearchG90024 className={styles.icon} />
        </button>
        <button
          className={styles.button({ variant: 'default' })}
          onClick={handleProfileClick}
          aria-label="프로필"
        >
          <BtnAccountGray24 className={styles.icon} />
        </button>
      </div>
    </header>
  );
};

export default Header;
