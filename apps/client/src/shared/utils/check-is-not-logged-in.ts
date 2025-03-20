import Cookies from 'js-cookie';

import { ACCESS_TOKEN_KEY } from '@shared/constants/user-constants';

export const checkIsNotLoggedIn = () => {
  return !Cookies.get(ACCESS_TOKEN_KEY);
};
