# Progress Log

마지막 업데이트: 2026-04-29

## 현재 위치

**Phase 1, Phase 2 완료**. Phase 3 surgical edit 진행 중 (kakao-map.ts, capture.ts).
**블로커 (사용자 작업 필요)**: Xcode 정식 버전 + CocoaPods + Android Studio (`env-setup.md`).
블로커 영역(`cap add ios/android`, 시뮬레이터 빌드, Phase 5 아이콘 생성)을 제외한 모든 작업 병행 진행 중.

ADR-008/009/010으로 Phase 3 스코프 축소: auth.ts와 storage 호출처는 이번 사이클 보류.

---

## Phase 0 — 환경 점검 & 브랜치 ✅

- [x] git status 확인 (`feat/admin-ux-overhaul` 위에 있던 것을 발견하여 회피)
- [x] 베이스 브랜치 확인 (`origin/develop`이 default)
- [x] 기존 stale Capacitor 브랜치 발견 및 분석 (`decisions.md` ADR-001 참조)
- [x] 새 브랜치 `feat/capacitor-shell-app` 생성 (origin/develop 기반)
- [x] 환경 점검: Node 22.20.0, pnpm 10.27.0 (둘 다 OK)
- [ ] **사용자 액션 대기**: Xcode 정식 버전 + CocoaPods 설치 (`env-setup.md`)
- [ ] **사용자 액션 대기**: Android Studio + SDK 33+ 확인

## Phase 1 — Capacitor 코어 셋업 ✅ (블로커 항목 제외)

- [x] `apps/client`에 Capacitor 의존성 추가 (catalog: @capacitor/core, @capacitor/cli + @capacitor/ios, @capacitor/android, @capacitor/assets)
- [x] `capacitor.config.ts` 작성 (`appId: com.confeti.app`, webDir: `dist`, server.iosScheme/androidScheme: `https`)
- [x] `apps/client/index.html` meta 추가 (viewport-fit=cover, theme-color, apple-mobile-web-app-\*, apple-touch-icon)
- [x] `apps/client/package.json` 모바일 스크립트 (`mobile:sync`, `mobile:ios`, `mobile:android`, `mobile:add:*`)
- [x] `apps/client/tsconfig.json` include에 capacitor.config.ts 추가
- [x] `.gitignore` 업데이트 (ios/Pods, ios/build, android/.gradle, android/build 등)
- [x] 웹 빌드 회귀 검증 통과 (2.53s)
- [ ] **iOS 툴체인 대기**: `pnpm --filter @confeti/client run mobile:add:ios`
- [ ] **iOS 툴체인 대기**: iOS 시뮬레이터에서 첫 빌드
- [ ] **Android Studio 대기**: `pnpm --filter @confeti/client run mobile:add:android`
- [ ] **Android Studio 대기**: Android 에뮬레이터에서 첫 빌드

## Phase 2 — `packages/platform` 패키지 구축 ✅

- [x] 패키지 스캐폴드 (`package.json`, `tsconfig.json`)
- [x] `runtime.ts` (isNative, isIOS, isAndroid, getPlatform)
- [x] `storage.ts` (localStorage / Capacitor Preferences) — async API
- [x] `auth/token-store.ts` (Phase 4+에서 활성화될 인메모리 캐시 + Preferences)
- [x] `share.ts` (Web Share / Capacitor Share+Filesystem)
- [x] `browser.ts` (window.open / Capacitor Browser)
- [x] `auth/kakao.ts` 인터페이스 stub
- [x] `auth/apple.ts` 인터페이스 stub
- [x] `index.ts` 배럴 export
- [x] ESLint 통과 (기존 `^@confeti/` 그룹이 자동 매칭)
- [x] `pnpm install` 워크스페이스 인식 + 타입체크 통과

## Phase 3 — 기존 코드 마이그레이션 (스코프 축소) ✅

- [x] `apps/client/src/pages/performance/utils/kakao-map.ts:122` — `isNative()` 분기 추가, `kakaomap://` deeplink + setTimeout 폴백
- [x] `apps/client/src/pages/timetable/utils/capture.ts` — `@confeti/platform`의 `shareImage`로 네이티브 분기 위임
- [ ] (시뮬레이터 검증 후 결정, ADR-010) `interceptor.ts` `redirectToLogin`

**보류 (ADR-008, 009 참조)**:

- ~~`packages/core/src/auth/auth.ts` storage 백엔드 분기~~ — 쿠키 그대로 동작 가능
- ~~`apps/client/src/shared/utils/recent-view.ts`~~ — localStorage가 WebView에서 동작
- ~~`apps/client/src/pages/search/hooks/use-recent-search.ts`~~ — 동일

## Phase 4 — 인증 플로우 네이티브 분기

> 접근 방식 변경 (2026-04-29, ADR-011): 카카오 콘솔이 커스텀 스킴 redirect URI를 거부함을 확인. 커스텀 스킴 직접 등록 대신 **HTTPS Redirect + Auth 브릿지 페이지로 커스텀 스킴 핸드오프**로 전환.

- [ ] 카카오 OAuth 플로우 InAppBrowser 구현 (`packages/platform/src/auth/kakao.ts`) — `redirect_uri`는 `https://confeti.co.kr/auth`
- [ ] **`/auth` 브릿지 라우트**: 네이티브 환경 감지 시 `window.location.href = 'com.confeti.app://auth?code=...'` 핸드오프 (웹 동작 무영향)
- [ ] iOS Info.plist `CFBundleURLTypes` 커스텀 스킴 등록 (앱 로컬 등록만)
- [ ] Android `intent-filter` 커스텀 스킴 등록 (앱 로컬 등록만)
- [ ] **사용자 액션 대기**: 카카오 디벨로퍼 콘솔 iOS Bundle ID + Android Package Name + Key Hash 등록 (Redirect URI 추가 등록 불필요 — 기존 HTTPS URI 재사용)
- [ ] 애플 네이티브 로그인 (`@capacitor-community/apple-sign-in`)
- [ ] iOS Xcode "Sign in with Apple" capability 추가
- [ ] **사용자 액션 대기**: Apple Developer 콘솔 App ID에 Sign in with Apple 활성화
- [ ] `login-page.tsx` 분기 호출
- [ ] iOS 시뮬레이터에서 카카오/애플 로그인 검증
- [ ] Android 에뮬레이터에서 카카오 로그인 검증

## Phase 5 — 아이콘 / 스플래시 / Safe Area (부분 완료)

- [x] **Safe area CSS 변수 + body padding 적용** (`apps/client/src/shared/styles/safe-area.css.ts` 신설)
- [x] `index.html`에 `viewport-fit=cover` 적용 (Phase 1)
- [ ] **iOS 툴체인 대기**: `apps/client/resources/icon.png` 1024×1024
- [ ] **iOS 툴체인 대기**: `apps/client/resources/splash.png` 2732×2732
- [ ] **iOS 툴체인 대기**: `npx @capacitor/assets generate` (cap sync 후)
- [ ] **iOS 툴체인 대기**: `@capacitor/splash-screen` 설치 + capacitor.config.ts plugins 설정
- [ ] (선택) iOS bounce scroll 비활성화, status bar 스타일

## Phase 6 — 회귀 검증

- [ ] `pnpm --filter @confeti/client dev` 정상
- [ ] `pnpm --filter @confeti/client build` 정상
- [ ] `pnpm lint` 0 에러
- [ ] `pnpm test` 통과
- [ ] `git diff apps/client/vercel.json` diff 없음
- [ ] `apps/client/.env`의 기존 키 변경 없음 확인
