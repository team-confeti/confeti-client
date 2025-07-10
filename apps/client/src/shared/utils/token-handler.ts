import Cookies from 'js-cookie';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@confeti/core/auth';

export const authTokenHandler = (
  action: 'set' | 'remove',
  accessToken?: string,
  refreshToken?: string,
) => {
  switch (action) {
    case 'set':
      if (accessToken)
        Cookies.set(ACCESS_TOKEN_KEY, accessToken, { secure: true });
      if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      break;
    case 'remove':
      Cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      break;
    default:
      throw new Error('유효한 action 값을 입력해주세요');
  }
};
