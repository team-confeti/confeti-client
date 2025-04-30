import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const performanceBannerContainer = style({
  width: '100%',
  paddingTop: '0.1rem',
  background: themeVars.color.confeti_lime_grad,
  paddingBottom: '0.5rem',
});
