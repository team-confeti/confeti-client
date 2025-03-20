export interface KakaoLogin {
  provider: string;
  redirectUrl: string;
  code: string;
}

export type SocialLoginResponse = {
  accessToken: string;
  refreshToken: string;
  isOnboarding: boolean;
};
