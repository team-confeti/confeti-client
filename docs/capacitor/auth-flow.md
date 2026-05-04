# Auth Flow — 카카오 / 애플 네이티브 분기

이 문서는 Phase 4의 인증 플로우 구현 가이드. 현재는 stub만 존재 (`packages/platform/src/auth/{kakao,apple}.ts`).

## 현재 상태 (Phase 1~3 시점)

웹과 네이티브 양쪽에서 **현재 코드 그대로 카카오 로그인 시도 시**:

- 웹: 정상 동작 (기존 OAuth 리다이렉트)
- 네이티브: `window.location.href = KAKAO_URI + redirect_uri`가 발화하지만, redirect_uri인 `confeti.co.kr/auth`이 Capacitor의 file:// 또는 https://localhost origin이 아니라 외부 도메인이므로 콜백이 앱으로 돌아오지 못함 → 로그인 미완료.

따라서 Phase 4 작업 없이는 **앱 안에서 로그인 불가**.

## 카카오 로그인 — 접근 방식 변경 (2026-04-29)

원래 ADR-005는 redirect URI로 커스텀 스킴 `com.confeti.app://auth`를 카카오 콘솔에 직접 등록하려 했으나, 카카오 콘솔이 **http/https 스킴만 허용** (커스텀 스킴 입력 시 "유효하지 않은 URL입니다") 함을 확인하고 ADR-011로 접근 방식을 변경했다.

### 새 접근: Auth 브릿지 페이지 + 커스텀 스킴 핸드오프 (ADR-011)

핵심: 카카오엔 **기존 HTTPS URI(`https://confeti.co.kr/auth`)** 그대로 등록 (이미 등록되어 있음 → 추가 작업 0). 그 페이지가 진입 시 네이티브이면 커스텀 스킴으로 핸드오프.

```
1. 사용자 "카카오로 로그인" 탭 (앱 안)
2. Browser.open({ url: KAKAO_AUTHORIZE_URL + redirect_uri=https://confeti.co.kr/auth })
3. 사용자 카카오 로그인 (인앱 브라우저)
4. 카카오가 https://confeti.co.kr/auth?code=... 로 redirect
5. /auth 라우트가 인앱 브라우저 안에서 마운트
6. /auth 컴포넌트가 Capacitor 환경 감지 시 즉시 window.location.href = 'com.confeti.app://auth?code=...'
7. iOS SFSafariViewController / Android Custom Tabs가 커스텀 스킴을 OS에 위임
8. iOS Info.plist CFBundleURLTypes / Android intent-filter가 우리 앱으로 라우팅
9. Capacitor App plugin의 addListener('appUrlOpen', ...) 핸들러가 URL 수신
10. URL에서 code 추출 → POST /auth/login (기존 mutation 그대로)
11. 인앱 브라우저는 OS가 자동 dismiss
```

### 기각된 대안

- **옵션 A. Native SDK + 커스텀 Capacitor 플러그인**: UX 최상이지만 Swift/Kotlin 1~2일 + 유지보수 부담 → 보류 (향후 격상 가능, 인터페이스 보존)
- **옵션 B. Universal Links / App Links**: HTTPS URI를 OS가 가로채 앱에 전달. 그러나 `apple-app-site-association` / `assetlinks.json` 호스팅 + Apple Developer 콘솔 Associated Domains 활성화 + Xcode capability 추가가 필요해 셋업 비용이 큼 → 보류

## 카카오 로그인 — 구현 단계

### 1. iOS: Info.plist 커스텀 스킴 등록 (앱 로컬 등록만, 카카오와 무관)

`apps/client/ios/App/App/Info.plist`에:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>com.confeti.app</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>com.confeti.app</string>
    </array>
  </dict>
</array>
```

### 2. Android: AndroidManifest.xml intent-filter (앱 로컬 등록만)

`apps/client/android/app/src/main/AndroidManifest.xml`의 MainActivity activity 안에:

```xml
<intent-filter>
  <action android:name="android.intent.action.VIEW" />
  <category android:name="android.intent.category.DEFAULT" />
  <category android:name="android.intent.category.BROWSABLE" />
  <data android:scheme="com.confeti.app" />
