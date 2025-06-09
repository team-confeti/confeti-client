import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const progressBarContainer = style({
  ...themeVars.display.flexAlignCenter,
  gap: '0.4rem',
});
