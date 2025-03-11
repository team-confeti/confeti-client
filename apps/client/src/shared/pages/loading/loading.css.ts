import { themeVars } from '@confeti/design-system/styles';
import { style } from '@vanilla-extract/css';

export const loadingSection = style({
  ...themeVars.display.flexJustifyAlignCenter,
  height: 'calc(100dvh - 5rem)',
});
