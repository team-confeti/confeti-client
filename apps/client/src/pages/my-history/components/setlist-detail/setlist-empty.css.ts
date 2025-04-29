import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  flex: 1,
  ...themeVars.display.flexColumnAlignTextCenter,
  justifyContent: 'center',
  padding: '0 2rem',
});

export const title = style({
  ...themeVars.fontStyles.title3_b_18,
  color: themeVars.color.gray900,
  marginBottom: '0.6rem',
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
