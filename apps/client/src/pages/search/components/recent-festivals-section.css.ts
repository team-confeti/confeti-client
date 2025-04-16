import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const section = style({
  ...themeVars.display.flexColumn,
  gap: '1.2rem',
  padding: '4rem 0 1rem 0',
});

export const title = style({
  ...themeVars.display.flexAlignCenter,
  color: themeVars.color.gray800,
  height: '3.1rem',
  padding: '0 2rem',
  ...themeVars.fontStyles.title4_b_16,
});

export const list = style({
  display: 'flex',
  gap: '2rem',
  overflowX: 'auto',
  padding: '0 2rem 0.4rem 2rem',
  WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const item = style({
  flex: '0 0 auto',
  width: '11.7rem',
});

export const emptyText = style({
  color: themeVars.color.gray400,
  ...themeVars.fontStyles.body3_r_14,
});
