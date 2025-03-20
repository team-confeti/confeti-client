import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const loadingSection = style({
  ...themeVars.display.flexJustifyAlignCenter,
  height: 'calc(100dvh - 5rem)',
});
