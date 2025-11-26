import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const loadingSection = style({
  ...themeVars.display.flexJustifyAlignCenter,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
});
