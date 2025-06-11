export const ENV_CONFIG = {
  ADMIN_BASE_URL: import.meta.env.VITE_ADMIN_BASE_URL as string,
} as const;

export const ACCESS_TOKEN_KEY = 'accessToken' as const;
export const REFRESH_TOKEN_KEY = 'refreshToken' as const;
