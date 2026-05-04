import type { CSSProperties, ElementType, ReactNode } from 'react';

type SafeAreaInsets = 'y' | 'top' | 'bottom' | 'none';

type Props = {
  children: ReactNode;
  subtract?: string;
  insets?: SafeAreaInsets;
  flexible?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
};

const INSETS_VAR: Record<SafeAreaInsets, string> = {
  y: 'var(--safe-area-y)',
  top: 'var(--safe-area-top)',
  bottom: 'var(--safe-area-bottom)',
  none: '0px',
};

export const AppSafeArea = ({
  children,
  subtract,
  insets = 'y',
  flexible = false,
  as: Tag = 'div',
  className,
  style,
}: Props) => {
  const heightValue = `calc(100dvh - ${subtract ?? '0px'} - ${INSETS_VAR[insets]})`;
  const heightStyle = flexible
    ? { minHeight: heightValue }
    : { height: heightValue };
  return (
    <Tag className={className} style={{ ...heightStyle, ...style }}>
      {children}
    </Tag>
  );
};
