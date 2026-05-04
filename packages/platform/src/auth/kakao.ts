import { isNative } from '../runtime';
import {
  createNativeOAuthState,
  runNativeOAuthFlow,
} from './native-oauth-bridge';

const NATIVE_REDIRECT_SCHEME = 'com.confeti.app://auth';

export interface KakaoNativeLoginParams {
  /**
   * 카카오 OAuth authorize 엔드포인트 (client_id, response_type 포함, redirect_uri/state는 별도 부여).
   * 예: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=xxx`
   */
  authorizeUrl: string;
  /** 카카오 콘솔에 등록된 HTTPS Redirect URI. 토큰 교환 시 백엔드에 동일 값으로 전달. */
  webRedirectUri: string;
}

export interface KakaoNativeLoginResult {
  code: string;
  redirectUrl: string;
}

/**
 * 네이티브 카카오 로그인. 브릿지 페이지(redirect-kakao)가 `native_` state를 감지해 커스텀 스킴으로
 * 핸드오프해야 동작. 백엔드 토큰 교환에는 카카오에 보낸 HTTPS redirect URI를 그대로 전달한다.
 */
export async function loginWithKakaoNative({
  authorizeUrl,
  webRedirectUri,
}: KakaoNativeLoginParams): Promise<KakaoNativeLoginResult> {
  if (!isNative()) {
    throw new Error(
      'loginWithKakaoNative은 네이티브에서만 호출 가능합니다. 웹에서는 기존 OAuth 리다이렉트를 사용하세요.',
    );
  }

  const state = createNativeOAuthState();
  const fullAuthorizeUrl =
    `${authorizeUrl}` +
    `&redirect_uri=${encodeURIComponent(webRedirectUri)}` +
    `&state=${encodeURIComponent(state)}`;

  const { code } = await runNativeOAuthFlow({
    authorizeUrl: fullAuthorizeUrl,
    redirectScheme: NATIVE_REDIRECT_SCHEME,
    state,
  });

  return { code, redirectUrl: webRedirectUri };
}
