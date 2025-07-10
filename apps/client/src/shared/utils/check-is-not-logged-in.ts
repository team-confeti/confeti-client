import Cookies from 'js-cookie';

import { ACCESS_TOKEN_KEY } from '@confeti/core/auth';

export const checkIsNotLoggedIn = () => {
  return !Cookies.get(ACCESS_TOKEN_KEY);
};
