import { Link, useLocation } from 'react-router-dom';

import { Icon } from '@confeti/design-system/icon';
import { PATH } from '@shared/constants/path';

import * as styles from './aside-navigation-menu.css';

const MENU_ITEMS = [
  { name: '공연 관리', path: PATH.DASHBOARD },
  { name: '콘서트', path: PATH.CONCERT },
  { name: '페스티벌', path: PATH.FESTIVAL },
];

const AsideNavigationMenu = () => {
  const location = useLocation();

  return (
    <aside className={styles.container}>
      <Link to={PATH.DASHBOARD} className={styles.logo}>
        <Icon name="logo-footer" size="10rem" />
      </Link>
      <nav className={styles.nav}>
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.link}
          ${location.pathname.startsWith(item.path) ? styles.active : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AsideNavigationMenu;
