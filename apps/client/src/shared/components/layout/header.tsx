import { useNavigate } from 'react-router-dom';

import { Icon } from '@confeti/design-system/icon';

import * as styles from './header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <header className={styles.container}>
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
