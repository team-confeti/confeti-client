import { getAccessToken } from '@confeti/core/auth';

export const checkIsNotLoggedIn = () => {
  return !getAccessToken();
};
