import { ACCESS_TOKEN_KEY } from '@shared/constants/user-constants';
import Cookies from 'js-cookie';

export const checkIsNotLoggedIn = () => {
  return !Cookies.get(ACCESS_TOKEN_KEY);
};
