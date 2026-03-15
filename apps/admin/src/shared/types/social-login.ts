import { TokenResponse } from '@confeti/core/auth';

export interface KakaoLogin {
  code: string;
  provider: 'KAKAO';
  redirectUrl: string;
}

export interface AppleLogin {
  code: string;
  name: string;
  provider: 'APPLE';
}

export interface SocialLoginResponse extends TokenResponse {
  isOnboarding: boolean;
}

interface AppleIDClientConfig {
  clientId: string;
  nonce?: string;
  redirectURI: string;
  scope?: string;
  state?: string;
  usePopup?: boolean;
}

interface AppleAuthorization {
  code: string;
  id_token: string;
  state?: string;
}

interface AppleUser {
  email?: string;
  name?: {
    firstName?: string;
    lastName?: string;
  };
}

interface AppleSigninResponse {
  authorization: AppleAuthorization;
  user?: AppleUser;
}

declare global {
  interface Window {
    AppleID: {
      auth: {
        init: (config: AppleIDClientConfig) => void;
        signIn: (config?: AppleIDClientConfig) => Promise<AppleSigninResponse>;
      };
    };
  }
}
