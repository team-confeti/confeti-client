import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const section = style({
  padding: '1rem 2rem',
  backgroundColor: themeVars.color.white,
  borderBottom: themeVars.border.gray200,
});

export const container = style({
  textAlign: 'left',
});

export const text = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.gray600,
});

export const count = style({
  color: themeVars.color.black,
});
