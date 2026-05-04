# File Changes Tracker

작업이 진행되며 수정/추가된 파일을 시간순으로 기록. 각 변경은 **왜** 했는지 한 줄로 명시.

마지막 업데이트: 2026-04-28

## Added

### docs/capacitor/ (이 디렉토리)

- `README.md` — 작업 개요와 컨텍스트 진입점
- `progress.md` — Phase별 체크리스트
- `decisions.md` — ADR-001~007 결정 로그
- `env-setup.md` — 로컬 도구 셋업 가이드
- `file-changes.md` (이 파일) — 변경 추적
- `auth-flow.md` (Phase 4 작성 예정)
- `platform-package.md` (Phase 2 작성 예정)
- `verification.md` (Phase 6 작성 예정)

## Modified

### Capacitor core (Phase 1)

- `pnpm-workspace.yaml` — catalog에 `@capacitor/core ^7.4.4`, `@capacitor/cli ^7.4.4` 추가 (packages/platform과 apps/client 공유)
- `apps/client/package.json` — Capacitor deps (core/ios/android/cli/assets) + workspace dep `@confeti/platform` + 모바일 scripts (`mobile:sync`, `mobile:ios`, `mobile:android`, `mobile:add:ios`, `mobile:add:android`)
- `apps/client/tsconfig.json` — include에 `capacitor.config.ts` 추가 (LSP 진단 정상화)
- `apps/client/index.html` — `viewport-fit=cover`, theme-color, apple-mobile-web-app-\* meta, apple-touch-icon
- `.gitignore` — Capacitor iOS/Android 빌드 산출물

## Added

### Capacitor core (Phase 1)

- `apps/client/capacitor.config.ts` — appId `com.confeti.app`, appName `confeti`, webDir `dist`, server.iosScheme/androidScheme `https`, ios.contentInset `always`

### Platform abstraction (Phase 2) — `packages/platform/`

- `package.json` — `@confeti/platform`, deps: @capacitor/{core,app,browser,filesystem,preferences,share}
- `tsconfig.json` — extends `@confeti/typescript/react-library.json`
- `src/runtime.ts` — `isNative`, `isIOS`, `isAndroid`, `getPlatform`, `Platform` 타입
- `src/storage.ts` — async key-value (web: localStorage / native: Capacitor Preferences)
- `src/share.ts` — `shareText`, `shareImage` (web: navigator.share / native: Capacitor Share + Filesystem cache)
- `src/browser.ts` — `openExternalLink`, `closeInAppBrowser` (web: window.open / native: Capacitor Browser)
- `src/auth/token-store.ts` — Phase 4+ 활성화 대비 인메모리 캐시 + Preferences (현재 미연결, ADR-008)
- `src/auth/kakao.ts` — stub (Phase 4 InAppBrowser 구현 예정)
- `src/auth/apple.ts` — stub (Phase 4 @capacitor-community/apple-sign-in 예정)
- `src/index.ts` — 배럴 export

## Reverted

- `packages/core/package.json` — `@confeti/platform` dep 추가 후 ADR-008 결정으로 다시 제거 (쿠키 기반 토큰 저장이 네이티브에서도 동작하므로 core는 변경 불필요)
- `packages/platform/src/browser.ts` `openAppUrl` — 처음에 `App.openUrl` 사용했으나 Capacitor 7에서 제거된 API 발견. `window.location.href` 기반 동기 함수로 재작성 (Capacitor의 WKWebView/WebViewClient가 unknown scheme을 OS 위임)

### Migration (Phase 3) ✅

- `apps/client/src/pages/performance/utils/kakao-map.ts:1,122-130`
  - 분류: **Auth migration / Native UX**
  - Why: 카카오 맵 외부 호출. `isNative()`이면 `kakaomap://route?...`를 `openAppUrl()`로 호출 (Capacitor의 WebView가 OS-level deeplink로 위임), 900ms 내 reset 안 되면 시스템 브라우저로 mobile web URL 폴백.
  - 웹 path는 변경 없음 (UA 기반 분기 그대로).
- `apps/client/src/pages/timetable/utils/capture.ts:1,98-114`
  - 분류: **Native UX**
  - Why: 타임테이블 캡처 후 공유. `isNative()`이면 `@confeti/platform`의 `shareImage()`로 위임 (Filesystem.writeFile + Share.share). 웹은 기존 `navigator.canShare`/`link.click()` 폴백 그대로.

### Phase 2 platform package 보강

- `packages/platform/src/browser.ts:38-54` — `openAppUrl(url: string): void` 추가 (`window.location.href` 사용, Capacitor 의도된 동작)
- `packages/platform/src/index.ts` — `openAppUrl` re-export

### Native UX (Phase 5 부분) ✅

- `apps/client/src/shared/styles/safe-area.css.ts` (신설)
  - 분류: **Native UX**
  - Why: viewport-fit=cover + safe-area-inset env() 변수 정의 + body padding 적용. iOS 노치/홈 인디케이터 침범 방지.
  - 웹: `env()`가 0px 폴백되어 시각적 영향 없음.
- `apps/client/src/App.tsx:21-23` (변경) — `import '@shared/styles/safe-area.css'` 추가

---

## 변경 분류 가이드

| 분류                     | 의미                                       |
| ------------------------ | ------------------------------------------ |
| **Capacitor core**       | Capacitor 의존성/설정 그 자체              |
| **Platform abstraction** | `packages/platform` 신설 또는 그 위에 호출 |
| **Auth migration**       | 카카오/애플 로그인 네이티브 분기           |
| **Storage migration**    | localStorage / cookie → 추상화             |
| **Native UX**            | 아이콘, 스플래시, safe-area, 상태바        |
| **Regression guard**     | 웹 회귀 0 보장용 (분기/가드)               |
| **Tooling**              | ESLint, tsconfig, gitignore, turbo         |
