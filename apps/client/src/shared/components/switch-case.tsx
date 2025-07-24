import { ReactElement } from 'react';

type StringifiedValue<T> =
  | (T extends boolean ? 'true' | 'false' : never)
  | (T extends number ? `${T}` : never)
  | (T extends string ? T : never);

type Props<Case> = {
  value: Case;
  caseBy: Partial<{ [P in StringifiedValue<Case>]: () => ReactElement | null }>;
  defaultComponent?: () => ReactElement | null;
};

/**
 * @description
 * `SwitchCase`는 주어진 값에 따라 다른 컴포넌트를 렌더링하는 컴포넌트입니다.
 * JavaScript의 `switch-case` 문처럼 동작합니다.
 *
 * @param value - 조건으로 사용할 값입니다.
 * @param caseBy - 각 값에 대응하는 컴포넌트를 매핑한 객체입니다.
 * @param defaultComponent - 일치하는 값이 없을 때 렌더링할 기본 컴포넌트입니다.
 * @returns 주어진 값에 따라 조건적으로 렌더링되는 React 컴포넌트를 반환합니다.
 *
 * @example
 * function App() {
 *   return (
 *     <SwitchCase
 *       value={status}
 *       // status 값에 따라 TypeA, TypeB 또는 TypeC를 렌더링합니다.
 *       caseBy={{
 *         a: () => <TypeA />,
 *         b: () => <TypeB />,
 *         c: () => <TypeC />,
 *       }}
 *       // status 값이 어떤 case와도 일치하지 않을 경우 Default 컴포넌트를 렌더링합니다.
 *       defaultComponent={() => <Default />}
 *     />
 *   );
 * }
 */
const SwitchCase = <Case,>({
  value,
  caseBy,
  defaultComponent = () => null,
}: Props<Case>): ReactElement | null => {
  const stringifiedValue = String(value) as StringifiedValue<Case>;
  return (caseBy[stringifiedValue] ?? defaultComponent)();
};

export default SwitchCase;
