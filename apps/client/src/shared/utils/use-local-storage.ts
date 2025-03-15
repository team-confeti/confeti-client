// 로컬 스토리지 관리 함수
export const localStorageUtil = (
  action: 'set' | 'get' | 'remove',
  accessToken?: string,
  refreshToken?: string,
) => {
  const ACCESS_TOKEN_KEY = 'accessToken';
  const REFRESH_TOKEN_KEY = 'refreshToken';

  switch (action) {
    case 'set':
      if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      break;
    case 'get':
      return {
        accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
        refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
      };
    case 'remove':
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      break;
    default:
      throw new Error('유효한 action 값을 입력해주세요');
  }
};
