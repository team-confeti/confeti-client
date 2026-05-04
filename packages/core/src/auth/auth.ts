import Cookies from 'js-cookie';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './constants';

const COOKIE_DOMAIN = (() => {
  if (typeof window === 'undefined') return undefined;
  const hostname = window.location.hostname;
  if (hostname.endsWith('.confeti.co.kr') || hostname === 'confeti.co.kr') {
    return '.confeti.co.kr';
  }
  return undefined;
})();

const COOKIE_EXPIRES_DAYS = 30;

function getCookieOptions(): Cookies.CookieAttributes {
  const isHttps =
    typeof window !== 'undefined' && window.location.protocol === 'https:';
  return {
    secure: isHttps,
    sameSite: 'Lax',
    path: '/',
    expires: COOKIE_EXPIRES_DAYS,
    ...(COOKIE_DOMAIN && { domain: COOKIE_DOMAIN }),
  };
}
export function getAccessToken() {
  return Cookies.get(ACCESS_TOKEN_KEY);
}
export function getRefreshToken() {
  // Cookie 우선, localStorage fallback (마이그레이션 호환)
  return (
    Cookies.get(REFRESH_TOKEN_KEY) ?? localStorage.getItem(REFRESH_TOKEN_KEY)
  );
}
export function authTokenHandler(
  action: 'set' | 'remove',
  accessToken?: string,
  refreshToken?: string,
) {
  const options = getCookieOptions();
  switch (action) {
    case 'set':
      if (accessToken) Cookies.set(ACCESS_TOKEN_KEY, accessToken, options);
      if (refreshToken) {
        Cookies.set(REFRESH_TOKEN_KEY, refreshToken, options);
        // localStorage → cookie 마이그레이션: 기존 localStorage 정리
        localStorage.removeItem(REFRESH_TOKEN_KEY);
      }
      break;
    case 'remove':
      Cookies.remove(ACCESS_TOKEN_KEY, options);
      Cookies.remove(REFRESH_TOKEN_KEY, options);
      localStorage.removeItem(REFRESH_TOKEN_KEY); // 마이그레이션 잔여 정리
      break;
    default:
      throw new Error('유효한 action 값을 입력해주세요');
  }
}
