# 대시보드 (Dashboard) — Requirements

> 관리자 앱 메인 화면. 대기 중인 공연, 등록된 페스티벌, 등록된 콘서트의 현황을 한눈에 파악하고 각 관리 페이지로 빠르게 이동할 수 있다.

**Figma**: [Admin 명세 — 대시보드](https://www.figma.com/design/LcVY1m4kQmMVDGaIPuiJJy/Admin-%EB%AA%85%EC%84%B8?node-id=16-146)

---

## 전체 레이아웃

대시보드 페이지는 공통 `Layout` 안에 렌더링된다 (`shared/components/layout/layout.tsx`).

```
┌─────────────────────────────────────────────────┐
│  Sidebar  │  Header (햄버거 + "대시보드" + 검색)  │
│           │─────────────────────────────────────│
│           │  Main Content                       │
│           │  ┌──────┐ ┌──────┐ ┌──────┐        │
│           │  │ 대기  │ │ 페스 │ │ 콘서 │        │
│           │  │ 중인  │ │ 티벌 │ │ 트   │        │
│           │  │ 공연  │ │      │ │      │        │
│           │  └──────┘ └──────┘ └──────┘        │
│           │                                     │
│  로그아웃  │                                     │
└─────────────────────────────────────────────────┘
```

레이아웃 관련 컴포넌트는 이미 구현되어 있으므로 대시보드 페이지 자체만 다룬다.

---

## 화면 구성

### 1. 통계 카드 (Stat Cards) — 3개, 가로 그리드 배치

각 카드는 기존 `DashboardCard` 컴포넌트 사용 (`shared/components/dashboard/dashboard-card.tsx`).

| 카드              | title               | variant    | icon (lucide-react) | 클릭 시 이동 | 데이터 의미                                                 |
| ----------------- | ------------------- | ---------- | ------------------- | ------------ | ----------------------------------------------------------- |
| ① 대기 중인 공연  | `"대기 중인 공연"`  | `pending`  | `ListMusic`         | `/pending`   | 아직 등록되지 않은 공연 수 (크롤링 + 수기 등록 예정)        |
| ② 등록된 페스티벌 | `"등록된 페스티벌"` | `festival` | `Tent`              | `/festival`  | 대기목록에서 '게시'되어 실제 서비스에 노출 중인 페스티벌 수 |
| ③ 등록된 콘서트   | `"등록된 콘서트"`   | `concert`  | `Music`             | `/concert`   | 대기목록에서 '게시'되어 실제 서비스에 노출 중인 콘서트 수   |

**카드 디자인 스펙 (Figma):**

- 크기: 가로 균등 3분할 (`repeat(3, 1fr)`), 높이 `17.4rem`
- border-radius: `1.4rem`
- border: `1px solid gray200`
- box-shadow: `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1)`
- hover: `translateY(-2px)`, shadow 확대, 아이콘 `scale(1.05)`
- 아이콘 배경색: pending → `yellow400`, festival → `purple400`, concert → `emerald400`
- 아이콘 wrapper: `4.8rem × 4.8rem`, border-radius `1rem`
- title: `1.4rem`, `medium`, `#6A7282`
- count: `3rem`, `bold`, `#101828`

**반응형:**

- `< 768px`: 1열 (`1fr`)
- `768px ~ 1023px`: 2열 (`repeat(2, 1fr)`)
- `≥ 1024px`: 3열 (`repeat(3, 1fr)`)

---

## User Flow

1. 사용자가 `/dashboard`로 접근 (또는 `/`에서 자동 리다이렉트)
2. 3개의 통계 카드에 현재 데이터 count가 표시됨
3. 각 카드 클릭 시 해당 관리 페이지로 이동:
   - "대기 중인 공연" → `/pending`
   - "등록된 페스티벌" → `/festival`
   - "등록된 콘서트" → `/concert`
4. 헤더의 검색 입력은 **대시보드에서는 비활성/무동작** — 검색은 대기 목록/페스티벌/콘서트 페이지에서만 필터링 동작 (오탈자 반영 불필요)

---

## 상태별 처리

| 상태    | 조건                        | 표시                                                  |
| ------- | --------------------------- | ----------------------------------------------------- |
| Loading | API에서 통계 데이터 패칭 중 | 카드 영역 스켈레톤 또는 count `—` 표시                |
| Error   | API 실패                    | ErrorBoundary 전파 (QueryClient `throwOnError: true`) |
| Success | 정상 응답                   | 각 카드에 count 숫자 표시                             |
| Zero    | count가 0                   | `0` 표시 (카드 자체는 동일하게 렌더)                  |

---

## API 연동

### 현재 상태 (Mock)

현재는 mock 데이터로 count를 계산 중:

```ts
import { CONCERTS, FESTIVALS, PENDING_ITEMS } from '@shared/mocks';
// count={PENDING_ITEMS.length}, count={FESTIVALS.length}, count={CONCERTS.length}
```

### 목표 상태 (Real API)

Query key는 이미 정의되어 있음 (`shared/constants/query-key.ts`):

```ts
DASHBOARD_QUERY_KEY.ALL; // ['dashboard']
DASHBOARD_QUERY_KEY.STATS; // ['dashboard', 'stats']
```

API 엔드포인트 (`shared/constants/api.ts`):

```ts
END_POINT.DASHBOARD.STATS; // GET — 대시보드 통계
```

**예상 응답 타입:**

```ts
interface DashboardStatsResponse {
  pendingCount: number; // 대기 중인 공연 수
  festivalCount: number; // 등록된 페스티벌 수
  concertCount: number; // 등록된 콘서트 수
}
```

**Query Options 패턴 (기존 컨벤션 준수):**

```ts
// shared/apis/dashboard-queries.ts
export const DASHBOARD_QUERY_OPTIONS = {
  STATS: () =>
    queryOptions({
      queryKey: DASHBOARD_QUERY_KEY.STATS,
      queryFn: getDashboardStats,
    }),
};
```

---

## 구현 노트

### 기존 파일 구조

```
pages/dashboard/
├── REQUIREMENTS.md          ← 이 문서
├── components/
│   ├── concert-dashboard.tsx    — 콘서트 테이블 뷰 (현재 미사용)
│   ├── festival-dashboard.tsx   — 페스티벌 테이블 뷰 (현재 미사용)
│   ├── dashboard.css.ts         — 테이블 스타일
│   ├── edit-concert-form.tsx
│   ├── edit-concert-form.css.ts
│   ├── edit-festival-form.tsx
│   └── edit-festival-form.css.ts
└── page/
    ├── dashboard-page.tsx       — 메인 대시보드 페이지 ✅
    ├── dashboard-page.css.ts    — 그리드 레이아웃 스타일 ✅
    ├── edit-concert-page.tsx
    ├── edit-concert-page.css.ts
    ├── edit-festival-page.tsx
    └── edit-festival-page.css.ts
```

### 참조해야 할 기존 패턴

- **DashboardCard 컴포넌트**: `shared/components/dashboard/dashboard-card.tsx` — 이미 variant 기반 아이콘 색상 지원
- **라우팅**: `shared/router/router.tsx` — `PATH.DASHBOARD` → `DashboardPage`
- **PATH 상수**: `shared/constants/path.ts` — 네비게이션에 사용
- **아이콘**: `lucide-react` 사용 (design-system 아이콘 아님)
- **테마 토큰**: `themeVars` from `@confeti/design-system/styles`
- **스타일링**: Vanilla Extract `*.css.ts` co-located

### Sidebar 관련 (공통 레이아웃 — 참고용)

사이드바는 `shared/components/layout/aside-navigation-menu.tsx`에서 관리:

| 메뉴            | icon              | path                  | 비고                           |
| --------------- | ----------------- | --------------------- | ------------------------------ |
| 대시보드        | `LayoutDashboard` | `/dashboard`          | 단독 섹션                      |
| — 공연 관리 —   | (섹션 라벨)       |                       |                                |
| 대기 목록       | `ListMusic`       | `/pending`            | 빨간 badge로 pendingCount 표시 |
| 페스티벌        | `Tent`            | `/festival`           |                                |
| 콘서트          | `Music`           | `/concert`            |                                |
| — 시스템 관리 — | (섹션 라벨)       |                       |                                |
| 예매처 관리     | `Ticket`          | `/ticketing-platform` |                                |
| 로그아웃        | `LogOut`          | —                     | footer 영역, 버튼              |

- active 상태: `location.pathname.startsWith(item.path)` 로 판별
- 확장/축소: `isExpanded` prop으로 텍스트/아이콘 전환
- badge: `pendingCount` prop → 현재 `PENDING_ITEMS.length` (mock)

---

## 수용 기준 (Acceptance Criteria)

### 핵심

- [ ] `/dashboard` 접근 시 3개의 통계 카드가 그리드로 표시된다
- [ ] 각 카드에 올바른 아이콘, 제목, count가 표시된다
- [ ] "대기 중인 공연" 카드 클릭 → `/pending`으로 이동
- [ ] "등록된 페스티벌" 카드 클릭 → `/festival`로 이동
- [ ] "등록된 콘서트" 카드 클릭 → `/concert`로 이동
- [ ] 카드 hover 시 디자인 스펙대로 elevation 변화

### API 전환 시

- [ ] mock 데이터 대신 `DASHBOARD_QUERY_OPTIONS.STATS()`로 실제 API 호출
- [ ] 사이드바 pending badge도 실제 API count로 전환
- [ ] 로딩 중 스켈레톤/placeholder 표시
- [ ] API 에러 시 ErrorBoundary로 전파

### 반응형

- [ ] 1024px 이상: 3열 그리드
- [ ] 768px ~ 1023px: 2열 그리드
- [ ] 768px 미만: 1열 그리드
