# Verification Guide

각 Phase 완료 시 회귀 검증 절차. **순서대로 모두 통과해야 다음 Phase 진행.**

## Phase 1, 2, 3, 5(부분) 완료 시점 — 현재 검증

웹 회귀 0:

```bash
# Type check
pnpm --filter @confeti/client exec tsc --noEmit
pnpm --filter @confeti/platform exec tsc --noEmit
pnpm --filter @confeti/core exec tsc --noEmit
pnpm --filter @confeti/utils exec tsc --noEmit

# Lint
pnpm lint
# 결과: 0 errors. Warning 10개는 기존 코드의 react-hooks/exhaustive-deps (무관).

# Build
pnpm --filter @confeti/client build
# 결과: dist/ 생성, 빌드 시간 ~2.6s, main chunk ~1.35MB.

# Tests
pnpm --filter @confeti/core test -- --run
pnpm --filter @confeti/utils test -- --run

# Dev server (수동 확인)
pnpm --filter @confeti/client dev
# → http://localhost:5173 접속, 기존 동작 그대로 확인
```

확인:

- [ ] `apps/client/vercel.json` 변경 없음 (`git diff apps/client/vercel.json`)
- [ ] `apps/client/.env`의 기존 키 변경 없음
- [ ] 파일 크기: `dist/assets/index-*.js`가 1.35MB ± 50KB 수준 (Capacitor 런타임 포함분 +11KB가 정상)

## Phase 1 잔여 (iOS/Android 시뮬레이터)

블로커 해소 후:

```bash
cd apps/client
pnpm run mobile:add:ios       # ios/ 디렉토리 생성
pnpm run mobile:add:android   # android/ 디렉토리 생성
pnpm run mobile:sync          # build + cap sync
pnpm run mobile:ios           # Xcode 열림
pnpm run mobile:android       # Android Studio 열림
```

iOS 시뮬레이터 (Xcode ▶):

- [ ] 흰 화면 없이 홈 화면 노출
- [ ] safe-area: 노치/홈 인디케이터 침범 없음
- [ ] 콘솔(Safari Web Inspector)에서 JS 에러 0
- [ ] 비로그인 상태로 메인/검색/온보딩 둘러보기 동작

Android 에뮬레이터 (Android Studio ▶):

- [ ] 동일
- [ ] 시스템 뒤로가기 버튼 → 라우터 history 정상

## Phase 4 (인증 플로우) 검증

`auth-flow.md` 검증 체크리스트 참조.

## Phase 5 잔여 (아이콘/스플래시) 검증

```bash
cd apps/client
pnpm run mobile:sync
npx @capacitor/assets generate
```

- [ ] `ios/App/App/Assets.xcassets/AppIcon.appiconset` 갱신
- [ ] `android/app/src/main/res/mipmap-*/ic_launcher*.png` 갱신
- [ ] iOS 시뮬레이터 홈 화면에서 confeti 아이콘 노출
- [ ] Android 에뮬레이터 앱 드로어에서 동일

## 작은 회귀 테스트 시나리오 (수동)

웹 (chrome dev):

- [ ] 카카오 로그인 → /my/profile 정상
- [ ] 검색 → 최근 검색어 저장 (localStorage)
- [ ] 콘서트 상세 → 카카오맵 외부 호출 (web 새 탭)
- [ ] 타임테이블 캡처 → 다운로드 (또는 Web Share)

iOS 시뮬레이터:

- [ ] 같은 카카오 로그인 시나리오 (Phase 4 완료 후)
- [ ] 카카오맵 외부 호출 — 시뮬레이터엔 카카오맵 없으므로 mobile web fallback 동작
- [ ] 타임테이블 캡처 → 시스템 공유 시트 노출

Android 에뮬레이터:

- [ ] 동일

## 주의 사항

- **Capacitor sync 빠뜨림 주의**: `pnpm build` 후 반드시 `cap sync` 안 하면 dist가 앱에 반영 안 됨. `mobile:sync` 스크립트가 둘을 묶어줌.
- **iOS Pods 누락**: 처음 `cap add ios` 후 `cd ios/App && pod install` 필요. `cap sync ios`도 자동 실행.
- **Android local.properties**: 처음 Android Studio 열 때 SDK 경로 자동 생성. CI에선 ANDROID_HOME 환경변수 필요.
- **Capacitor sync 후 Xcode rebuild**: 코드 변경 시 `cap sync` → Xcode Clean Build Folder (Shift+Cmd+K) → 다시 빌드 권장.
