import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const section = style({
  padding: '1.6rem 0',
});

export const emptyPerformanceSection = style({
  ...themeVars.display.flexJustifyAlignCenter,
  ...themeVars.fontStyles.body2_r_15,
  color: themeVars.color.gray500,
  paddingTop: '9.4rem',
  textAlign: 'center',
});
