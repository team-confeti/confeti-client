export interface KakaoLogin {
  provider: 'KAKAO';
  redirectUrl: string;
  code: string;
}

export interface AppleLogin {
  provider: 'APPLE';
  name: string;
  code: string;
}

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
};

export type SocialLoginResponse = TokenResponse & {
  isOnboarding: boolean;
};

// Apple Login 타입 정의
interface AppleIDClientConfig {
  clientId: string;
  redirectURI: string;
  scope?: string;
  state?: string;
  nonce?: string;
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
