import { ENV_CONFIG } from '@shared/constants/config';
import { PATH } from '@shared/constants/path';
import { type AppleLogin } from '@shared/types/social-login';

export const initAppleAuth = () => {
  const redirectURI = `${window.location.origin}${PATH.APPLE_CALLBACK}`;

  window.AppleID.auth.init({
    clientId: ENV_CONFIG.APPLE_CLIENT_ID,
    scope: 'name',
    redirectURI,
    state: crypto.randomUUID(),
    nonce: crypto.randomUUID(),
    usePopup: true,
  });
};

export const getAppleAuthData = async (): Promise<AppleLogin> => {
  const response = await window.AppleID.auth.signIn();
  const code = response.authorization?.code;
  const nameObject = response.user?.name;
  const name =
    nameObject?.firstName && nameObject.lastName
      ? `${nameObject.firstName} ${nameObject.lastName}`
      : '';

  if (!code) {
    throw new Error('애플 로그인에 실패했어요. 인증 코드를 확인해 주세요.');
  }

  return {
    provider: 'APPLE',
    code,
    name,
  };
};
