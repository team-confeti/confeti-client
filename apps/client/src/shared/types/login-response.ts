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
interface ClientConfig {
  clientId: string;
  redirectURI: string;
  scope?: string;
  state?: string;
  nonce?: string;
  usePopup?: boolean;
}
interface Authorization {
  code: string;
  id_token: string;
  state?: string;
}

interface User {
  email: string;
  name: string;
}

interface SigninResponse {
  authorization: Authorization;
  user?: User;
}

declare global {
  interface Window {
    AppleID: {
      auth: {
        init: (config: ClientConfig) => void;
        signIn: (config?: ClientConfig) => Promise<SigninResponse>;
      };
    };
  }
}
