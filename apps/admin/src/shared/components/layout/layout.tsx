import { Suspense, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation } from 'react-router-dom';

import { DRAFT_QUERY_OPTIONS } from '@shared/apis/draft-queries';
import Deferred from '@shared/components/deferred/deferred';
import ErrorFallback from '@shared/components/error-fallback/error-fallback';
import AsideNavigationMenu from '@shared/components/layout/aside-navigation-menu';
import Header from '@shared/components/layout/header';
import Loading from '@shared/components/loading/loading';

import * as styles from './layout.css';

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': '대시보드',
  '/pending': '대기 목록',
  '/festival': '페스티벌 목록',
  '/concert': '콘서트 목록',
  '/ticketing-platform': '예매처 관리',
  '/performance-editor': '공연 등록/수정',
  '/performances': '공연 상세',
};

const Layout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { data } = useQuery(DRAFT_QUERY_OPTIONS.LIST());

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
        pendingCount={data?.drafts.length ?? 0}
      />
      <div className={styles.mainContainer}>
        <Header
          title={pageTitle}
          onMenuClick={() => setSidebarExpanded(!sidebarExpanded)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className={styles.content}>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            resetKeys={[location.pathname]}
          >
            <Suspense
              fallback={
                <Deferred>
                  <Loading />
                </Deferred>
              }
            >
              <Outlet context={{ searchQuery }} />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
};

export default Layout;
