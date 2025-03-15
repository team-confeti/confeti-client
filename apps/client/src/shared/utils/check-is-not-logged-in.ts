import { ACCESS_TOKEN_KEY } from '@shared/constants/user-constants';

export const checkIsNotLoggedIn = () => {
  return !localStorage.getItem(ACCESS_TOKEN_KEY);
};
