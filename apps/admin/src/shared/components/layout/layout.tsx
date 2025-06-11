import { Outlet } from 'react-router-dom';

import AsideNavigationMenu from '@shared/components/layout/aside-navigation-menu';

import * as styles from './layout.css';

const Layout = () => {
  return (
    <div className={styles.wrapper}>
      <AsideNavigationMenu />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
