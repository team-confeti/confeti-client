# useEffect Naming

`useEffect`는 꼭 필요한 동기화 지점에서만 사용해요. 그리고 `useEffect(() => { ... })`처럼 익명 callback을 넘기지 않고, call site에서 의도가 바로 드러나는 이름 있는 함수를 전달해요.

## 기본 원칙

- `useEffect(function synchronizeSidebarExpansionWithViewport() { ... }, [deps])`처럼 inline named function expression을 기본으로 사용해요.
- 이름은 lifecycle이나 구현 디테일보다 "왜 존재하는지"를 설명하는 동사구로 작성해요.
- 이름만 읽어도 effect의 책임이 보여야 해요.

## 선호하는 이름

- `initializeMap`
- `registerKeyboardShortcuts`
- `synchronizeViewport`
- `trackScrollPosition`
- `restoreRecentSearches`

## 피하는 이름

- `handleEffect`
- `updateState`
- `syncData`
- `doSomethingOnChange`

이런 이름은 의도가 모호해서 effect 본문을 다시 읽게 만들어요.

## 이름이 이상하면 다시 점검해요

- 이름에 `and`, `also`가 필요하면 여러 책임이 섞였을 가능성이 커요. effect를 분리할 수 있는지 먼저 검토해요.
- `syncFullName`, `updateDerivedValue`처럼 내부 state를 옮겨 담는 느낌의 이름이 나오면 render 계산이나 event handler로 옮겨야 하는 로직인지 의심해봐요.

## cleanup 네이밍

cleanup이 non-trivial하다면 setup과 대칭되는 이름을 붙여요.

- `register/unregister`
- `start/stop`
- `subscribe/unsubscribe`

## ESLint

ESLint에서 익명 `useEffect` callback을 금지해요. 아래처럼 작성하면 lint error가 발생해요.

```tsx
useEffect(() => {
  synchronizeSomething();
}, [value]);
```

아래처럼 작성해요.

```tsx
useEffect(
  function synchronizeSomething() {
    synchronizeSomething();
  },
  [value],
);
```
