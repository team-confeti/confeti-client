import Cookies from 'js-cookie';

import { ACCESS_TOKEN_KEY } from '@shared/constants/config';

export const checkIsNotLoggedIn = () => {
  return !Cookies.get(ACCESS_TOKEN_KEY);
};
