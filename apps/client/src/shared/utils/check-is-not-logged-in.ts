import { USER_ID, USER_ID_KEY } from '@shared/constants/user-constants';

export const checkIsNotLoggedIn = () => {
  return localStorage.getItem(USER_ID_KEY) !== USER_ID;
};
