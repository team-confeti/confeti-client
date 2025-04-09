export interface KakaoLogin {
  provider: 'KAKAO';
  redirectUrl: string;
  code: string;
}

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type SocialLoginResponse = TokenResponse & {
  isOnboarding: boolean;
};
