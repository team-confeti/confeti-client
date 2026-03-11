# 콘서트 (Concert) — Requirements

> 실제 confeti 서비스에 게시된 콘서트 목록을 조회하고, 공연 정보를 수정할 수 있다.

**Figma**: [Admin 명세 — 콘서트](https://www.figma.com/design/LcVY1m4kQmMVDGaIPuiJJy/Admin-%EB%AA%85%EC%84%B8?node-id=28-2662)

---

## User Flow

1. `/concert` 접근 시 게시된 콘서트 목록 표시
2. "진행 예정 / 진행 중" 섹션과 "종료된 공연" 섹션으로 분류
3. 각 섹션에 해당 콘서트 갯수 표시
4. 콘서트 카드 클릭 → 공연 정보 수정 페이지로 이동
   - 종료된 공연에서도 클릭 가능
5. 정보 수정 후 "저장 및 게시" → confeti 서비스 내 공연 정보 업데이트

---

## 화면 구성

### 콘서트 목록

- **진행 예정 / 진행 중**: 카드 그리드 + 갯수 뱃지
- **종료된 공연**: 카드 그리드 + 갯수 뱃지 (반투명 오버레이)
- **빈 상태**: 섹션별 EmptyState 컴포넌트

### 카드 정보

- 공연 포스터 이미지
- 타입 뱃지 ("콘서트")
- 제목, 부제목
- 날짜, 장소
- 상태 뱃지 (게시됨 / 종료됨)

### 공연 정보 수정

- 대기 목록의 수기 등록과 동일한 폼 구조 사용 (라인업/타임테이블 탭 제외)
- 기존 입력 정보가 미리 채워진 상태로 진입
- 수정 후 "저장 및 게시" → 서비스 내 정보 업데이트

---

## 상태별 처리

| 상태    | 조건                    | 표시               |
| ------- | ----------------------- | ------------------ |
| Loading | 데이터 패칭 중          | 스켈레톤           |
| Empty   | 해당 섹션에 콘서트 없음 | EmptyState         |
| Error   | API 실패                | ErrorBoundary 전파 |
| Success | 정상                    | 카드 그리드 렌더   |

---

## API 연동

### 현재 (Mock)

```ts
import { CONCERTS } from '@shared/mocks';
// status === 'Scheduled' → 진행 예정/중, status === 'Completed' → 종료
```

### 목표 (Real API)

| Method | Endpoint                                   | 설명                    | END_POINT 상수                            |
| ------ | ------------------------------------------ | ----------------------- | ----------------------------------------- |
| GET    | `/admin/performances/concerts`             | 등록된 콘서트 목록 조회 | `END_POINT.GET_CONCERTS`                  |
| PUT    | `/admin/performances/concerts`             | 콘서트 등록/수정        | `END_POINT.PUT_CONCERT`                   |
| GET    | `/admin/performances/concerts/{concertId}` | 수정할 콘서트 단건 조회 | `END_POINT.GET_CONCERT_DETAIL(concertId)` |

- Query keys: `CONCERT_QUERY_KEY.LIST()`, `CONCERT_QUERY_KEY.DETAIL(concertId)`

---

## 구현 노트

- 페이지: `pages/concert/concert-page.tsx`
- 카드: `shared/components/performance/performance-card.tsx` (`PerformanceCard`)
- 수정 페이지: `PATH.PERFORMANCES.replace(':id', id)` 패턴
- 필터링: `status === 'Scheduled'` (진행 예정/중) vs `status === 'Completed'` (종료)
- 페스티벌과 거의 동일한 구조 (라인업/타임테이블 없음)

---

## 수용 기준 (Acceptance Criteria)

- [ ] 진행 예정/중인 콘서트 목록이 카드 그리드로 표시된다
- [ ] 종료된 콘서트 목록이 별도 섹션으로 표시된다
- [ ] 각 섹션에 콘서트 갯수가 표시된다
- [ ] 카드 클릭 시 공연 정보 수정 페이지로 이동한다
- [ ] 종료된 공연도 클릭하여 정보 확인/수정이 가능하다
- [ ] 수정 후 저장 및 게시 시 서비스 내 정보가 업데이트된다
- [ ] 빈 상태가 섹션별로 적절히 표시된다
