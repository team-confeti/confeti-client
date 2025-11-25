import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const loadingSection = style({
  ...themeVars.display.flexJustifyAlignCenter,
  position: 'fixed',
  width: '100vw',
  height: '100dvh',
});
