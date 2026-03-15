export const PATH = {
  LOGIN: '/login',
  REDIRECT_KAKAO: '/auth',
  APPLE_CALLBACK: '/callback/apple',
  DASHBOARD: '/dashboard',
  ANALYTICS_EVENTS: '/analytics-events',
  PENDING: '/pending',
  CONCERT: '/concert',
  FESTIVAL: '/festival',
  TICKETING_PLATFORM: '/ticketing-platform',
  PERFORMANCE_EDITOR: '/performance-editor/:id',
  PERFORMANCES: '/performances/:id',
} as const;

export const getLoginPath = (redirectPath?: string) => {
  const searchParams = new URLSearchParams();

  if (redirectPath?.startsWith('/')) {
    searchParams.set('redirect', redirectPath);
  }

  const queryString = searchParams.toString();

  return queryString ? `${PATH.LOGIN}?${queryString}` : PATH.LOGIN;
};

export const getDefaultRedirectPath = (redirectPath?: string | null) => {
  if (!redirectPath?.startsWith('/')) {
    return PATH.DASHBOARD;
  }

  return redirectPath;
};
