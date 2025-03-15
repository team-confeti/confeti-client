import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '@shared/constants/user-constants';
import Cookies from 'js-cookie';

export const cookieUtil = (
  action: 'set' | 'remove',
  accessToken?: string,
  refreshToken?: string,
) => {
  switch (action) {
    case 'set':
      if (accessToken)
        Cookies.set(ACCESS_TOKEN_KEY, accessToken, { secure: true });
      if (refreshToken)
        Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
          secure: true,
        });
      break;
    case 'remove':
      Cookies.remove(ACCESS_TOKEN_KEY, { path: '/' });
      Cookies.remove(REFRESH_TOKEN_KEY, { path: '/' });
      break;
    default:
      throw new Error('유효한 action 값을 입력해주세요');
  }
};
