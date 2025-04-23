import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const section = style({
  ...themeVars.display.flexColumn,
  gap: '1.2rem',
  padding: '2rem 0 1.8rem 0',
});

export const header = style({
  ...themeVars.display.flexBetweenAlignCenter,
  height: '3rem',
  padding: '0 2rem',
});

export const title = style({
  color: themeVars.color.gray800,
  ...themeVars.fontStyles.title4_b_16,
});

export const clear = style({
  color: themeVars.color.gray500,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'underline',
  ...themeVars.fontStyles.caption_m_11,
});

export const scrollContainer = style({
  overflowX: 'auto',
  padding: '0 2rem',
  WebkitOverflowScrolling: 'touch',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
});

export const chipList = style({
  display: 'inline-flex',
  flexWrap: 'nowrap',
  gap: '0.6rem',
});

export const emptyText = style({
  color: themeVars.color.gray400,
  margin: '0 2rem',
  ...themeVars.fontStyles.body3_r_14,
});