</intent-filter>
```

### 3. Kakao Developers 콘솔

- iOS Bundle ID: `com.confeti.app`
- Android Package Name: `com.confeti.app`
- Android Key Hash: `keytool -exportcert ...` 출력 (debug용 + release용)
- **Redirect URI: 추가 등록 없음** — 기존 `https://confeti.co.kr/auth`를 그대로 재사용 (커스텀 스킴은 카카오 콘솔에 등록하지 않는다)

### 4. `apps/client` 브릿지 라우트 — 네이티브이면 커스텀 스킴으로 핸드오프

`/auth` 라우트(또는 카카오 콜백을 처리하는 컴포넌트)에 한 번만 진입 시 Capacitor 환경 감지 후 즉시 redirect.

```ts
// apps/client/src/pages/auth/... (현재 카카오 콜백 컴포넌트)
import { useEffect } from 'react';
import { isNative } from '@confeti/platform';

export const AuthBridge = () => {
  useEffect(() => {
    if (!isNative()) return; // 웹은 기존 흐름 그대로
    const params = window.location.search; // ?code=...&state=...
    window.location.href = `com.confeti.app://auth${params}`;
  }, []);
  // 웹용 기존 콜백 처리 UI/로직은 그대로 유지
  return <ExistingWebCallback />;
};
```

> 주의: 이 분기는 **웹 동작에 영향이 없어야 함**. `isNative()`가 false면 기존 로직만 실행. 네이티브에서도 SPA 라우트가 마운트된 직후이므로 `useEffect` 첫 tick에 redirect.

### 5. `packages/platform/src/auth/kakao.ts` 구현

```ts
import { App, type URLOpenListenerEvent } from '@capacitor/app';
import { Browser } from '@capacitor/browser';

const NATIVE_REDIRECT_URL = 'com.confeti.app://auth';
const KAKAO_REDIRECT_URI = 'https://confeti.co.kr/auth';
// 카카오엔 HTTPS URI를 redirect_uri로 보내고, 그 페이지(브릿지)가 네이티브 스킴으로 핸드오프

export async function loginWithKakaoNative(): Promise<KakaoNativeLoginResult> {
  const authorizeUrl =
    `https://kauth.kakao.com/oauth/authorize?response_type=code` +
    `&client_id=${KAKAO_REST_API_KEY}` +
    `&redirect_uri=${encodeURIComponent(KAKAO_REDIRECT_URI)}`;

  return new Promise<KakaoNativeLoginResult>((resolve, reject) => {
    let resolved = false;

    const handle = App.addListener(
      'appUrlOpen',
      (event: URLOpenListenerEvent) => {
        if (!event.url.startsWith(NATIVE_REDIRECT_URL)) return;
        const url = new URL(event.url);
        const code = url.searchParams.get('code');
        if (!code) {
          reject(new Error('카카오 OAuth 코드 누락'));
          return;
        }
        resolved = true;
        void Browser.close();
        void handle.remove();
        // 백엔드 mutation에는 카카오에 보낸 redirect_uri를 그대로 전달해야 함
        resolve({ code, redirectUrl: KAKAO_REDIRECT_URI });
      },
    );

    Browser.addListener('browserFinished', () => {
      if (!resolved) {
        void handle.remove();
        reject(new Error('사용자가 로그인 취소'));
      }
    });

    void Browser.open({ url: authorizeUrl, presentationStyle: 'popover' });
  });
}
```

(상세 구현 시 type 정합, `KAKAO_REST_API_KEY` 환경변수 추가 등 보강 필요. `redirectUrl`은 토큰 교환 시 카카오 검증을 위해 authorize 요청에 사용한 HTTPS URI와 동일해야 한다.)

### 6. 호출부 분기 (`login-page.tsx`)

```ts
import { isNative, loginWithKakaoNative } from '@confeti/platform';

