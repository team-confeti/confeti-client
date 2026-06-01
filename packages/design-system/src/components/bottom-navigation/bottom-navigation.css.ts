import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { themeVars } from '../../styles';

export const root = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
  backdropFilter: 'blur(0.5rem)',
  WebkitBackdropFilter: 'blur(0.5rem)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderTop: `0.05rem solid ${themeVars.color.white}`,
  boxShadow: '0 -0.2rem 1rem rgba(0, 0, 0, 0.05)',
});

export const list = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

export const item = recipe({
  base: [
    {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.2rem',
      padding: '1rem 1.6rem',
      // 고정폭 금지: 가용 폭을 균등 분배해야 넓어질수록 탭 간격이 벌어진다.
      flex: 1,
      minWidth: 0,
      minHeight: '4.4rem',
      cursor: 'pointer',
      border: 0,
      background: 'transparent',
      textDecoration: 'none',
      transition: 'color 0.2s ease',
      selectors: {
        '&:focus': { outline: 'none' },
        '&:focus-visible': {
          outline: `0.2rem solid ${themeVars.color.confeti_lime}`,
          outlineOffset: '-0.2rem',
          borderRadius: '0.4rem',
        },
      },
      '@media': {
        '(prefers-reduced-motion: reduce)': {
          transition: 'none',
        },
      },
    },
  ],
  variants: {
    state: {
      active: { color: themeVars.color.gray900 },
      inactive: { color: themeVars.color.gray700 },
    },
  },
  defaultVariants: { state: 'inactive' },
});

export const label = style([
  themeVars.fontStyles.caption_b_10,
  {
    // 활성 구분은 아이콘(fill)으로만 — 라벨 색은 항상 gray700 고정.
    color: themeVars.color.gray700,
    textAlign: 'center',
    wordBreak: 'break-word',
  },
]);

export const visuallyHidden = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  clipPath: 'inset(50%)',
  whiteSpace: 'nowrap',
  border: 0,
});
