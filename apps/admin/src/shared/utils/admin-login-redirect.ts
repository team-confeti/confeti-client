import { STORAGE_KEY } from '@shared/constants/api';
import { getDefaultRedirectPath, PATH } from '@shared/constants/path';

export const getRedirectPathFromSearchParams = (
  searchParams: URLSearchParams,
) => {
  return getDefaultRedirectPath(searchParams.get('redirect'));
};

export const persistRedirectPath = (redirectPath: string) => {
  sessionStorage.setItem(
    STORAGE_KEY.ADMIN_LOGIN_REDIRECT_PATH,
    getDefaultRedirectPath(redirectPath),
  );
};

export const getPersistedRedirectPath = () => {
  return getDefaultRedirectPath(
    sessionStorage.getItem(STORAGE_KEY.ADMIN_LOGIN_REDIRECT_PATH),
  );
};

export const clearPersistedRedirectPath = () => {
  sessionStorage.removeItem(STORAGE_KEY.ADMIN_LOGIN_REDIRECT_PATH);
};

export const consumeRedirectPath = () => {
  const redirectPath = sessionStorage.getItem(
    STORAGE_KEY.ADMIN_LOGIN_REDIRECT_PATH,
  );

  sessionStorage.removeItem(STORAGE_KEY.ADMIN_LOGIN_REDIRECT_PATH);

  return redirectPath ? getDefaultRedirectPath(redirectPath) : PATH.DASHBOARD;
};
