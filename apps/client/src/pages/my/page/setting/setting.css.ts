import { style } from '@vanilla-extract/css';

import { themeVars } from '@confeti/design-system/styles';

export const contentsSection = style({
  ...themeVars.display.flexColumn,
  padding: '1rem 2rem',
  gap: '2rem',
});

export const navigationLink = style({
  ...themeVars.display.flexBetweenAlignCenter,
  height: '3rem',
  cursor: 'pointer',
});

export const linkText = style({
  ...themeVars.fontStyles.body2_r_15,
  color: themeVars.color.black,
});
