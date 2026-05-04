# CONFETI Capacitor 셸 앱 전환

**브랜치**: `feat/capacitor-shell-app` (origin/develop 기반)
**시작일**: 2026-04-28
**현재 단계**: Phase 1, 2, 3 ✅ / Phase 5 부분 완료 / Phase 4 + Phase 5 잔여는 사용자 액션 대기

## 🎯 다음 사용자 액션 (블로커 해소)

1. **Xcode 라이선스 동의** (Xcode가 막 설치됨)
   ```
   sudo xcodebuild -license
   ```
   → space로 약관 스크롤 → `agree` 입력
2. **CocoaPods 설치**
   ```
   brew install cocoapods
   pod --version
   ```
3. **Android Studio + SDK 33+** (`env-setup.md` 참조)

위 셋업 완료 후:

```
cd apps/client
pnpm run mobile:add:ios       # ios/ Xcode 프로젝트 생성
pnpm run mobile:add:android   # android/ Android 프로젝트 생성
pnpm run mobile:sync          # build + cap sync
pnpm run mobile:ios           # Xcode 열림 → ▶ 빌드
pnpm run mobile:android       # Android Studio 열림 → ▶ 빌드
```

## 완료된 작업 요약

✅ **Phase 1** — Capacitor 7.4.4 (core/ios/android/cli/assets) 설치, `capacitor.config.ts` (`appId: com.confeti.app`), index.html 메타, .gitignore, 모바일 스크립트.
✅ **Phase 2** — `packages/platform` 신설 (runtime, storage, share, browser, token-store stub, kakao/apple stub).
✅ **Phase 3 (스코프 축소)** — `kakao-map.ts`, `capture.ts` 네이티브 분기. ADR-008/009로 auth.ts와 storage 호출처 마이그레이션 보류.
✅ **Phase 5 (부분)** — `apps/client/src/shared/styles/safe-area.css.ts` 추가, App.tsx import.

🔍 **회귀 검증 통과**:

- `pnpm --filter @confeti/client build` 2.63s, dist 산출물 정상
- `pnpm lint` 0 errors (10 pre-existing warnings 무관)
- `pnpm --filter @confeti/core test` 28/28 passed
- `pnpm --filter @confeti/platform exec tsc --noEmit` 통과

⚠️ **알려진 문제 (제 작업 무관)**:

- `packages/utils`의 `format-date.test.ts:72` Dday 테스트가 `D-4 vs D-5` 시간대 flaky. KST 자정 근처에서 toISOString이 UTC로 변환되며 1일 차이. 향후 픽스 권장 (이번 PR 범위 외).

## 목표

하나의 React 코드베이스로 **웹과 iOS/Android 셸 앱을 동시 운영**한다.

- 웹: 기존 `www.confeti.co.kr` (Vercel) 그대로 유지
- 앱: 같은 React 빌드를 Capacitor로 패키징해서 iOS/Android 스토어 배포 (이번 사이클은 시뮬레이터까지)

## 이번 사이클 스코프

✅ 포함:

- iOS + Android 시뮬레이터에서 앱 실행
- 카카오/애플 로그인 네이티브 분기
- 토큰 시큐어 저장
- 앱 아이콘 + 스플래시 + safe-area
- `packages/platform` 추상화 패키지 신설

❌ 제외 (다음 사이클):

- 푸시 알림 (FCM)
- Universal Links / App Links 딥링크
- 실기기 빌드 / TestFlight / 스토어 등록
- OTA 업데이트 도구

## 문서 구성

| 파일                  | 용도                                  |
| --------------------- | ------------------------------------- |
| `README.md` (이 파일) | 개요 + 현재 상태                      |
| `progress.md`         | Phase별 체크리스트, 진행 상황         |
| `decisions.md`        | 결정 로그 (ADR-style)                 |
| `env-setup.md`        | 로컬 환경 요구사항, 설치 가이드       |
| `file-changes.md`     | 어떤 파일을 왜 수정/추가했는지 추적   |
| `auth-flow.md`        | 카카오/애플 네이티브 인증 플로우 설계 |
| `platform-package.md` | `@confeti/platform` API 설계          |
| `verification.md`     | 단계별 검증 방법                      |

## 참조

- 원본 계획: `~/.claude/plans/confeti-client-capacitor-scalable-zebra.md`
- 기존 stale 브랜치: `origin/feat/setting-capacitor/#623` (참고용 자산만 활용, decisions.md 참조)

## 빠른 명령

```bash
# 웹 회귀 검증
pnpm --filter @confeti/client dev
pnpm --filter @confeti/client build
pnpm lint

# 모바일 빌드 (Phase 1 완료 후)
cd apps/client
pnpm run mobile:sync
pnpm run mobile:ios       # Xcode 열림
pnpm run mobile:android   # Android Studio 열림
```
