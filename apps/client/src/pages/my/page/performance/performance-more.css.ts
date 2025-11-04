import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  padding: '1rem 2rem',
  gridColumnGap: '1.75rem',
  gridRowGap: '3rem',
});

export const filterSection = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '1.6rem 2rem',
});

export const chipList = style({
  display: 'flex',
  gap: '0.5rem',
});

// TODO: DS Chip 컴포넌트 재설계 해보자
export const chip = style({
  ...themeVars.fontStyles.body5_m_12,
  padding: '0.8rem 1.4rem',
  height: '3rem',
});
