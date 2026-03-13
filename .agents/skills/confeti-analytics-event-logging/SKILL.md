---
name: confeti-analytics-event-logging
description: Confeti client에서 Amplitude click/show 이벤트를 TS-first 규칙으로 추가할 때 사용.
license: MIT
metadata:
  author: codex
  version: '1.0.0'
---

# Confeti Analytics Event Logging Skill

## Use When

- `LogClickEvent`, `LogShowEvent`를 추가하거나 수정할 때
- `click-events.ts`, `show-events.ts`에 이벤트를 정의할 때

## Rules

- 이벤트 정의는 TS가 진실의 원천이다.
- 이벤트명은 `snake_case`로 작성한다.
- 이벤트명은 UI보다 사용자 행동과 노출 대상을 기준으로 정의한다.
- 값으로 바뀌는 정보는 이벤트명 대신 `params`로 보낸다.
- `show` 이벤트 정의는 항상 `name`, `type`, `params?` 형태를 따른다.
- `show.type`은 `'page' | 'component'` 중 하나다.

## Convention

- 이벤트명은 `snake_case`로 작성하고, UI가 아닌 사용자 행동과 노출 대상을 기준으로 정의해요.

## Files

- `apps/client/src/shared/analytics/events/click-events.ts`
- `apps/client/src/shared/analytics/events/show-events.ts`
- `apps/client/src/shared/analytics/events/types.ts`
- `apps/client/src/shared/analytics/logging.tsx`
- `apps/client/src/shared/analytics/track.ts`

## Examples

```ts
export const clickEvents = [
  {
    name: 'click_withdraw_confirm',
    params: {
      reason: { type: 'string', required: false },
    },
  },
] as const satisfies ClickEventDefinitions;
```

```ts
export const showEvents = [
  {
    name: 'show_withdraw_confirm_dialog',
    type: 'component',
  },
] as const satisfies ShowEventDefinitions;
```

```tsx
<LogShowEvent name="show_withdraw_confirm_dialog" />

<LogClickEvent name="click_withdraw_confirm" params={{ reason }}>
  <Button onClick={handleConfirm} />
</LogClickEvent>
```

## Avoid

- `track(...)`를 페이지 코드에서 직접 호출하는 것
- `show` 이벤트의 `type`을 사용처에서 직접 넘기는 것
- `_button`, `_icon` 같은 UI 맥락을 이벤트명에 사용하는 것
