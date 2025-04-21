import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  padding: '3rem 2rem',
  gap: '1.8rem',
  backgroundColor: themeVars.color.gray100,
});

export const userInfo = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
});

export const titleWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
});

export const titlePostfix = style({
  ...themeVars.fontStyles.body1_r_16,
});

export const arrowIcon = style({
  cursor: 'pointer',
});
