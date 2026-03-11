# 대시보드 (Dashboard) — Requirements

> 관리자 앱 메인 화면. 대기 중인 공연, 등록된 페스티벌, 등록된 콘서트의 현황을 한눈에 파악하고 각 관리 페이지로 빠르게 이동할 수 있다.

**Figma**: [Admin 명세 — 대시보드](https://www.figma.com/design/LcVY1m4kQmMVDGaIPuiJJy/Admin-%EB%AA%85%EC%84%B8?node-id=16-146)

---

## User Flow

1. 사용자가 `/dashboard`로 접근 (또는 `/`에서 자동 리다이렉트)
2. 3개의 통계 카드에 현재 데이터 count가 표시됨
3. 각 카드 클릭 시 해당 관리 페이지로 이동:
   - "대기 중인 공연" → `/pending`
   - "등록된 페스티벌" → `/festival`
   - "등록된 콘서트" → `/concert`
4. 헤더의 검색은 대시보드에서는 동작하지 않음 — 대기 목록/페스티벌/콘서트 페이지에서만 필터링 동작

---

## 화면 구성

### 통계 카드 — 3개, 가로 그리드 배치

| 카드            | 클릭 시 이동 | 데이터 의미                                          |
| --------------- | ------------ | ---------------------------------------------------- |
| 대기 중인 공연  | `/pending`   | 아직 등록되지 않은 공연 수 (크롤링 + 수기 등록 예정) |
| 등록된 페스티벌 | `/festival`  | '게시'되어 실제 서비스에 노출 중인 페스티벌 수       |
| 등록된 콘서트   | `/concert`   | '게시'되어 실제 서비스에 노출 중인 콘서트 수         |

---

## 상태별 처리

| 상태    | 조건                | 표시                         |
| ------- | ------------------- | ---------------------------- |
| Loading | 통계 데이터 패칭 중 | 스켈레톤 또는 count `—` 표시 |
| Error   | API 실패            | ErrorBoundary 전파           |
| Success | 정상 응답           | 각 카드에 count 숫자 표시    |
| Zero    | count가 0           | `0` 표시 (카드 자체는 동일)  |

---

## API 연동

### 현재 (Mock)

```ts
import { CONCERTS, FESTIVALS, PENDING_ITEMS } from '@shared/mocks';
```

### 목표 (Real API)

대시보드 전용 통계 API는 없음. 각 도메인의 목록 조회 API 응답에서 count를 파생한다.

| Method | Endpoint                        | 설명                      | END_POINT 상수            |
| ------ | ------------------------------- | ------------------------- | ------------------------- |
| GET    | `/admin/performances/drafts`    | 대기 공연 목록 조회       | `END_POINT.GET_DRAFTS`    |
| GET    | `/admin/performances/festivals` | 등록된 페스티벌 목록 조회 | `END_POINT.GET_FESTIVALS` |
| GET    | `/admin/performances/concerts`  | 등록된 콘서트 목록 조회   | `END_POINT.GET_CONCERTS`  |

- Query keys: `DRAFT_QUERY_KEY.LIST()`, `FESTIVAL_QUERY_KEY.LIST()`, `CONCERT_QUERY_KEY.LIST()`
- 각 응답의 `data.length` 또는 응답 내 `totalCount` 필드로 카드 count 표시

---

## 구현 노트

- 기존 `DashboardCard` 컴포넌트 사용 (`shared/components/dashboard/dashboard-card.tsx`)
- 라우팅: `shared/router/router.tsx` — `PATH.DASHBOARD`
- 아이콘: `lucide-react` (`ListMusic`, `Tent`, `Music`)
- 스타일: Vanilla Extract, `themeVars` from `@confeti/design-system/styles`

---

## 수용 기준 (Acceptance Criteria)

- [ ] `/dashboard` 접근 시 3개의 통계 카드가 표시된다
- [ ] 각 카드에 올바른 아이콘, 제목, count가 표시된다
- [ ] 각 카드 클릭 시 해당 관리 페이지로 이동한다
- [ ] API 전환 시 mock 대신 실제 API 호출로 교체된다
- [ ] 로딩/에러/빈 상태가 적절히 처리된다
