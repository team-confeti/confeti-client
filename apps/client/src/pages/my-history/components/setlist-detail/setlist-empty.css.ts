import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 2rem',
  textAlign: 'center',
});

export const title = style({
  ...themeVars.fontStyles.title3_b_18,
  marginBottom: '0.6rem',
  color: themeVars.color.gray900,
});

export const subtitle = style({
  ...themeVars.fontStyles.body2_r_15,
  color: themeVars.color.gray500,
  marginBottom: '3rem',
});

export const button = style({
  width: '17.6rem',
  height: '4.6rem',
});
