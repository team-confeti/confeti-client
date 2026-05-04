# Decisions Log

각 결정은 ADR(Architecture Decision Record) 스타일로 기록한다. 결정의 결과가 시간이 지나며 무효화되면 새 ADR로 덮어쓴다 (이전 ADR은 Status를 Superseded로 변경).

---

## ADR-001: 기존 stale Capacitor 브랜치 사용 안 함, 깨끗하게 새로 시작

**Date**: 2026-04-28
**Status**: Accepted

### Context

원격에 `origin/feat/setting-capacitor/#623` 브랜치 발견 (이슈 #623, 마지막 커밋 2025-07-03). 3개 커밋으로 다음을 이미 구현:

- Capacitor 7.4.0 설치 (`@capacitor/core`, `@capacitor/cli`, `@capacitor/ios`)
- `apps/client/capacitor.config.ts` (`appId: com.confeti.app`, `appName: confeti`, `webDir: dist`)
- iOS Xcode 프로젝트 전체 (AppIcon 자산, Splash 자산 PNG 포함)
- 루트 `package.json`, `pnpm-lock.yaml` 변경

문제:

- develop이 171 커밋 ahead. cherry-pick 시 pnpm-lock.yaml 충돌 거의 확실.
- Capacitor 7.4.0 → 최신은 7.x 후반. 어차피 업데이트 필요.
- PR 미생성, 머지된 적 없음 → 사실상 abandoned.

### Decision

새 브랜치 `feat/capacitor-shell-app`을 origin/develop에서 새로 파고 깨끗하게 시작한다.

기존 브랜치에서 채택할 것:

- **`appId: com.confeti.app`** — 이미 결정된 식별자 그대로 사용 (기존 계획에서 `kr.co.confeti.app` 후보였으나 충돌 회피)
- **`appName: confeti`** — 동일
- **(선택) iOS 아이콘/스플래시 PNG 자산** — 디자인 변경 없으면 재활용 가능 (Phase 5에서 검토)

기존 브랜치에서 버릴 것:

- pnpm-lock.yaml diff (재설치)
- Capacitor 7.4.0 의존성 (최신 7.x로 재설치)

### Consequences

- 이력 충돌 없음, 깨끗한 PR.
- 기존 브랜치 작업 시간 일부 중복 (Capacitor 설치, iOS 프로젝트 생성).
- 그러나 그것들은 자동 생성물이고 수동 작업은 아님.
- 기존 브랜치는 archive 상태로 두고 PR 머지 후 삭제 권고.

---

## ADR-002: 셸 도구는 Capacitor 채택

**Date**: 2026-04-28
**Status**: Accepted

### Context

선택지:

- Capacitor (Ionic): JS/TS 생태계, React+Vite와 친화적
- Flutter + WebView: Dart 추가 학습, 큰 런타임
- React Native + WebView: 별 이점 없음
- TWA (Android만): iOS 불가

### Decision

Capacitor.

### Why

- 기존 React 19 + Vite 6 SPA 그대로 활용 (Dart 학습 비용 0)
- 같은 코드베이스로 웹/앱 운영 — `Capacitor.isNativePlatform()` 분기만 필요
- 플러그인 생태계 JS 친화적 (`@capacitor/share`, `@capacitor/preferences` 등)
- 앱 용량 작음 (3~10MB)
- 빠른 반복 + OTA 가능 (Capgo 등 차후 도입)

### Consequences

- iOS WKWebView 한계 그대로 옴 (Safari 엔진 제약).
- 단순 웹 래퍼로 보일 시 Apple 4.2 리젝 위험 → Phase 4 (네이티브 인증) + 이후 사이클 푸시/공유로 의미 있는 네이티브 기능 추가.

---

## ADR-003: 번들 모드 (앱이 dist를 패키징해서 가짐)

**Date**: 2026-04-28
**Status**: Accepted

### Context

선택지:

- 번들 모드: 앱 빌드 시 `dist/`를 앱 패키지에 포함, 네트워크 없이 로드
- 원격 URL 모드: 앱이 https://www.confeti.co.kr 을 그대로 로드
- 하이브리드: 둘 혼합

### Decision

번들 모드.

### Why

- 콜드 스타트 빠름 (네트워크 X)
- 오프라인 화면 노출 가능
- **Apple 4.2 심사 안전** — 단순 웹 래퍼로 보이지 않음
- 표준 Capacitor 사용 패턴

### Consequences

- 웹 코드 변경 시 앱 재배포 필요 (스토어 심사) → 차후 OTA 도구(Capgo) 검토.
- 앱 용량 약간 증가 (2~5MB).
- Vercel `confeti.co.kr → www` 리다이렉트가 앱에 영향 없음 (file:// 로딩이라 무관).

---

## ADR-004: 플랫폼 추상화는 새 패키지 `packages/platform`

**Date**: 2026-04-28
**Status**: Accepted

### Context

선택지:

- 새 패키지 `packages/platform`
- 기존 `packages/core` 확장
- `apps/client/src/shared/platform/`에 두기

### Decision

새 패키지 `@confeti/platform`.

### Why

- 관심사 분리: `core`는 http/auth 본연, `platform`은 OS API 분기
- admin 앱은 모바일 X — 의존성 격리 자연스러움
- 모노레포 패턴 일관성 (utils, design-system, core처럼)

### Consequences

- 패키지 1개 추가, ESLint import sort 그룹 한 줄 추가, tsconfig 하나 추가.
- 향후 `packages/platform`의 secure-storage / share 등 재사용성 ↑.

---

## ADR-005: 네이티브 카카오 로그인은 InAppBrowser 폴백 (커스텀 플러그인 X)

**Date**: 2026-04-28
**Status**: Superseded by ADR-011 (커스텀 스킴 직접 등록 불가)

### Context

카카오 OAuth 네이티브 옵션:

- A. 커스텀 Capacitor 플러그인 작성 (Kakao Native SDK 직접 연동) — Swift/Kotlin 1~2일 작업
- B. `@capacitor/browser`로 카카오 OAuth URL 인앱 브라우저로 열고 커스텀 스킴(`com.confeti.app://auth`)으로 redirect 받기 — 4~6시간

### Decision

옵션 B (InAppBrowser).

### Why

- 이번 사이클 스코프: 시뮬레이터까지. UX 정점은 다음 사이클.
- Native SDK는 시간 소요 + Swift/Kotlin 코드 유지보수 부담.
- 백엔드는 동일 `/auth/login`(코드 기반) → 변경 없음.

### Consequences

- 사용자 경험 살짝 떨어짐 (카카오 앱 → 우리 앱 자연 전환 X, 인앱 브라우저 한 단계 거침).
- 향후 옵션 A로 업그레이드 가능 (인터페이스 보존하면 호출부 무변경).

---

## ADR-006: appId는 `com.confeti.app`

**Date**: 2026-04-28
**Status**: Accepted

### Context

이전 계획에서 `kr.co.confeti.app` 후보였으나, 기존 stale 브랜치(`feat/setting-capacitor/#623`)가 이미 `com.confeti.app`으로 결정해서 iOS Xcode 프로젝트까지 만들어놓음.

### Decision

`com.confeti.app` 그대로 사용.

### Why

- 기존 작업과 일관성
- com.\* 형식이 더 표준적 (Apple 가이드도 reverse-domain notation 권장하고 .com 네임스페이스 흔함)
- 카카오/애플 콘솔 등록 시 변경 비용 ↑ — 일찍 확정

### Consequences

- 카카오 디벨로퍼 콘솔 iOS Bundle ID 등록 시 `com.confeti.app` 사용 (변경 X)
- Apple Developer App ID 등록 시 동일

---

## ADR-007: 시큐어 토큰 저장은 `capacitor-secure-storage-plugin` (Keychain/Keystore)

**Date**: 2026-04-28
**Status**: Superseded by ADR-008

### Context

네이티브 토큰 저장 옵션:

- `@capacitor/preferences` — 공식, 단순, 그러나 **암호화 X** (UserDefaults / SharedPreferences 평문)
- `capacitor-secure-storage-plugin` — community, Keychain (iOS) / EncryptedSharedPreferences (Android), 암호화 ✓
- 직접 커스텀 플러그인

### Decision (잠정)

`capacitor-secure-storage-plugin`. 일반 데이터(recent-view, recent-search)는 `@capacitor/preferences`.

### Why

- 토큰은 PII급 민감 정보 → 평문 저장 회피
- 커뮤니티 플러그인이지만 충분히 성숙

### Consequences / Risks

- 커뮤니티 플러그인 의존성 — 유지보수 리스크 ↓ (Phase 2에서 GitHub 활동도 재확인).
- 만약 이슈 발견 시 `@capacitor/preferences`로 폴백 가능 (단, 보안 트레이드오프 사용자 합의 필요).

---

## ADR-008: 이번 사이클에서 `auth.ts` 토큰 저장 마이그레이션 보류 (쿠키 그대로)

**Date**: 2026-04-29
**Status**: Accepted (이번 사이클 한정, ADR-007을 supersede)

### Context

당초 계획(Phase 3-1)은 `packages/core/src/auth/auth.ts`의 토큰 저장을 네이티브에서 secure storage로 분기. 그러나 분석해보니:

1. `capacitor.config.ts`에 `server.iosScheme: 'https'`, `server.androidScheme: 'https'` 설정 → Capacitor 네이티브 origin이 `https://localhost`
2. 기존 `auth.ts`의 `COOKIE_DOMAIN` 로직은 confeti.co.kr 도메인이 아닐 때 `undefined` 반환 → 네이티브에서도 자연스럽게 origin-scoped 쿠키로 동작
3. iOS WKWebView, Android WebView 모두 쿠키 영속 지원 (앱 재시작 후에도 유지)

즉, 코드 변경 0으로 네이티브에서도 토큰 저장이 동작.

### Decision

이번 사이클에서 `auth.ts`를 변경하지 않는다. `packages/platform/src/auth/token-store.ts`는 만들어둔 채로 유지하되, **연결하지 않음** — Phase 4+에서 Keychain 보안 강화 결정 시 사용.

### Why

- "최대한 수정 없이" 원칙 부합
- 회귀 위험 0
- 이번 사이클 스코프가 시뮬레이터까지라 PII 탈취 위협 모델이 약함
- 향후 secure-storage 마이그레이션 비용은 여전히 동일 (token-store API가 이미 존재)

### Consequences

- **Risk**: WebView 쿠키는 Keychain만큼 안전하지 않음. iOS WebView 데이터는 사용자가 앱 데이터 삭제로 지울 수 있음 (정상 동작이지만 일부 케이스 사용자 경험 저하).
- 스토어 출시 전에 Keychain 마이그레이션 권고 (별도 사이클).
- `packages/core/package.json`에서 `@confeti/platform` dep 추가 보류 (사용처 없음).

---

## ADR-009: `recent-view` / `recent-search`의 localStorage → Preferences 마이그레이션 보류

**Date**: 2026-04-29
**Status**: Accepted (이번 사이클 한정)

### Context

당초 계획(Phase 3-6)은 두 파일의 localStorage를 비동기 Preferences API로 전환:

- `apps/client/src/shared/utils/recent-view.ts`
- `apps/client/src/pages/search/hooks/use-recent-search.ts`

그러나 분석해보니 localStorage는 iOS WKWebView, Android WebView에서 **정상 영속 동작**. 사용자 데이터(최근 본 공연, 최근 검색어)는 네이티브 코드에서 접근할 필요 없는 web-only 정보.

### Decision

변경하지 않는다.

### Why

- 동작에 문제 없음 (localStorage는 WebView 컨텍스트에 격리되지만 영속성은 유지)
- 동기 → 비동기 전환은 호출부 다수 변경 야기 (useEffect 추가 등) — "최대한 수정 없이" 원칙 위배
- 네이티브 코드와 공유할 필요 없음

### Consequences

- 네이티브에서도 동일 UX 유지
- 향후 네이티브 코드(예: Share Extension, Widget)에서 이 데이터를 봐야 하는 시나리오 발생하면 그때 마이그레이션
- `packages/platform/src/storage.ts`는 만들어두되, 이번 사이클에선 호출처 0

---

## ADR-010: `interceptor.ts` `redirectToLogin` — 네이티브 처리 방식

**Date**: 2026-04-29
**Status**: Tentative (Phase 3 진행 중 결정)

### Context

현재 `redirectToLogin()`은 `window.location.href` 기반 리다이렉트.
네이티브에선 SPA + bundled mode이므로 `window.location.href`가 외부 URL을 가리키지 않는 한 작동은 함 (같은 origin 내 라우트 변경).

확인 필요:

- `window.location.href = '/login'` 같은 root-relative URL이 Capacitor https://localhost origin에서도 동일 origin으로 인식되는지
- 인식된다면 React Router가 popstate 잡아서 매끄럽게 처리하는지

### Decision (잠정)

**먼저 그대로 두고**, 시뮬레이터에서 실 동작 확인. 문제가 있으면 router navigate 주입 패턴으로 변경.

이렇게 하면 Phase 3는 kakao-map.ts와 capture.ts 두 파일만 수정.

### Why

- 검증 전 추측 마이그레이션 회피
- 만약 동작하면 변경 0 → 회귀 위험 0
- 동작 안 하면 그때 수정 (Phase 4 인증 플로우 검증 시 자연스럽게 발견)

---

## ADR-011: 카카오 OAuth 콜백은 HTTPS Redirect + Auth 브릿지 페이지로 커스텀 스킴 핸드오프

**Date**: 2026-04-29
**Status**: Accepted (ADR-005를 supersede)

### Context

ADR-005는 카카오 OAuth `redirect_uri`로 커스텀 스킴 `com.confeti.app://auth`를 직접 등록하려 했다. 그러나 카카오 디벨로퍼스 콘솔(REST API 키 → 카카오 로그인 리다이렉트 URI)에서 커스텀 스킴 입력 시 **"유효하지 않은 URL입니다"** 로 거부됨 (2026-04-29 확인). 카카오는 redirect URI를 http/https 스킴으로만 허용하도록 정책을 두고 있다.

대안 비교:

- **A. Native SDK + 커스텀 Capacitor 플러그인**: redirect URI 등록 자체가 불필요, UX 최상. 단점: Swift/Kotlin 1~2일 + 유지보수 부담.
- **B. Universal Links / App Links**: HTTPS URI를 OS가 가로채 앱으로 전달. 단점: `apple-app-site-association` / `assetlinks.json` 호스팅, Apple Developer 콘솔 Associated Domains 활성화, Xcode capability 추가 등 셋업 비용 큼.
- **C. Auth 브릿지 페이지 + 커스텀 스킴 핸드오프**: 카카오엔 기존 HTTPS URI(`https://confeti.co.kr/auth`) 그대로 등록. `/auth` 페이지가 네이티브 환경 감지 시 `window.location.href = 'com.confeti.app://auth?code=...'`로 커스텀 스킴 핸드오프. 커스텀 스킴은 iOS Info.plist / Android intent-filter에만 등록(앱 로컬, 카카오 무관). `SFSafariViewController`/`@capacitor/browser`는 커스텀 스킴 만나면 OS에 위임 → 앱 열림 + 브라우저 닫힘.

### Decision

옵션 C (Auth 브릿지 페이지).

### Why

- **카카오 콘솔 추가 등록 0**: 기존 `https://confeti.co.kr/auth`가 이미 등록되어 있어 그대로 재사용
- **백엔드 변경 0**: `/auth/login`(코드 기반) 그대로
- **외부 호스팅 작업 0**: `.well-known/*` 파일, Apple Developer 콘솔 Associated Domains 등 불필요
- **모든 변경이 이 레포 안**: 브릿지 라우트 분기 한 곳 + 네이티브 매니페스트 + `packages/platform/src/auth/kakao.ts` 구현
- Universal Links 대비 셋업 단순, Native SDK 대비 Swift/Kotlin 부재

### Consequences

- 인앱 브라우저 한 단계 거치는 UX는 ADR-005와 동일 (변동 없음)
- 브릿지 페이지가 React 라우트로 마운트되는 시점에 네이티브 분기 코드가 실행되어야 함 → `/auth` 라우트의 컴포넌트에 `useEffect`로 감지 + 즉시 redirect
- 웹 동작 회귀 방지: 네이티브가 아닐 땐 기존 로직 그대로
- 같은 패턴을 애플 로그인의 Android 폴백에도 재사용 가능
- 향후 Universal Links로 격상하더라도 이 패턴은 폴백으로 남길 수 있음
