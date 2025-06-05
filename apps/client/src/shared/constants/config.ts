export const ENV_CONFIG = {
  BASE_URL: import.meta.env.VITE_BASE_URL as string,
  KAKAO_REDIRECT_URI: import.meta.env.VITE_KAKAO_REDIRECT_URI as string,
  KAKAO_LOCAL_REDIRECT_URI: import.meta.env
    .VITE_KAKAO_LOCAL_REDIRECT_URI as string,
  KAKAO_URI: import.meta.env.VITE_KAKAO_URI as string,
  APPLE_CLIENT_ID: import.meta.env.VITE_APPLE_CLIENT_ID as string,
  APPLE_REDIRECT_URI: import.meta.env.VITE_APPLE_REDIRECT_URI as string,
  AMPLITUDE_API_KEY: import.meta.env.VITE_AMPLITUDE_API_KEY as string,
  SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN as string,
  IMAGE_CDN_URL: import.meta.env.VITE_IMAGE_CDN_URL as string,
} as const;

export const ACCESS_TOKEN_KEY = 'accessToken' as const;
export const REFRESH_TOKEN_KEY = 'refreshToken' as const;
