import { Capacitor } from '@capacitor/core';

import { ENV_CONFIG } from '@shared/constants/config';

const getKakaoWebRedirectUri = () => {
  if (window.location.hostname === 'localhost') {
    return ENV_CONFIG.KAKAO_LOCAL_REDIRECT_URI;
  }

  return ENV_CONFIG.KAKAO_REDIRECT_URI;
};

export const getKakaoLoginRedirectUri = () => {
  if (Capacitor.isNativePlatform()) {
    return ENV_CONFIG.KAKAO_NATIVE_REDIRECT_URI;
  }

  return getKakaoWebRedirectUri();
};

export const getKakaoCallbackRedirectUri = () => {
  if (Capacitor.isNativePlatform()) {
    return ENV_CONFIG.KAKAO_NATIVE_REDIRECT_URI;
  }

  return `${window.location.origin}/auth`;
};
