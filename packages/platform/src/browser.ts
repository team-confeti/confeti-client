import { Browser } from '@capacitor/browser';

import { isNative } from './runtime';

export interface OpenLinkOptions {
  url: string;
  presentationStyle?: 'popover' | 'fullscreen';
}

export async function openExternalLink(
  options: OpenLinkOptions | string,
): Promise<void> {
  const opts: OpenLinkOptions =
    typeof options === 'string' ? { url: options } : options;

  if (isNative()) {
    await Browser.open({
      url: opts.url,
      presentationStyle: opts.presentationStyle ?? 'popover',
    });
    return;
  }

  if (typeof window !== 'undefined') {
    window.open(opts.url, '_blank', 'noopener,noreferrer');
  }
}

export async function closeInAppBrowser(): Promise<void> {
  if (isNative()) {
    await Browser.close();
  }
}

/**
 * 네이티브 앱 deeplink 호출 (예: `kakaomap://route?...`).
 * Capacitor 7부터 `App.openUrl`이 제거되어 webview navigation을 사용 — WKWebView/WebView가
 * unknown scheme을 OS-level intent로 위임한다. 앱 미설치 시 무시되므로 호출자가 fallback 처리 필요.
 */
export function openAppUrl(url: string): void {
  if (!isNative() || typeof window === 'undefined') return;
  window.location.href = url;
}
