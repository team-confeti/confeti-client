# 예매처 관리 (Ticketing Platform) — Requirements

> 공연 등록 시 사용할 예매처(인터파크, YES24 등) 목록을 관리한다. 로고와 이름을 등록/삭제할 수 있다.

**Figma**: [Admin 명세 — 예매처 관리](https://www.figma.com/design/LcVY1m4kQmMVDGaIPuiJJy/Admin-%EB%AA%85%EC%84%B8?node-id=29-2)

---

## User Flow

### A. 예매처 목록 조회

1. `/ticketing-platform` 접근 시 등록된 예매처 목록 표시
2. 각 예매처에 로고 이미지 + 이름 표시
3. 예매처가 없으면 빈 상태 UI

### B. 예매처 추가

1. "예매처 추가" 버튼 클릭 → 인라인 추가 폼 생성
2. 예매처 로고 업로드 (PNG)
3. 예매처 이름 텍스트 입력
4. "등록" 클릭 → 예매처 목록에 추가
5. "삭제" (등록 전) → 입력 정보 모두 삭제, 폼 닫기

### C. 예매처 수정

1. 기존 예매처 더블클릭 → 수정 폼 전환
2. 로고/이름 수정 후 "수정" 클릭

### D. 예매처 삭제

1. 목록의 삭제 버튼 클릭 → 해당 예매처 삭제

---

## 화면 구성

### 예매처 목록

- **헤더**: "예매처 관리" 제목 + 설명 + "예매처 추가" 버튼
- **그리드**: 카드형으로 예매처 나열 (로고 + 이름)
- **빈 상태**: Ticket 아이콘 + "등록된 예매처가 없습니다."

### 추가/수정 폼 (인라인)

- 로고 업로드 영역 (PNG)
- 이름 입력 필드
- 등록/수정 버튼 + 닫기(X) 버튼

---

## 상태별 처리

| 상태    | 조건               | 표시                |
| ------- | ------------------ | ------------------- |
| Empty   | 등록된 예매처 없음 | EmptyState 컴포넌트 |
| 폼 열림 | 추가/수정 모드     | 인라인 폼 카드 표시 |
| Error   | API 실패           | ErrorBoundary 전파  |
| Success | 정상               | 카드 그리드 렌더    |

---

## API 연동

### 현재 (Mock)

```ts
import { TICKETING_PLATFORMS } from '@shared/mocks';
```

### 목표 (Real API)

| Method | Endpoint                                 | 설명             | END_POINT 상수                                   |
| ------ | ---------------------------------------- | ---------------- | ------------------------------------------------ |
| GET    | `/admin/ticket-vendors`                  | 예매처 전체 조회 | `END_POINT.GET_TICKET_VENDORS`                   |
| POST   | `/admin/ticket-vendors`                  | 예매처 생성      | `END_POINT.POST_TICKET_VENDOR`                   |
| PATCH  | `/admin/ticket-vendors/{ticketVendorId}` | 예매처 수정      | `END_POINT.PATCH_TICKET_VENDOR(ticketVendorId)`  |
| DELETE | `/admin/ticket-vendors/{ticketVendorId}` | 예매처 삭제      | `END_POINT.DELETE_TICKET_VENDOR(ticketVendorId)` |

- Query key: `TICKET_VENDOR_QUERY_KEY.LIST()`

---

## 구현 노트

- 페이지: `pages/ticketing-platform/ticketing-platform-page.tsx`
- 로고 업로드: `shared/utils`의 `validateLogoFile`, `fileToBase64` 사용
- 폼 모드: `create` / `edit` 로컬 상태로 관리 (`useState`)
- 수정 진입: 더블클릭으로 편집 폼 전환
- 로고 형식: PNG만 허용

---

## 수용 기준 (Acceptance Criteria)

- [ ] 등록된 예매처가 카드 그리드로 표시된다
- [ ] "예매처 추가" 클릭 시 인라인 추가 폼이 생성된다
- [ ] 로고를 PNG로 업로드할 수 있다
- [ ] 예매처 이름을 입력하고 등록할 수 있다
- [ ] 등록 전 삭제 시 입력 정보가 모두 초기화된다
- [ ] 기존 예매처를 더블클릭하여 수정할 수 있다
- [ ] 예매처를 삭제할 수 있다
- [ ] 예매처가 없으면 빈 상태 UI가 표시된다
