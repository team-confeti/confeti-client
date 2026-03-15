export const ENV_CONFIG = {
  BASE_URL: import.meta.env.VITE_BASE_URL as string,
  ADMIN_API_URL: import.meta.env.VITE_ADMIN_API_URL as string,
  KAKAO_URI: import.meta.env.VITE_KAKAO_URI as string,
  APPLE_CLIENT_ID: import.meta.env.VITE_APPLE_CLIENT_ID as string,
} as const;

export const APP_CONFIG = {
  PAGE_SIZE: 20,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_LOGO_TYPES: ['image/png'],
} as const;
