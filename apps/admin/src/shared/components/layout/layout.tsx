import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import AsideNavigationMenu from '@shared/components/layout/aside-navigation-menu';
import Header from '@shared/components/layout/header';
import { PENDING_ITEMS } from '@shared/mocks';

import * as styles from './layout.css';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': '대시보드',
  '/pending': '대기 목록',
  '/festival': '페스티벌 목록',
  '/concert': '콘서트 목록',
  '/agency': '예매처 관리',
  '/event-editor': '공연 등록/수정',
  '/events': '공연 상세',
};

const Layout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const pageTitle =
    PAGE_TITLES[location.pathname] ||
    PAGE_TITLES[
      Object.keys(PAGE_TITLES).find((key) =>
        location.pathname.startsWith(key),
      ) || ''
    ] ||
    '관리자';

  return (
    <div className={styles.wrapper}>
      <AsideNavigationMenu
        isExpanded={sidebarExpanded}
        pendingCount={PENDING_ITEMS.length}
      />
      <div className={styles.mainContainer}>
        <Header
          title={pageTitle}
          onMenuClick={() => setSidebarExpanded(!sidebarExpanded)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className={styles.content}>
          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
};

export default Layout;
