import type { CSSProperties, ElementType, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** 헤더 등 차감할 높이. 예: `'5rem'`, `'98px'`. */
  subtract?: string;
  /** 콘텐츠가 길어질 수 있으면 true (minHeight). 기본은 height 고정. */
  flexible?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

/**
 * 뷰포트 전체 높이에서 safe-area inset을 차감한 영역을 차지하는 래퍼.
 * subtract로 헤더 등 추가 차감 영역을 명시한다.
 */
export const AppSafeArea = ({
  children,
  subtract,
  flexible = false,
  as: Tag = 'div',
  className,
  style,
}: Props) => {
  const heightValue = `calc(100dvh - ${subtract ?? '0px'} - var(--safe-area-y))`;
  const heightStyle = flexible
    ? { minHeight: heightValue }
    : { height: heightValue };
  return (
    <Tag className={className} style={{ ...heightStyle, ...style }}>
      {children}
    </Tag>
  );
};
