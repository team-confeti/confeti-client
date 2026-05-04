import { isIOS } from '../runtime';
import {
  createNativeOAuthState,
  runNativeOAuthFlow,
} from './native-oauth-bridge';

const APPLE_AUTHORIZE_URL = 'https://appleid.apple.com/auth/authorize';
const NATIVE_REDIRECT_SCHEME = 'com.confeti.app://callback/apple';

export interface AppleNativeLoginParams {
  /** 애플 콘솔에 등록된 Service ID (= web client_id). */
  clientId: string;
  /** Service ID에 등록된 redirect URI. 브릿지 페이지가 호스팅되어야 한다. */
  webRedirectUri: string;
}

export interface AppleNativeLoginResult {
  code: string;
  /** Apple은 query mode redirect 시 name을 전달하지 않으므로 항상 빈 문자열. */
  name: string;
}

/**
 * iOS 네이티브 애플 로그인 — InAppBrowser 패턴.
 * 브릿지 페이지(redirect-apple)가 `native_` state를 감지해 커스텀 스킴으로 핸드오프해야 동작.
 * 백엔드 토큰 교환에는 webRedirectUri와 동일 client_id(Service ID)를 사용 → 백엔드 변경 불필요.
 */
export async function loginWithAppleNative({
  clientId,
  webRedirectUri,
}: AppleNativeLoginParams): Promise<AppleNativeLoginResult> {
  if (!isIOS()) {
    throw new Error(
      'loginWithAppleNative은 iOS 네이티브에서만 호출 가능합니다.',
    );
  }

  const state = createNativeOAuthState();
  const authorizeUrl =
    `${APPLE_AUTHORIZE_URL}` +
    `?response_type=code` +
    `&response_mode=query` +
    `&client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(webRedirectUri)}` +
    `&state=${encodeURIComponent(state)}`;

  const { code } = await runNativeOAuthFlow({
    authorizeUrl,
    redirectScheme: NATIVE_REDIRECT_SCHEME,
    state,
  });

  return { code, name: '' };
}
