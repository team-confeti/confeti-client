import { App, type URLOpenListenerEvent } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import type { PluginListenerHandle } from '@capacitor/core';

export const NATIVE_OAUTH_STATE_PREFIX = 'native_';

export interface NativeOAuthFlowParams {
  /** OAuth authorize URL. state 파라미터는 호출자가 포함시켜야 한다. */
  authorizeUrl: string;
  /** 콜백 핸드오프용 커스텀 스킴 (예: `com.confeti.app://auth`). */
  redirectScheme: string;
  /** authorize URL에 포함된 state. 응답 검증에 사용. */
  state: string;
}

export interface NativeOAuthFlowResult {
  code: string;
}

/**
 * SFSafariViewController/Custom Tabs로 OAuth authorize URL을 열고, 콜백에서 커스텀 스킴 핸드오프를
 * 받아 code를 반환한다. 카카오/애플 등 모든 OAuth 프로바이더 공통.
 */
export async function runNativeOAuthFlow({
  authorizeUrl,
  redirectScheme,
  state,
}: NativeOAuthFlowParams): Promise<NativeOAuthFlowResult> {
  let resolveFn!: (result: NativeOAuthFlowResult) => void;
  let rejectFn!: (error: Error) => void;
  const completion = new Promise<NativeOAuthFlowResult>((resolve, reject) => {
    resolveFn = resolve;
    rejectFn = reject;
  });

  const urlHandle: PluginListenerHandle = await App.addListener(
    'appUrlOpen',
    (event: URLOpenListenerEvent) => {
      if (!event.url.startsWith(redirectScheme)) return;
      try {
        const url = new URL(event.url);
        if (url.searchParams.get('state') !== state) return;
        const code = url.searchParams.get('code');
        if (!code) {
          rejectFn(new Error('OAuth 코드 누락'));
          return;
        }
        // SFSafariViewController/Custom Tabs는 자동 dismiss되지 않으므로 명시적으로 닫음.
        void Browser.close();
        resolveFn({ code });
      } catch (error) {
        rejectFn(error instanceof Error ? error : new Error(String(error)));
      }
    },
  );

  const browserHandle: PluginListenerHandle = await Browser.addListener(
    'browserFinished',
    () => rejectFn(new Error('사용자가 로그인을 취소했어요.')),
  );

  try {
    await Browser.open({ url: authorizeUrl, presentationStyle: 'popover' });
    return await completion;
  } finally {
    await urlHandle.remove();
    await browserHandle.remove();
  }
}

/** `native_` prefix를 붙인 unique state. 브릿지 페이지가 native 응답 식별에 사용. */
export const createNativeOAuthState = (): string =>
  `${NATIVE_OAUTH_STATE_PREFIX}${crypto.randomUUID()}`;
