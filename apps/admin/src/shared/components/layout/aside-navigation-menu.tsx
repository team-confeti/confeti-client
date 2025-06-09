import { Link, useLocation } from 'react-router-dom';

import { PATH } from '@shared/constants/path';

import * as styles from './aside-navigation-menu.css';

const MENU_ITEMS = [
  { name: '콘서트', path: PATH.CONCERT },
  { name: '페스티벌', path: PATH.FESTIVAL },
  { name: '공연 관리', path: PATH.DASHBOARD },
];

const AsideNavigationMenu = () => {
  const location = useLocation();

  return (
    <aside className={styles.container}>
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