const handleKakao = async () => {
  if (isNative()) {
    try {
      const { code, redirectUrl } = await loginWithKakaoNative();
      kakaoLoginMutate({ code, redirectUrl, provider: 'KAKAO' });
    } catch (e) {
      // 사용자 취소 또는 실패 토스트
    }
    return;
  }
  // 기존 웹 OAuth 리다이렉트 그대로
  const url = window.location.hostname.includes('localhost')
    ? KAKAO_LOCAL_REDIRECT_URI
    : KAKAO_REDIRECT_URI;
  window.location.href = `${KAKAO_URI}&redirect_uri=${url}`;
};
```

## 애플 로그인

### 옵션 (단일 채택)

iOS: `@capacitor-community/apple-sign-in` (Sign in with Apple framework, 네이티브 시트)
Android + 웹: 기존 `window.AppleID.auth.signIn()` 그대로

### 구현 단계

#### 1. 패키지 설치

```bash
pnpm --filter @confeti/platform add @capacitor-community/apple-sign-in
```

#### 2. iOS Xcode capability 추가

Xcode → Targets → App → Signing & Capabilities → "+ Capability" → "Sign in with Apple" 추가.

해당 capability는 Apple Developer 콘솔의 App ID에 활성화되어 있어야 함 (이미 Service ID `pentiloversclub.confeti`는 등록됨 — App ID 별도 확인).

#### 3. `packages/platform/src/auth/apple.ts` 구현

```ts
import {
  SignInWithApple,
  type SignInWithAppleOptions,
} from '@capacitor-community/apple-sign-in';
import { isIOS } from '../runtime';

export async function loginWithAppleNative(): Promise<AppleNativeLoginResult> {
  if (!isIOS()) {
    throw new Error('iOS 네이티브에서만 호출 가능');
  }
  const options: SignInWithAppleOptions = {
    clientId: 'com.confeti.app', // App ID (Service ID 아님)
    redirectURI: '', // 네이티브 시트는 redirect 불필요
    scopes: 'name',
    state: crypto.randomUUID(),
    nonce: crypto.randomUUID(),
  };
  const response = await SignInWithApple.authorize(options);
  return {
    code: response.response.authorizationCode,
    identityToken: response.response.identityToken,
    user: {
      name:
        [response.response.givenName, response.response.familyName]
          .filter(Boolean)
          .join(' ') || undefined,
      email: response.response.email ?? undefined,
    },
  };
}
```

#### 4. 호출부 분기 (`apple-login.ts` 또는 `login-page.tsx`)

```ts
import { isIOS, loginWithAppleNative } from '@confeti/platform';

async function getAppleAuthData() {
  if (isIOS()) {
    return await loginWithAppleNative();
  }
  // 기존 window.AppleID.auth.signIn() 로직
  const result = await window.AppleID.auth.signIn();
  return mapToAppleAuthData(result);
}
```

## 백엔드

변경 없음. `/auth/login`이 이미 `{ code, redirectUrl, provider }` 페이로드를 받는 코드 기반 인증.

`auth-mutations.ts:18-72` 참조.

## 토큰 저장

ADR-008에 따라 이번 사이클은 **쿠키 그대로** 사용 (네이티브에서도 origin-scoped로 동작). Phase 4+ 보안 강화 시 `packages/platform/src/auth/token-store.ts` 활성화하여 Keychain/Keystore로 swap.

## 검증 체크리스트

iOS 시뮬레이터:

- [ ] 카카오 로그인 → 인앱 브라우저 → OAuth → 앱 복귀 → 토큰 저장 → `/my/profile` 200
- [ ] 애플 로그인 → 네이티브 시트 → 토큰 저장 → `/my/profile` 200
- [ ] 로그아웃 → 토큰 제거 → 재로그인 가능

Android 에뮬레이터:

- [ ] 카카오 로그인 동일 검증
- [ ] 애플 로그인 — 웹 OAuth 폴백 (Apple JS SDK)
- [ ] 시스템 뒤로가기 → 인앱 브라우저 닫힘

## 잠재 위험

| 위험                                          | 완화                                      |
| --------------------------------------------- | ----------------------------------------- |
| 카카오 콘솔 redirect URI 등록 누락            | Phase 4 시작 전 콘솔 확인                 |
| iOS App ID에 Sign in with Apple 미활성화      | Apple Developer 콘솔에서 활성화           |
| Android 키 해시 mismatch                      | debug/release 둘 다 등록                  |
| Browser.addListener('browserFinished') 미발화 | iOS는 `presentationStyle: 'popover'` 권장 |
| `appUrlOpen` 이벤트가 cold start 시 누락      | `App.getLaunchUrl()`로 초기 URL 확인      |
| 환경변수 추가 (KAKAO_REST_API_KEY 등)         | `.env.example` 갱신 필수                  |
