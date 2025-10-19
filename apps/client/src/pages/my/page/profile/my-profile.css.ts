import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const noLikePerformanceText = style({
  ...themeVars.fontStyles.body3_r_14,
  color: themeVars.color.gray400,
  marginTop: '2rem',
});
