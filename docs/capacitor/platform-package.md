# `@confeti/platform` API Reference

`packages/platform/` — 네이티브/웹 분기를 격리하기 위한 추상화 패키지.
Capacitor SDK는 이 패키지 안에서만 import. 외부 호출자는 항상 이 패키지를 거친다.

## Why

- 호출부(`apps/client/**`)는 `Capacitor.*`를 직접 보지 않음 → 웹/앱 양쪽 코드가 깔끔.
- 네이티브 SDK 변경 시 영향 범위가 이 패키지로 한정.
- Phase 4 카카오/애플 네이티브 SDK 도입 시 호출부 수정 없이 내부 구현만 교체 가능.

## Imports

| 경로                                 | 용도                                    |
| ------------------------------------ | --------------------------------------- |
| `@confeti/platform`                  | 모든 공개 export 배럴                   |
| `@confeti/platform/runtime`          | 플랫폼 감지                             |
| `@confeti/platform/storage`          | 일반 key-value 저장소                   |
| `@confeti/platform/share`            | 공유 (텍스트/이미지)                    |
| `@confeti/platform/browser`          | 외부 링크/딥링크                        |
| `@confeti/platform/auth/token-store` | 토큰 시큐어 저장 (Phase 4+ 활성화 예정) |
| `@confeti/platform/auth/kakao`       | 카카오 네이티브 로그인 (Phase 4 stub)   |
| `@confeti/platform/auth/apple`       | 애플 네이티브 로그인 (Phase 4 stub)     |

`@confeti/` 그룹은 ESLint import-sort에서 React 그룹 다음에 위치 (8 그룹 패턴).

## API

### Runtime (`runtime.ts`)

```ts
isNative(): boolean              // Capacitor 네이티브 환경 여부
isIOS(): boolean
isAndroid(): boolean
getPlatform(): 'web' | 'ios' | 'android'
type Platform = 'web' | 'ios' | 'android'
```

**언제 쓰나**: 분기 첫 줄에서 한 번. 호출부는 보통 `if (isNative()) { ... } else { /* 기존 웹 로직 */ }` 패턴.

### Storage (`storage.ts`) — 일반 데이터

```ts
storage: PlatformStorage;
interface PlatformStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}
```

- 웹: `localStorage`
- 네이티브: `@capacitor/preferences` (UserDefaults / SharedPreferences)

**언제 쓰나**: `recent-view`, `recent-search` 같은 사용자 데이터를 네이티브에서도 영속해야 할 때.
**현재 사용처**: 없음 (ADR-009 — 기존 localStorage가 WebView에서 영속). Phase 4+ 마이그레이션 시 사용.

### Share (`share.ts`) — 공유

```ts
shareText({ title?, text?, url? }: ShareTextPayload): Promise<void>
shareImage({ filename, blob, title?, text? }: ShareImagePayload): Promise<void>
```

- 웹: `navigator.share()` (지원 시) / 미지원 시 throw
- 네이티브: `@capacitor/share` + 이미지는 `@capacitor/filesystem` Cache 디렉토리 임시 저장 후 share

**현재 사용처**: `apps/client/src/pages/timetable/utils/capture.ts` — 네이티브 분기에서 `shareImage`.

### Browser (`browser.ts`) — 외부 링크 / 딥링크

```ts
openExternalLink(url: string | OpenLinkOptions): Promise<void>
closeInAppBrowser(): Promise<void>
openAppUrl(url: string): void           // 동기, 딥링크 트리거
```

- `openExternalLink`:
  - 웹: `window.open(url, '_blank', 'noopener,noreferrer')`
  - 네이티브: `@capacitor/browser` (in-app SFSafariViewController / Custom Tabs)
- `openAppUrl`:
  - 웹: no-op
  - 네이티브: `window.location.href = url` — Capacitor의 WebView가 unknown scheme을 OS-level intent/UIApplication으로 위임 (Capacitor 7에서 `App.openUrl`이 제거됨에 따른 패턴).
  - **주의**: 앱 미설치 시 무반응. setTimeout 폴백 필수.

**현재 사용처**: `apps/client/src/pages/performance/utils/kakao-map.ts` — `kakaomap://route?...` deeplink + 900ms 폴백.

### Token Store (`auth/token-store.ts`) — 토큰 캐시

```ts
initTokenStore(): Promise<void>          // 앱 부팅 시 1회
getAccessTokenNative(): string | undefined
getRefreshTokenNative(): string | undefined
setTokensNative(access?, refresh?): void
removeTokensNative(): void
isTokenStoreInitialized(): boolean
```

**디자인**: 인메모리 캐시 + 비동기 `@capacitor/preferences`. `init`은 부팅 시 1회 await로 캐시 채움. 이후 호출은 동기 (interceptor가 동기 토큰 접근).

**현재 사용처**: 없음 (ADR-008 — 쿠키 기반 저장이 네이티브에서도 동작). Phase 4+ Keychain 강화 시 활성화.

활성화 방법 (Phase 4+):

1. `apps/client/src/main.tsx`에 `if (isNative()) await initTokenStore()` 추가
2. `packages/core/src/auth/auth.ts`의 `getAccessToken/getRefreshToken/authTokenHandler`에 `if (isNative()) return native....()` 분기 추가
3. (선택) Keychain 보안 강화 시 `@capacitor/preferences` → `capacitor-secure-storage-plugin`으로 swap (인터페이스 동일 유지)

### Auth Stubs

```ts
loginWithKakaoNative(): Promise<KakaoNativeLoginResult>     // 미구현
loginWithAppleNative(): Promise<AppleNativeLoginResult>     // iOS만, 미구현
```

Phase 4에서 채울 예정. 자세한 구현은 `auth-flow.md` 참조.

## 호출부 패턴

### 분기 패턴 1: 네이티브-only 추가

```ts
import { isNative } from '@confeti/platform';

async function doSomething() {
  if (isNative()) {
    // 네이티브 전용 로직
    return;
  }
  // 기존 웹 로직 그대로
}
```

### 분기 패턴 2: 함수 위임

```ts
import { shareImage } from '@confeti/platform';

// 웹/네이티브 모두 같은 호출, 함수 내부에서 분기
await shareImage({ filename: 'a.png', blob });
```

## 테스트 전략

`packages/platform`은 Capacitor 코어를 의존하므로 jsdom 단위 테스트엔 한계가 있다.

- Vitest 환경: `Capacitor.isNativePlatform()`이 false 반환 → 웹 분기 테스트 가능.
- 네이티브 분기 테스트는 mocking 필요 (Phase 4+).

## 의존성

```
@capacitor/core      — runtime
@capacitor/app       — App lifecycle (현재 미사용, Phase 4+ 딥링크 listener)
@capacitor/browser   — in-app browser
@capacitor/filesystem — 이미지 임시 저장
@capacitor/preferences — key-value 저장소
@capacitor/share     — 공유 시트
```

향후 추가 예정 (Phase 4):

- `@capacitor-community/apple-sign-in` (iOS 애플 로그인)
- `capacitor-secure-storage-plugin` (Keychain — ADR-008 재검토 시)
