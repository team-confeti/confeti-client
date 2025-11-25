import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const countDisplayContainer = style({
  ...themeVars.display.flexAlignCenter,
  gap: '0.4rem',
});

export const countDisplayText = style({
  ...themeVars.fontStyles.body5_m_12,
  color: themeVars.color.black,
});
