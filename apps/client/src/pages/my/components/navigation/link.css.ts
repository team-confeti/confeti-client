import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const navigationLink = style({
  ...themeVars.display.flexBetweenAlignCenter,
  height: '3rem',
  cursor: 'pointer',
});

export const linkText = style({
  ...themeVars.fontStyles.body2_r_15,
  color: themeVars.color.black,
});
