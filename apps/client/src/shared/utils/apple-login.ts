import { CONFIG } from '@shared/constants/api';
import { AppleLogin } from '@shared/types/login-response';

export const initAppleAuth = () => {
  const isLocalhost = window.location.hostname === 'localhost';

  const redirectURI = isLocalhost
    ? CONFIG.APPLE_REDIRECT_URI
    : `${window.location.protocol}//${window.location.host}/callback/apple`;

  window.AppleID.auth.init({
    clientId: CONFIG.APPLE_CLIENT_ID,
    scope: 'name',
    redirectURI,
    state: crypto.randomUUID(),
    nonce: crypto.randomUUID(),
    usePopup: true,
  });

  return redirectURI;
};

export const getAppleAuthData = async (): Promise<AppleLogin> => {
  const res = await window.AppleID.auth.signIn();

  const code = res.authorization?.code;
  const name = res.user?.name ?? '';

  if (!code) throw new Error('애플 로그인에 실패했습니다. (코드 없음)');

  return {
    provider: 'APPLE',
    code,
    name,
  };
};
