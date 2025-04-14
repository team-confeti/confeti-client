import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  padding: '2rem',
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.6rem',
});

export const title = style({
  ...themeVars.fontStyles.title4_b_16,
  color: themeVars.color.black,
});

export const buttonWrapper = style({
  display: 'flex',
  alignItems: 'center',
});

export const button = style({
  ...themeVars.fontStyles.subtitle5_sb_12,
  color: themeVars.color.gray500,
});
