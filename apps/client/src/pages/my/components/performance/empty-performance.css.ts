import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const container = style({
  ...themeVars.display.flexColumnAlignTextCenter,
  justifyContent: 'center',
  width: '100%',
  flexGrow: 1,
  gap: '0.6rem',
});

export const title = style({
  ...themeVars.fontStyles.title3_b_18,
  color: themeVars.color.gray900,
});

export const description = style({
  ...themeVars.fontStyles.body2_r_15,
  color: themeVars.color.gray500,
});
