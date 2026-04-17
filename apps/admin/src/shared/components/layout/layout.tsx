import { Suspense, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { getAccessToken } from '@confeti/core/auth';

import { DRAFT_QUERY_OPTIONS } from '@shared/apis/draft-queries';
import CommandPalette from '@shared/components/command-palette/command-palette';
import Deferred from '@shared/components/deferred/deferred';
import ErrorFallback from '@shared/components/error-fallback/error-fallback';
import AsideNavigationMenu from '@shared/components/layout/aside-navigation-menu';
import Header from '@shared/components/layout/header';
import LoginRequired from '@shared/components/layout/login-required';
import Loading from '@shared/components/loading/loading';
import { PATH } from '@shared/constants/path';
import { getDraftItems } from '@shared/models/draft';

import * as styles from './layout.css';

const COLLAPSE_BREAKPOINT = 1024;

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': '대시보드',
  '/analytics-events': '이벤트 카탈로그',
  '/pending': '대기 목록',
  '/festival': '페스티벌 목록',
  '/concert': '콘서트 목록',
  '/ticketing-platform': '예매처 관리',
  '/performance-editor': '공연 등록/수정',
  '/performances': '공연 정보 수정',
};

const Layout = () => {
  const accessToken = getAccessToken();
  const navigate = useNavigate();

  const [sidebarExpanded, setSidebarExpanded] = useState(
    () => window.innerWidth >= COLLAPSE_BREAKPOINT,
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(
    function debounceSearchQuery() {
      const timer = setTimeout(() => setDebouncedSearch(searchQuery), 300);

      return function cancelDebouncedSearchQuery() {
        clearTimeout(timer);
      };
    },
    [searchQuery],
  );
  const location = useLocation();
  const { data } = useQuery({
    ...DRAFT_QUERY_OPTIONS.LIST(),
    throwOnError: false,
    enabled: !!accessToken,
    staleTime: 30_000,
  });

  useEffect(function synchronizeSidebarExpansionWithViewport() {
    const mql = window.matchMedia(`(min-width: ${COLLAPSE_BREAKPOINT}px)`);
    const handler = (e: MediaQueryListEvent) => setSidebarExpanded(e.matches);

    mql.addEventListener('change', handler);

    return function stopSynchronizingSidebarExpansionWithViewport() {
      mql.removeEventListener('change', handler);
    };
  }, []);

  useEffect(
    function registerLayoutKeyboardShortcuts() {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          setIsCommandPaletteOpen((prev) => !prev);
          return;
        }
        const target = e.target as HTMLElement;
        const isInInput =
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable;
        if (
          !isInInput &&
          e.key === 'n' &&
          !e.metaKey &&
          !e.ctrlKey &&
          !e.altKey
        ) {
          navigate(PATH.PERFORMANCE_EDITOR.replace(':id', 'new'));
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return function unregisterLayoutKeyboardShortcuts() {
        window.removeEventListener('keydown', handleKeyDown);
      };
    },
    [navigate],
  );

  if (!accessToken) {
    return <LoginRequired />;
  }

  const pageTitle =
    PAGE_TITLES[location.pathname] ||
    PAGE_TITLES[
      Object.keys(PAGE_TITLES).find((key) =>
        location.pathname.startsWith(key),
      ) || ''
    ] ||
    '관리자';
  const pendingCount = getDraftItems(data).length;

  return (
    <div className={styles.wrapper}>
      <AsideNavigationMenu
        isExpanded={sidebarExpanded}
        pendingCount={pendingCount}
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
              <Outlet context={{ searchQuery: debouncedSearch }} />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
};

export default Layout;
