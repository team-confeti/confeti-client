import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptRoot = path.dirname(fileURLToPath(import.meta.url));
export const repoRoot = path.resolve(scriptRoot, '../../../..');
export const clientRoot = path.join(repoRoot, 'apps/client/src');

export const filePaths = {
  analyticsCatalogOutput: path.join(
    repoRoot,
    'packages/analytics-catalog/src/generated/analytics-catalog.ts',
  ),
  analyticsCsvOutput: path.join(
    repoRoot,
    'apps/client/ANALYTICS_EVENT_MAP.csv',
  ),
  basicLayout: path.join(clientRoot, 'shared/router/basic-layout.tsx'),
  globalLayout: path.join(clientRoot, 'shared/router/global-layout.tsx'),
  layoutFreeRoutes: path.join(
    clientRoot,
    'shared/router/routes/layout-free-routes.tsx',
  ),
  lazyRoutes: path.join(clientRoot, 'shared/router/lazy.ts'),
  routePath: path.join(clientRoot, 'shared/router/path.ts'),
  clickEvents: path.join(clientRoot, 'shared/analytics/events/click-events.ts'),
  showEvents: path.join(clientRoot, 'shared/analytics/events/show-events.ts'),
  errorPage: path.join(clientRoot, 'shared/pages/error/error.tsx'),
};

export const routeArrayConfigs = [
  {
    filePath: path.join(clientRoot, 'shared/router/routes/global-routes.tsx'),
    exportName: 'globalRoutes',
    parentFiles: [filePaths.globalLayout],
  },
  {
    filePath: path.join(clientRoot, 'shared/router/routes/auth-routes.tsx'),
    exportName: 'authRoutes',
    parentFiles: [filePaths.globalLayout],
  },
  {
    filePath: path.join(clientRoot, 'shared/router/routes/my-page-routes.tsx'),
    exportName: 'myPageRoutes',
    parentFiles: [filePaths.globalLayout],
  },
  {
    filePath: path.join(
      clientRoot,
      'shared/router/routes/timetable-routes.tsx',
    ),
    exportName: 'timetableSubRoutes',
    parentFiles: [filePaths.globalLayout],
  },
  {
    filePath: path.join(clientRoot, 'shared/router/routes/setlist-routes.tsx'),
    exportName: 'setlistRoutes',
    parentFiles: [filePaths.globalLayout],
  },
  {
    filePath: path.join(clientRoot, 'shared/router/routes/fallback-routes.tsx'),
    exportName: 'fallbackRoutes',
    parentFiles: [filePaths.globalLayout],
  },
];

export const manualRouteConfigs = [
  {
    routePathKey: 'ONBOARDING',
    getFiles: ({ layoutFreeRouteMap }) => [
      filePaths.basicLayout,
      layoutFreeRouteMap.get('onboardingRoute'),
    ],
  },
  {
    routePathKey: 'TIMETABLE_DETAIL',
    getFiles: ({ layoutFreeRouteMap }) => [
      filePaths.basicLayout,
      layoutFreeRouteMap.get('timetableDetailRoute'),
    ],
  },
  {
    routePathKey: 'MY_TIMETABLE_DETAIL',
    getFiles: ({ layoutFreeRouteMap }) => [
      filePaths.basicLayout,
      layoutFreeRouteMap.get('myTimetableDetailRoute'),
    ],
  },
  {
    routePathKey: 'LOGIN',
    getFiles: ({ lazyRouteMap }) => [
      filePaths.basicLayout,
      lazyRouteMap.get('LoginPage'),
    ],
  },
];

export const moduleAliasDirectories = [
  { prefix: '@shared/', directory: 'shared' },
  { prefix: '@pages/', directory: 'pages' },
];

export const ignoredSourceFilePatterns = [
  /\.css\.ts$/,
  /\.test\.ts$/,
  /\.d\.ts$/,
];
export const eventTypeOrder = ['show', 'click'];
export const csvHeaders = [
  '페이지',
  '상태',
  '속성',
  '공통_컴포넌트',
  '요소',
  '이벤트_타입',
  'show_타입',
  '이벤트명',
  '파라미터',
  '파라미터_타입',
  '필수_파라미터',
  '소스_파일',
  '소스_컴포넌트',
];
export const generatedAtPlaceholder = '__GENERATED_AT__';
